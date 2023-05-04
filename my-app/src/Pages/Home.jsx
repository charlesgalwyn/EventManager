import { Box, Button, Center, Heading, Select, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Image } from '@chakra-ui/react'

function Home() {
  
  const {user} = useSelector(store => store.authStore);
  console.log(user)
  
   return (
    <Box>
      <Heading mt='2rem'>
        {
          user===null ?(
            <Center>
             Welcome to Playo App
            </Center>
          ) :(
            <Center>
             Welcome <span style={{ color: 'red', fontWeight: 'bold',marginLeft:"15px" }}>{user.name}</span>
            </Center>
          )
        }
        <Center>
        <Image boxSize='90 px' borderRadius='20px' marginTop="20px" src='https://i.pinimg.com/736x/a3/a6/36/a3a636dae4b879c4725d72a0a693eed7.jpg'/>
        {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqMTUJufm_ZsCNkvqNjosMr6l8KUIOlUqBx-6dLmBNMg&usqp=CAU&ec=48665699 */}
        </Center>
      </Heading>
    </Box>
   )
  ;
}

export default Home;
