import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallByid = (id: string | string[]) => {
     const [call , setCalls] = useState<Call>();
     const [isCallLoading, setIsCallLoading] = useState(true)

     const client = useStreamVideoClient()

     useEffect( () => {
          if(!client) return;

          const loadCall = async () => {
               const {calls} = await client.queryCalls({
                    filter_conditions: {
                         id
                    }
               })

               if(calls.length > 0) setCalls(calls[0]);
               setIsCallLoading(false);
          }
          loadCall()
     }, [client, id])

     return {
          call , isCallLoading
     }
}