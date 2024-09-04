import { useParams } from "react-router-dom";
import { JitsiMeeting} from "@jitsi/react-sdk"
import { useEffect } from "react";

function MentorMeetingPage() {
    const { meetingID } = useParams();
    
  return (
        <JitsiMeeting
            domain = "meet.jit.si"
            roomName = {meetingID}
            configOverwrite = {{
                startWithAudioMuted: false,
                startWithVideoMuted: false,
                disableModeratorIndicator: true,
                startScreenSharing: true,
                enableEmailInStats: false,
                enableClosePage: false,
                enableWelcomePage: false,
            }}
            interfaceConfigOverwrite = {{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: false
            }}
            userInfo = {{
                displayName: 'Lokesh Kanagarajan'
            }}
            getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100vh'; } }
            onMeetingEnd={() => console.log("Meeting Ended successfully")}
        />
  )
}

export default MentorMeetingPage;
