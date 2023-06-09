import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../Store/Auth/auth.actions";
import { useToast } from '@chakra-ui/react'

const Login = () => {
  /* states to handle the form data */
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {user, loading , error, token} = useSelector(store => store.authStore);
  const navigate = useNavigate();
  const toast = useToast()

  /* function to handle the form submission */
  const handleSubmit = async e => {
    e.preventDefault();

     dispatch(loginUser({ username, password })).then(res => {
         toast({
                  title: 'Login.',
                  description: "Your Login is successful.",
                  status: 'success',
                  duration: 1000,
                isClosable: true,
                })
         navigate('/');

        }).catch(err => {
          console.log(err);
          toast({
                  title: 'Login.',
                  description: "Your Login failed.",
                  status: 'error',
                  duration: 1000,
                isClosable: true,
                })
        });
   
  };

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      minH="30rem"
      border={"1px solid black"}
    >
      <FormControl isRequired maxWidth={{ lg: "40%" }}>
        <Heading mb="2rem">
          <Center>Login</Center>
        </Heading>
        <FormLabel>UserName</FormLabel>
        <Input
          type="text"
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <Button
          display={"block"}
          m="auto"
          mt="2rem"
          colorScheme="teal"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </FormControl>
    </Box>
  );
};

export default Login;
