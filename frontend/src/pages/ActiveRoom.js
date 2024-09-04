//show the details of the single room

/*
    documentation from dennis ivy(agora audio rooms tutorial)
    ****************************************************************
    agora-rtc-sdk is used for transfering audio and video streams
    agora-rtm-sdk is used for transfering data(username, profilePic)
    all dom manupulations are done using agora rtm sdk as suggested by dennis ivy.

    ticket raised : https://agora-ticket.agora.io/issue/488472ddd5d54cb58ee9536156c2eb22

*/
import RoomUser from '../components/rooms/RoomUser'
import ActiveMe from '../components/rooms/ActiveMe'
import { useState, useEffect } from "react";

import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk"

import { GoMute, GoUnmute } from 'react-icons/go';
import { MdCallEnd } from 'react-icons/md';
import { DEFAULT_USER_IMG } from '../helpers/CONSTANTS';
import { useLocation, useParams } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ActiveRoom() {

    const { id } = useParams();
    //get data from query params
    const query = useQuery();
    const username = query.get('username');
    const profilePic = query.get('profilePic');
    const userID = query.get('userID');
    console.log(username, profilePic, userID, id, "::: UD");
    
    const appId = process.env.REACT_APP_AGORAIO_APP_ID;
    const token = null;
    const roomId = id;
    const rtcUid =  userID;
    const rtmUid =  userID;

    const [audioMe, setAudioMe] = useState(null)
    const [roomUsers, setRoomUsers] = useState([]);
    const [micMuted, setMicMuted] = useState(true);
    

    let audioTracks = {
        localAudioTrack: null,
        remoteAudioTracks: {},
    };

    let rtcClient;
    let rtmClient;
    let channel;
    
    //initialize agoraRTC for audio and video 
    const initRtc = async () => {
        rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        //rtcClient.on('user-joined', handleUserJoined)
        rtcClient.on("user-published", handleUserPublished)
        rtcClient.on("user-left", handleUserLeft);
        

        try {
            await rtcClient.join(appId, roomId, token, rtcUid);
            setAudioMe(rtcUid);

            // Create and publish local audio track after joining the channel
            audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            audioTracks.localAudioTrack?.setMuted(micMuted);
            await rtcClient.publish(audioTracks.localAudioTrack);
            initVolumeIndicator();
        } catch (error) {
           console.log("Error joining channel:", error);
        }
    }

    //initialize agora rtm for handling dom manupulations
    const initRtm = async () => {
        try {
            rtmClient = AgoraRTM.createInstance(appId)
            await rtmClient.login({'uid':rtmUid, 'token':null})
    
            channel = rtmClient.createChannel(roomId)
            await channel.join()
    
            //await rtmClient.addOrUpdateLocalUserAttributes({'name':name, 'userRtcUid':rtcUid.toString(), 'userAvatar':avatar})
    
            getChannelMembers()
    
            window.addEventListener('beforeunload', leaveRtmChannel)
    
            channel.on('MemberJoined', handleMemberJoined)
            channel.on('MemberLeft', handleMemberLeft)
        } catch (error) {
            console.log(error)
            alert(error.message);
        }
    }

    //when a remote user joins the room
    let handleUserJoined = async (user) => {
        console.log("UJ", user)
        if(!roomUsers.includes(user?.uid)) {
            setRoomUsers((prevRoomUsers) => [...prevRoomUsers, `remote ::: ${user?.uid}`]);
        }
    } 

    //when a remote user publishes audio
    let handleUserPublished = async (user, mediaType) => {
        await  rtcClient.subscribe(user, mediaType);

        if (mediaType == "audio"){
            audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
            user.audioTrack.play();
        }
    }

    //when a remote user leaves chat room
    let handleUserLeft = async (user) => {
        delete audioTracks.remoteAudioTracks[user.uid]
    }

    let leaveRoom = async () => {
        if(audioMe){
            audioTracks.localAudioTrack?.stop()
            audioTracks.localAudioTrack?.close()
            rtcClient.unpublish()
            rtcClient.leave()
            leaveRtmChannel() // part of rtm channel
        }
    }

    //mute or unmute a microphone
    const toggleMic = () => {
        setMicMuted(!micMuted);
        audioTracks.localAudioTrack?.setMuted(micMuted);
    }

    //indicate volume change
    let initVolumeIndicator = async () => {

        AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 1000);
        rtcClient.enableAudioVolumeIndicator();
    
        rtcClient.on("volume-indicator", volumes => {
            volumes.forEach((volume) => {
                console.log(`UID ${volume.uid} Level ${volume.level}`);
            });
        })
    }

    //RTM SDK STARTS FROM HERE  ==>  done all ui updations with RTM SDK
    // when a new member is joined, update UI
    let handleMemberJoined = async (MemberId) => {
        //update the ui
        if(!roomUsers.includes(MemberId)) {
            alert("new member joined...", MemberId)
            setRoomUsers((prevRoomUsers) => [...prevRoomUsers, `remote ::: ${MemberId}`]);
        }
    }

    //when an existing member left the room
    let handleMemberLeft = async (MemberId) => {
        if(roomUsers.includes(MemberId)) {
            let existingRoomUsers = roomUsers?.filter(u => u !== MemberId);
            setRoomUsers(existingRoomUsers);
        }
    }

    //get all channel members
    let getChannelMembers = async () => {
        let members = await channel.getMembers();
        console.log(members, "MEM");
        setRoomUsers(members);
    }

    //leave an rtm channel
    let leaveRtmChannel = async () => {
        await channel.leave()
        await rtmClient.logout()
    }

    useEffect(() =>{
        initRtc();
        initRtm();
    } ,[micMuted]);
    
  return (
    <>
        <div className='text-4xl font-extrabold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, vel!</div>
        <p>room ::: {id} && {audioMe}</p>
        <div className="text-gray-500 font-semibold">{roomUsers?.length} participants</div>
        <div className="grid grid-cols-4 gap-4 py-12 dark:bg-gray-800">
            <div className="col-span-4 md:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        audioMe && roomUsers?.map( u => <h1>{u}</h1> )
                    }
                </div>
            </div>
            <div className="col-span-4 md:col-span-1 md:me-2 fixed right-0">
                {
                    audioMe && (
                        <div>
                            <img src={profilePic ?? DEFAULT_USER_IMG} alt="user logo" className='rounded-xl w-36 h-36 my-4 ' />
                            <p>{username}</p>
                            <p>mic : {micMuted ? "mic off":"mic on"}</p>
                            <div className="flex gap-3">
                            {
                                micMuted? (
                                <div onClick={toggleMic} className="bg-green-500 p-2 text-center rounded-xl text-white cursor-pointer">
                                    <GoUnmute />
                                </div>
                                ) : (
                                <div onClick={toggleMic} className="bg-red-500 p-2 rounded-xl text-white cursor-pointer">
                                    <GoMute />
                                </div>
                                )
                            }
                            <div className="bg-red-500 p-2 rounded-xl text-white cursor-pointer"><MdCallEnd /></div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default ActiveRoom