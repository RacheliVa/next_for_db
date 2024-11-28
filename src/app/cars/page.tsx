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
    const [isAddingCar, setIsAddingCar] = useState(false);
    const [newCar, setNewCar] = useState({ model_name: "", plate_number: "", color: "" });

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


    const handleDelete = async (id: string) => {
        console.log("Deleting car with ID:", id);

        try {
            const response = await fetch('/api/cars', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setCars(cars.filter(car => car._id !== id));
                console.log("Car deleted successfully");
            } else {
                console.error('Failed to delete car:', response.statusText);
            }
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleAddCar = () => {
        setIsAddingCar(true);
        console.log("Add new car");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCar({ ...newCar, [e.target.name]: e.target.value });
    };

    const handleEdit = async (car: Car) => {
        console.log("edit car:", car);
    };
    
    return (
        <div>
            <h1>Cars List</h1>
            <button onClick={handleAddCar}>Add Car</button>
            {cars.map((car) => (
                <CarComponent
                    key={car._id}
                    car={car}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
            {isAddingCar && (
                <form >
                    <input
                        type="text"
                        name="model_name"
                        placeholder="Model Name"
                        value={newCar.model_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="plate_number"
                        placeholder="Plate Number"
                        value={newCar.plate_number}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={newCar.color}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}
function fetchCars() {
    throw new Error("Function not implemented.");
}

