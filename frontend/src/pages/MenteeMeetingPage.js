import { useParams } from "react-router-dom";
import { JitsiMeeting} from "@jitsi/react-sdk"

function MenteeMeetingPage() {
    const { meetingID } = useParams();
    
  return (
      <JitsiMeeting
          domain = "meet.jit.si"
          roomName = {meetingID}
          containerStyles={{ display: "flex", flex:1}}
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
              displayName: 'Srirag Palakkadan'
          }}
          getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100vh'; } }
      />
  )
}

export default MenteeMeetingPage;
