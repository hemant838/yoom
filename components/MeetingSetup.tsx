import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void}) => {
    const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false);
    const call = useCall();

    if(!call) {
     throw new Error('useCall must be used within StreamCall component')
    }

    useEffect(() => {
     if(isMicCamToggleOn) {
          call?.camera.disable();
          call?.microphone.disable();
     } else {
          call?.camera.enable();
          call?.microphone.enable();
     }
    }, [isMicCamToggleOn, call?.camera , call?.microphone]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center text-white gap-3 ">
            <h1 className="text-2xl">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-centergap-3 ">
               <label className="flex items-center justify-center gap-2 font-medium ">
                    <input type="checkbox"
                    checked={isMicCamToggleOn}
                    onChange={ (e) => setisMicCamToggleOn(e.target.checked)}/> 
                     Join with mic and camera off
               </label>

               <DeviceSettings />
            </div>
            <Button className="rounded-md bg-green-500 px-4 py-2.5"
            onClick={ ()=>{
               call.join();
               setIsSetupComplete(true);
            }}>
               Join Meeting
            </Button>
        </div>
    );
};

export default MeetingSetup;
