// pages/Cars.tsx

"use client";

import { useEffect, useState } from "react";
import CarComponent from '../../components/CarComponent/CarComponent';

interface Car {
    _id: string;
    model_name: string;
    plate_number: string;
    color: string;
}

export default function Cars() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await fetch('/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data: Car[] = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        }

        fetchCars();
    }, []);

    const handleEdit = (car: Car) => {
        console.log("Editing car:", car);
    };

    const handleDelete = (id: string) => {
        console.log("Deleting car with ID:", id);
    };

    return (
        <div>
            <h1>Cars List</h1>
            {cars.map((car) => (
                <CarComponent
                    key={car._id}
                    car={car}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
