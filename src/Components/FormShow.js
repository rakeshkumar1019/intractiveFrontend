import React,{useState,useEffect}  from  'react'
function FormShow({channel,isUpdate}) {
    let [channels,setChannels]=useState([])
    useEffect(async ()=>{
        const res=await fetch("http://127.0.0.1:3005/store");
        const data=await res.json()
        setChannels(data)
    },[channel,isUpdate])
  return (
      <div>
          {isUpdate && channels && channels.map((cha,id)=>(
            channel===cha.id && <div key={id} style={{fontFamily:'monospace',fontWeight:'200'}}>
                <h2  style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}} >Channel Name : {cha.channelName_}</h2>
                <h2 style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}}>Channel URL : {cha.url_}</h2>
                <h2 style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}}>Purcahse Link: {cha.purchaseLink_}</h2>
            </div>
          ))}
      </div>
  )
}

export default FormShow
