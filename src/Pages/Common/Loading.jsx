import loadingImg from "@/assets/Animation/Heartbeat.json"
import Lottie from "lottie-react"

const Loading =()=>{
    return(
 <div className="w-full mx-auto min-h-screen flex justify-center items-center">
      <Lottie animationData={loadingImg} />
    </div>
    )
}

export default Loading