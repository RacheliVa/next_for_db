import React, { useState } from 'react';
import styles from './CarComponent.module.css';

interface Car {
    _id: string;
    model_name: string;
    plate_number: string;
    color: string;
}


interface CarProps {
    car: Car;
    onEdit: (car: Car) => Promise<void>; 
    onDelete: (id: string) => void;
}



const CarComponent: React.FC<CarProps> = ({ car, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState<Car>(car);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await onEdit(editedCar);
            setIsEditing(false); 
        } catch (error) {
            console.error("Error saving car:", error);
        }
    };

    return (
        <div className={styles.carContainer}>
            {isEditing ? (
                <form>
                    <input
                        type="text"
                        name="model_name"
                        value={editedCar.model_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="plate_number"
                        value={editedCar.plate_number}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="color"
                        value={editedCar.color}
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={handleSave}>Save</button>
                </form>
            ) : (
                <>
                    <h3>{car.model_name}</h3>
                    <p>Plate Number: {car.plate_number}</p>
                    <p>Color: {car.color}</p>
                    <div className={styles.carButtons}>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(car._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CarComponent;