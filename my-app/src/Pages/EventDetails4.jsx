import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const EventDetail4 = () => {

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
   


  const handleAccept = (id) => {
    fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}/accept`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: id}),
    })
    .then((response) => response.json())
    .then((data) => {setEvent(data); console.log(data);
                toast({
                  title: 'Accepted.',
                  description: "Participant accepted successfully",
                  status: 'success',
                  duration: 1000,
                isClosable: true,
                })})
    .catch((err) => {console.log(err);});
  }


  

  const handleReject = (id) => {
    fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: id}),
    })
    .then((response) => response.json())
    .then((data) => {setEvent(data); console.log(data); toast({
                  title: 'Rejected.',
                  description: "Participant rejected successfully",
                  status: 'error',
                  duration: 1000,
                isClosable: true,
                })})
    .catch((err) => {console.log(err);});
  }





  React.useEffect(() => {
    fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}`)
    .then((response) => response.json())
    .then((data) => {setEvent(data); console.log(data);
    const dateObj = new Date(data.date); 
      setTime(currentTime-dateObj)})
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
      <Button marginTop="20px" marginBottom="20px"  colorScheme={'green'} > Request Pending</Button>  
        
    </Box>
  )
}

export default EventDetail4