import { Button, FormControl, FormLabel, Input, Box } from '@chakra-ui/react';
import { useLoginViewModel } from 'features/Login/LoginViewModel';

export const LoginView = () => {
  const { setUsername, setPassword, handleLogin, isLoading } = useLoginViewModel();

  return (
    <Box p="4">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <Button mt="4" colorScheme="blue" isLoading={isLoading} onClick={handleLogin}>
          Login
        </Button>
      </FormControl>
    </Box>
  );
};
