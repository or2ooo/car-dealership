import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, VStack, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useCarDealershipViewModel } from './CarDealershipViewModel';

export const CarDealershipView = () => {
    const toast = useToast();
    const {
        searchTerm, setSearchTerm, newCar, setNewCar, handleAddCar,
        filteredCars, isLoading, isAdding
      } = useCarDealershipViewModel();

      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          await handleAddCar(newCar);
          toast({
            title: "Car added",
            description: "The new car has been successfully added.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "There was an error adding the car.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Search cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Make</Th>
              <Th>Model</Th>
              <Th>Year</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCars?.map((car) => (
              <Tr key={car.id}>
                <Td>{car.make}</Td>
                <Td>{car.model}</Td>
                <Td>{car.year}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      <Box overflowX="auto">
        {isLoading && <Box>Loading...</Box>}
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={2}>
          <FormControl>
            <FormLabel>Make</FormLabel>
            <Input value={newCar.make} onChange={(e) => setNewCar({ ...newCar, make: e.target.value })} required />
          </FormControl>
          <FormControl>
            <FormLabel>Model</FormLabel>
            <Input value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} required />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input type="number" value={newCar.year} onChange={(e) => setNewCar({ ...newCar, year: e.target.value })} required />
          </FormControl>
          <Button type="submit" isLoading={isAdding}>Add Car</Button>
        </VStack>
      </form>
    </VStack>
  );
};
