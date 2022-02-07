import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import { FormControl,InputLabel,Input,FormHelperText} from '@mui/material';

function Update({channel,isUpdate,addNewChannel}) {
    let [channelName_,setChannelName]=useState("")
    let [url_,setChannelUrl]=useState("")
    let [purchaseLink_,setPurchaseLink]=useState("")
    let [newChannelName_,setNewChannelName]=useState("")
    let [newUrl_,setNewChannelUrl]=useState("")
    let [newPurchaseLink_,setNewPurchaseLink]=useState("")
    let [channels,setChannels]=useState([])
    let [updateIndex,setUpdateIndex]=useState()
    let [update,setUpdate]=useState(false)
    let [updateMsg,setUpdateMsg]=useState("")
    let [newIndex,setNewIndex]=useState("")




    useEffect(async ()=>{
        const res=await fetch("http://127.0.0.1:3005/store");
        const data=await res.json()
        setChannels(data)
        setNewIndex(data.length)
    },[channel,update,isUpdate,addNewChannel])
    useEffect(()=>{
           channels.map((cha,idx)=>{
                if(cha.id === channel){
                    setChannelName(cha.channelName_)
                    setChannelUrl(cha.url_)
                    setPurchaseLink(cha.purchaseLink_)
                    setUpdateIndex(idx)
                }
           })
    },[channel,update,addNewChannel])
    let updateChannels=()=>{
       let Updatechannel= {   
            id:updateIndex+1,
            channelName_:channelName_,
            url_:url_,
            purchaseLink_:purchaseLink_
        } 
        fetch('http://localhost:8081/channels/save', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Updatechannel),
          })
          .then(response => response.json())
          .then(data => {
            setUpdate(true)
            setUpdateMsg("Update Successfully!!...")
            setTimeout(() => {
                setUpdateMsg("")
                setUpdate(false)
            }, 1000);
          })
          .catch((error) => {
            setUpdate(false)
          });
          
    }
    let addNewChannels=()=>{
        let NewChannel= {   
            id:newIndex+1,
            channelName_:newChannelName_,
            url_:newUrl_,
            purchaseLink_:newPurchaseLink_
        }  
        fetch('http://localhost:8081/newchannel', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(NewChannel),
          })
          .then(response => response.json())
          .then(data => {
            setUpdate(true)
            setUpdateMsg("Update Successfully!!...")
            setTimeout(() => {
                setUpdateMsg("")
                setUpdate(false)
            }, 1000);
          })
          .catch((error) => {
            setUpdate(false)
          });
         
    }


  return (
    <div>
     {update && <h4  style={{border:'1px solid gray',padding:'15px',backgroundColor:'gray',color:'white'}} >{updateMsg}</h4>}
      server={process.env.SERVER_URL}
      {!isUpdate &&  <div>
        <FormControl>
            <InputLabel htmlFor="my-input">Channel Name</InputLabel>
            <Input 
            id="my-input" 
            aria-describedby="my-helper-text"
            type="text" 
            value={channelName_}
            onChange={(e) => setChannelName(e.target.value)} 
            />
        </FormControl>
        <br/> <br/>
        <FormControl>
            <InputLabel htmlFor="my-input">Channel URL</InputLabel>
            <Input 
            id="my-input" 
            aria-describedby="my-helper-text" 
            type="text" 
            value={url_}
            onChange={(e) => setChannelUrl(e.target.value)} 
            />
        </FormControl>
        <br/> <br/>
        <FormControl>
            <InputLabel htmlFor="my-input"> Purchase Link</InputLabel>
            <Input 
            id="my-input" 
            aria-describedby="my-helper-text" 
            type="text" 
            value={purchaseLink_}
            onChange={(e) => setPurchaseLink(e.target.value)} 
            />
        </FormControl> <br/> <br/>
       <Button variant="contained" onClick={updateChannels}>Update</Button>
       </div>}
       <br/> <br/>
      {addNewChannel && <div>
        <FormControl>
            <InputLabel htmlFor="my-input">Channel Name</InputLabel>
            <Input 
            id="my-input" 
            aria-describedby="my-helper-text"
            type="text" 
            value={newChannelName_}
            onChange={(e) => setNewChannelName(e.target.value)} 
            />
        </FormControl>
        <br/> <br/>
        <FormControl>
            <InputLabel htmlFor="my-input">Channel URL</InputLabel>
            <Input 
            id="my-input" 
            aria-describedby="my-helper-text" 
            type="text" 
            value={newUrl_}
            onChange={(e) => setNewChannelUrl(e.target.value)} 
            />
        </FormControl>
        <br/> <br/>
        <FormControl>
            <InputLabel htmlFor="my-input"> Purchase Link</InputLabel>
            <Input 
            id="my-input" 
            aria-describedby="my-helper-text" 
            type="text" 
            value={newPurchaseLink_}
            onChange={(e) => setNewPurchaseLink(e.target.value)} 
            />
        </FormControl> <br/> <br/>
       <Button variant="contained" onClick={addNewChannels}>Add New Channel</Button>
      </div>}
     
    </div>
  )
}

export default Update
