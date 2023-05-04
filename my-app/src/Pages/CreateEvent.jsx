import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Select } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

const CreateEvent = () => {
 
     const [data, setData] = React.useState({category: 'cricket'});
     const {user} = useSelector(store => store.authStore);
     const navigate = useNavigate();
     const toast = useToast()

        const handleChange = (e) => {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }

        const handleSubmit =  (e) => {
            e.preventDefault();
            console.log(data);
            // Make a request to the backend to create an event using axios
            axios.post('https://playo-app-5s2g.onrender.com/events', {...data, creator: user._id, pending: [], attendees : []}).then(res=>{
                console.log(res);
                toast({
                  title: 'Event created.',
                  description: "Your Event is successfully created.",
                  status: 'success',
                  duration: 1000,
                isClosable: true,
                })
                navigate('/myevents');
            }).catch(err=>{
                console.log(err);
            })
        }


  return (
    <Box p='2rem'>
        <FormControl isRequired w='50%' m='auto'>
            <Heading mb='2rem'><Center>Please enter the Details</Center></Heading>
            <FormLabel>Name of the Event</FormLabel>
            <Input type='text' name='name' onChange={handleChange}></Input>
            <FormLabel>Event description</FormLabel>
            <Input type='text' name='description' onChange={handleChange}></Input>
            <FormLabel>Event date</FormLabel>
            <Input type='datetime-local' name='date' onChange={handleChange}></Input>
            {/* <FormLabel>Event time</FormLabel> */}
            <FormLabel>Event category</FormLabel>
            <Select  name='category' onChange={handleChange}>
                <option value='cricket'>Cricket</option>
                <option value='tennis'>Tennis</option>
                <option value='football'>Football</option>
                <option value='badminton'>Badminton</option>

            </Select>
            {/* <Input type='text' name='category' onChange={handleChange}></Input> */}
            <FormLabel>Number of Members</FormLabel>
            <Input type='number' name='limit' onChange={handleChange}></Input>
            <FormLabel>Other Requirements</FormLabel>
            <Input type='text' name='others' onChange={handleChange}></Input>
            <Button display={'block'} m='auto' mt='1rem' colorScheme={'orange'} onClick={handleSubmit}>Create Event</Button>
        </FormControl>
    </Box>
  )
}

export default CreateEvent