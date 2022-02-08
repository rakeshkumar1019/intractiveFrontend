import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormShow from './FormShow';
import Update from './Update';
import Button from '@mui/material/Button';
import {server} from "./Environment"

function Form() {
    let [channels,setChannels]=useState([])
    const [channel, setChannel] = useState(1);
    let [isUpdate,setIsUpdate]=useState(true)
    let [addNewChannel,setAddNewChannel]=useState(false)


    const handleChange = (event) => {
        setChannel(event.target.value);
    };

    useEffect(async ()=>{
        const res=await fetch(`${server}/channels`);
        const data=await res.json()
        setChannels(data)
    },[channel,channels])

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Channel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={channel}
          label="Channels"
          onChange={handleChange}
        >
        {channels && channels.map((c,idx)=>(
            <MenuItem key={idx} value={c.id}>{c.channelName_}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
    <br/>
    <FormShow channel={channel} isUpdate={isUpdate}/>
    <Button 
        variant="contained"
        onClick={()=>setIsUpdate(!isUpdate)}
        style={{ marginLeft:'45%'}}
     >
      {isUpdate?"Edit":"Back"}
    </Button>
       &nbsp;
    <Button 
    variant="contained"
    onClick={()=>setAddNewChannel(!addNewChannel)}
    >
     {!addNewChannel? "Add New ":"Back"}
    </Button>
      <br/> <br/> <br/>
    <Update channel={channel} isUpdate={isUpdate} addNewChannel={addNewChannel}/>
    </div>
  )
}

export default Form
