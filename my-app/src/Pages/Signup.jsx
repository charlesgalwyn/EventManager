import { Box, Button, Center, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Store/Auth/auth.actions';
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

const Signup = () => {
    const dispatch = useDispatch();
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    const toast = useToast()

    const handleSubmit = async e => {
        e.preventDefault()
        dispatch(signupUser({name, username, password})).then(res => {
            toast({
                  title: 'Signup.',
                  description: "Your Signup is successful.",
                  status: 'success',
                  duration: 1000,
                isClosable: true,
                })
            navigate('/login');
        }).catch(err => {
            toast({
                  title: 'Signup.',
                  description: "Your Signup failed.",
                  status: 'error',
                  duration: 1000,
                isClosable: true,
                })
            console.log(err);
        });
        
        console.log(name, username, password)
    }

  return (
    <Box display={'flex'} justifyContent='center' alignItems={'center'} minH='30rem'>
        <FormControl isRequired maxW='50%' >
            <Heading mb='2rem'><Center>Signup</Center></Heading>
            <FormLabel>Name</FormLabel>
            <Input type="text"  onChange={
                e => setName(e.target.value)
            }/>
            <FormLabel>UserName</FormLabel>
            <Input type="text"  onChange={
                e =>setUsername(e.target.value)
            }/>
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={
                e => setPassword(e.target.value)   
            }/>
            <Button colorScheme={'teal'} display='block' m='auto' mt='1rem' type="submit" onClick={handleSubmit}>Submit</Button>
        </FormControl>
 
    </Box>
  )
}

export default Signup