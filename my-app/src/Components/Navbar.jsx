import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {user} = useSelector(store => store.authStore);
  console.log(user)
  return (
    <Box p='1rem' bg='yellow'>
        <Flex justifyContent={'space-around'} gap='1rem'>
            <Link to='/'><Button colorScheme={'pink'} variant='outline' bg='white'>Home</Button></Link>
            <Link to='/events'><Button colorScheme={'pink'} variant='outline' bg='white'>Events</Button></Link>
            <Link to='/myevents'><Button colorScheme={'pink'} variant='outline' bg='white'>My Events</Button></Link>
            <Link to='/create'><Button colorScheme={'pink'} variant='outline' bg='white'>Create Event</Button></Link>
            <Link to='/events/accepted'><Button colorScheme={'pink'} variant='outline' bg='white'>Accepted</Button></Link>
            <Link to='/events/pending'><Button colorScheme={'pink'} variant='outline' bg='white'>Pending</Button></Link>
            {
              user?.name ?(
                <h3 style={{ color: 'red', fontWeight: 'bold',marginTop:"10px" }}>{user.name}</h3>
              ):(
                <Flex justifyContent={'space-around'} gap='1rem'>
                <Link to='/login'><Button colorScheme={'pink'} variant='outline' bg='white'>Login</Button></Link>
                <Link to='/signup'><Button colorScheme={'pink'} variant='outline' bg='white'>Signup</Button></Link>
                </Flex>
              )
            }
            
            
        </Flex>
    </Box>
  )
}

export default Navbar