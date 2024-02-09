import { Button, FormControl, FormLabel, Input, Box, useToast } from '@chakra-ui/react';
import { useLoginViewModel } from 'features/Login/LoginViewModel';

export const LoginView = () => {
  const toast = useToast();
  const { setUsername, setPassword, handleLogin, isLoading } = useLoginViewModel();

  const loginAttempt = async () => {
    try {
      await handleLogin();
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Check your credentials and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="4">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <Button mt="4" colorScheme="blue" isLoading={isLoading} onClick={loginAttempt}>
          Login
        </Button>
      </FormControl>
    </Box>
  );
};
