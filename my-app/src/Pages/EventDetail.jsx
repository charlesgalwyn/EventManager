import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const EventDetail = () => {

  const params  = useParams();
  const {token} = useSelector(store => store.authStore);
  const toast = useToast()
  const currentTime = new Date();

  const [event, setEvent] = React.useState({});
  const[time,setTime]=React.useState(0);
  const {user} = useSelector(store => store.authStore);

  const inList = () => {
    let a =false, b=false;
    if(event.attendees){
      a= event.attendees.some(item => item._id == user._id || item==user._id);
    }
    if(event.pending){
      b=  event.pending.some(item => item._id == user._id || item==user._id);
    }
    return a || b ;
  }


  const handleAddRequest = () => {
    if (user._id === event.creator){
       alert("Event is created by You")
    }
    else{
       if(event.limit === event.attendees?.length){
       alert("Cannot Send Request")
    }
    else{
     fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}/request`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: user._id}),
    })
    .then((response) => response.json())
    .then((data) => {setEvent(data.event); console.log(data);toast({
                  title: 'Request.',
                  description: "Request sent successfully",
                  status: 'success',
                  duration: 1000,
                isClosable: true,
                })})
    .catch((err) => {console.log(err);});
    }
    }
  
  }
   

  React.useEffect(() => {
    fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}`)
    .then((response) => response.json())
    .then((data) => {setEvent(data);
      const dateObj = new Date(data.date); 
      setTime(currentTime-dateObj) })
    .catch((err) => {console.log(err);});
  }, [params.id]);


  return (
    <Box w='50%' m='auto' mt='2rem' bg="cream" borderWidth='1px' borderRadius='lg' padding="30px" >
      <Box alignItems='center'>
        <Text><b>Event Name</b> : <br/>{event.name}</Text>
      </Box>
      <Box alignItems='center'>
        <b>Event Description</b> :  <br/>{event.description}
      </Box>
      <Box>
        <b>Event Category  : </b> 
        <h2>{event.category}</h2>
      </Box>
      <Box>
        <b>Event Date</b>
        <h2>{event.date}</h2>
      </Box>
      <Box>
        <b>Event Status</b>
        {
          time>0 ?(
            <h2>Event has Started</h2>
          ):(
            <h2>Event is not Started</h2>
          )
        }
      </Box>
      <Box>
        <b>Member Limit</b>
        <h2>{event.limit}</h2>
      </Box>
      <Box>
        <b>Other Requirements</b>
        <h2>{event.others}</h2>
      </Box>
      <Box>
        <b>Number of Slots available</b>
        <h2>{event.limit - event.attendees?.length}</h2>
      </Box>
      <Button marginTop="20px" marginBottom="20px" onClick={handleAddRequest} colorScheme={+event.limit<= event.attendees?.length?'red':'green'} > Request to join</Button>
                
    </Box>
  )
}

export default EventDetail