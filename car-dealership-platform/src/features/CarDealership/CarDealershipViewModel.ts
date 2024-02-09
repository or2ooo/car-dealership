import { useState } from 'react';
import { useFetchCarsQuery, useAddCarMutation } from 'api/queries/carApi';


export const useCarDealershipViewModel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newCar, setNewCar] = useState({ make: '', model: '', year: '' });
    const { data: cars, error, isLoading } = useFetchCarsQuery();
    const [addCar, { isLoading: isAdding }] = useAddCarMutation();

    const filteredCars = cars?.filter(car =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm)
    );

    const handleAddCar = async (carDetails: { make: string; model: string; year: string }) => {
        try {
            await addCar({ ...carDetails, year: parseInt(carDetails.year) }).unwrap();
            setNewCar({ make: '', model: '', year: '' });
        } catch (error) {
            console.error("Failed to add car:", error);
            throw error;
        }
    };
    return { searchTerm, setSearchTerm, newCar, setNewCar, handleAddCar, filteredCars, isLoading, isAdding, error };
};
