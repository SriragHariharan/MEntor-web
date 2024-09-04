import { FaArrowRightLong } from "react-icons/fa6";
import { GiPublicSpeaker } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../helpers/axios";
import { showErrorToast } from "../../helpers/ToastMessageHelpers";

function SingleRoomCard({ details, mentor }) {
    const navigate = useNavigate();
    //details?.link
    const handleJoinRoom = () => {
        axiosInstance.post(process.env.REACT_APP_AUDIO_SVC_ENDPOINT + `/room/${details?._id}/join/`)
        .then(resp => {
            const {username, userID, profilePic} = resp.data.data?.user;
            if(mentor) 
                navigate(`/mentor/room/${details?.link}?username=${username}&profilePic=${profilePic}&userID=${userID}`)
            else 
                navigate(`/mentee/room/${details?.link}?username=${username}&profilePic=${profilePic}&userID=${userID}`)
        })
        .catch(err => showErrorToast("Unable to join"))
    }


  return (
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center text-4xl text-gray-400">
                <GiPublicSpeaker />
            </div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {details?.name}
            </h5>
            <div onClick={handleJoinRoom} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 cursor-pointer">
                Join now &nbsp;&nbsp; <FaArrowRightLong />
            </div>
        </div>
  )
}

export default SingleRoomCard