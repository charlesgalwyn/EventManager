import { Box, Button, Select, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Heading,Center } from '@chakra-ui/react';

function Accepted() {
 
  const {user} = useSelector(store => store.authStore);
  const [filter, setFilter]  = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {

    // Make a request to the backend to get the list of events
    setLoading(true);
    fetch('https://playo-app-5s2g.onrender.com/events')
      .then((response) => response.json())
      .then((data) => {if(filter!='all')data=data.filter(x=>x.category==filter); data = data.filter(x=>x.pending&& x.attendees.includes(user._id));setEvents(data); console.log(data);setLoading(false); }) 
      .catch((err) => {console.log(err); setLoading(false);});
  }, [filter]);




  return (
    <Box maxW='50%' m='auto' p='1rem' mt='2rem'>
      <Select mb='1rem' onChange={(e)=> setFilter(e.target.value)}>
        <option value='all'>All</option>
        <option value='badminton'>Badmintion</option>
        <option value='cricket'>Cricket</option>
        <option value='football'>Football</option>
        <option value='tennis'>Tennis</option>
      </Select>
      {loading && <p>{`Loading events...`}</p>}
      
      
      {!loading && (events.length > 0 ? (
  events.map((event) => (
    <Box key={event._id} display='flex' alignItems={'center'} justifyContent={'space-between'}>
      <Box mt='0.5rem' mb='0.5rem'>
        <h3>{event.name}</h3>
        {/* <p>{event.description}</p> */}
        <Tag  size='sm' variant='subtle' colorScheme='cyan'>
          <TagLabel>{event.category}</TagLabel>
        </Tag>
      </Box>
      <Button colorScheme={'green'} onClick={() => navigate(`/event/${event._id}`)/* navigate to event details page */}>View details</Button>
    </Box>
  ))
) : (
  <Heading>
    <Center>
      No Event is Accepted
    </Center>
  </Heading>
))}
      
    </Box>
  );
}

export default Accepted;
