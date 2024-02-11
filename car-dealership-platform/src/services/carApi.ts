import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Car } from 'features/CarDealership/models/car';

export const carApi = createApi({
    reducerPath: 'carApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Car'],
    endpoints: (builder) => ({
        fetchCars: builder.query<Car[], void>({
            query: () => 'cars',
            providesTags: (result) =>
                result ? [...result.map(({ id }) => ({ type: 'Car' as const, id })), 'Car'] : ['Car'],
        }),
        addCar: builder.mutation<Car, Partial<Car>>({
            query: (newCar) => ({
                url: 'cars',
                method: 'POST',
                body: newCar,
            }),
            invalidatesTags: ['Car'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const tempId = -Date.now();

                const patchResult = dispatch(
                    carApi.util.updateQueryData('fetchCars', undefined, draft => {
                        const optimisticCar: Car = {
                            id: tempId,
                            make: arg.make || "Unknown Make",
                            model: arg.model || "Unknown Model",
                            year: arg.year || new Date().getFullYear(),
                        };

                        draft.push(optimisticCar);
                    })
                );

                try {
                    const { data: addedCar } = await queryFulfilled;
                    patchResult.undo();
                    dispatch(
                        carApi.util.updateQueryData('fetchCars', undefined, draft => {
                            const index = draft.findIndex(car => car.id === tempId);
                            if (index !== -1) draft[index] = addedCar;
                        })
                    );
                } catch {
                    patchResult.undo();
                }
            }
        }),
    }),
});

export const { useFetchCarsQuery, useAddCarMutation } = carApi;
