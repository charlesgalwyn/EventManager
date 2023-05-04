import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const EventDetail = () => {

  const params  = useParams();
  const {token} = useSelector(store => store.authStore);
  console.log(token)
  const toast = useToast()

  // console.log(params.id);

  const [event, setEvent] = React.useState({});
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
    fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}/request`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: user._id}),
    })
    .then((response) => response.json())
    .then((data) => {setEvent(data.event); console.log(data);})
    .catch((err) => {console.log(err);});
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
                  title: 'Login.',
                  description: "Your Login is successful.",
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
    .then((data) => {setEvent(data); console.log(data);})
    .catch((err) => {console.log(err);});
  }





  React.useEffect(() => {
    fetch(`https://playo-app-5s2g.onrender.com/events/${params.id}`)
    .then((response) => response.json())
    .then((data) => {setEvent(data); console.log(data)})
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
        <b>Member Limit</b>
        <h2>{event.limit}</h2>
      </Box>
      <Box>
        <b>Other Requirements</b>
        <h2>{event.others}</h2>
      </Box>
      <Button marginTop="20px" marginBottom="20px" onClick={handleAddRequest} colorScheme={+event.limit<= event.attendees?.length?'red':'green'} disabled={user._id==event.creator || +event.limit<= event.attendees?.length || inList()}> Request to join</Button>
      {user._id==event.creator&&
        
        
            <Box>
              <b>Pending Requests</b>
           {
            event.pending ?.map((item, index) => {
          return <Box key={index}>
            <h2>{item?.name}</h2>
            <Button colorScheme={'green'} onClick={()=>handleAccept(item._id)}>Accept</Button>
            <Button colorScheme={'red'}   onClick={()=>handleReject(item._id)}>Reject</Button>
          </Box>
        })}
        </Box>
          
        }
        
    </Box>
  )
}

export default EventDetail