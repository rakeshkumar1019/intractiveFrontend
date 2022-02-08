import React,{useState,useEffect}  from  'react'
import {server} from "./Environment"

function FormShow({channel,isUpdate}) {
    let [channels,setChannels]=useState([])
    useEffect(async ()=>{
        const res=await fetch(`${server}/channels`);
        const data=await res.json()
        setChannels(data)
    },[channel,isUpdate])
  return (
      <div>
          {channel && isUpdate && channels && channels.map((cha,id)=>(
            channel===cha.id && <div key={id} style={{fontFamily:'monospace',fontWeight:'200'}}>
                <h2  style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}} >Channel Name : {cha.channelName_}</h2>
                <h2 style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}}>Video URL: {cha.videoURL_}</h2>
                <h2 style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}}>Purcahse Link: {cha.purchaseLink_}</h2>
                <h2 style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}}>isYoutube: {cha.isYoutube?"true":"false"}</h2>
            </div>
          ))}
      </div>
  )
}

export default FormShow
