import { useEffect, useState } from "react"
function LiveClock() 
{
    const [clock,setclock]=useState(new Date());
    let date = new Date();
    useEffect(()=>
    {
      setInterval(() => {
        date= new Date();
        date.setSeconds(date.getSeconds()+5);
        setclock(date);
      }, 1000);
    },[])
  return(
    <div className="w-1/2 mx-auto">
        <h1 className="text-2xl text-indigo-700 bg-lime-100 p-2 m-5 font-bold">Live clock</h1>
        <h1 className="text-lg text-blue-700 font-bold font-sans">Date</h1>
        <h2 className="text-green-700 font-semibold">{clock.getDate()}/{clock.getMonth()}/{clock.getFullYear()}</h2>
        <h1 className="text-lg text-blue-700 font-bold font-sans">Time</h1>
      <h1 className="text-green-700 font-semibold">{clock.getHours()}:{clock.getMinutes()}:<span className="animate-ping text-red-500 ease-linear  delay-75">{clock.getSeconds()}</span></h1>
    </div>
  )
}
export default LiveClock;