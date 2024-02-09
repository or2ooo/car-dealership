import { Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from 'app/hooks';

const Header = () => {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <Flex as="header" bg="blue.500" color="white" p="4" justifyContent="space-between" alignItems="center">
      <Text fontSize="xl">Car Dealership Platform</Text>
      {user && <Text>Hello {user.username}</Text>}
    </Flex>
  );
};

export default Header;
