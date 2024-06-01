'use client'

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React from "react";
import { useState } from "react";
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from "@/components/MeetingRoom";
import { useGetCallByid } from "@/hooks/useGetCallByid";
import Loader from "@/components/Loader";

const Meeting = ({ params: {id} }: { params: { id: string } }) => {

    const {user, isLoaded} = useUser();
    const [isSetupComplete, setisSetupComplete] = useState(false)
    const {call , isCallLoading} = useGetCallByid(id);
    
    if(!isLoaded || isCallLoading) return <Loader/>;

    return (
     <main className="h-screen w-full ">
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetupComplete ? (
                    <MeetingSetup  setIsSetupComplete={
                    setisSetupComplete
                    }/>
                ): (
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>

     </main>
    )
};

export default Meeting;
