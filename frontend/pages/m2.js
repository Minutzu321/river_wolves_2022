
import { useSession, signIn, getSession} from "next-auth/react"
import { getToken } from "next-auth/jwt"
import { useCallback, useEffect, useState } from "react";
import { useInterval } from 'usehooks-ts'


export const isBrowser = typeof window !== "undefined";

let incarca = false;
let level = -1;
let insec = 0;
let desec = 0;

function PaginaMembru(props) {

  const [wsInstance, setWsInstance] = useState(null);

  const updateWs = useCallback((url) => {
    if(!isBrowser) return setWsInstance(null);
    
    if(wsInstance?.readyState !== 3)
      wsInstance?.close();

    const newWs = new WebSocket(url);
    setWsInstance(newWs);
  }, [wsInstance])


  useEffect(() => {
    if(isBrowser) { 
      const ws = new WebSocket("wss://live.ro049.com");
      setWsInstance(ws);

      navigator.getBattery().then(battery => {
        function updateAllBatteryInfo(){
          updateChargeInfo();
          updateLevelInfo();
          updateChargingInfo();
          updateDischargingInfo();
          
        }
        updateAllBatteryInfo();
      
        battery.addEventListener('chargingchange', () => {
          updateChargeInfo();
        });
        function updateChargeInfo(){
          incarca = battery.charging;
          console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
        }
      
        battery.addEventListener('levelchange', () => {
          updateLevelInfo();
        });
        function updateLevelInfo(){
          level = battery.level * 100;
          console.log(`Battery level: ${battery.level * 100}%`);
        }
      
        battery.addEventListener('chargingtimechange', () => {
          updateChargingInfo();
        });
        function updateChargingInfo(){
          insec = battery.chargingTime;
          console.log(`Battery charging time: ${battery.chargingTime} seconds`);
        }
      
        battery.addEventListener('dischargingtimechange', () => {
          updateDischargingInfo();
        });
        function updateDischargingInfo(){
          desec = battery.dischargingTime;
          console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
        }
      
      });
    }

    return () => {
      if(ws?.readyState !== 3){
        ws.close()
      }
    }
  }, [])

  useInterval(
    () => {
      if(wsInstance?.readyState === 3) {
        updateWs("wss://live.ro049.com")
      }else if(wsInstance?.readyState === 1){
        wsInstance.send(level+" "+insec+" "+desec);
      }
    },
    1000,
  )

  return (
    <div>a</div>
  )
}

export default PaginaMembru

export async function getServerSideProps(context) {
  const secret = process.env.JWT_SECRET
  const req = context.req;
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)
  const sesiune = await getSession(context);
  console.log(sesiune);
  return {
      props: {
        data: false,
      },
    }
}