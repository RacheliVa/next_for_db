import React from 'react';
import styles from './CarComponent.module.css';

interface Car {
    _id: string;
    model_name: string;
    plate_number: string;
    color: string;
}

interface CarProps {
    car: Car;
    onEdit: (car: Car) => void;
    onDelete: (id: string) => void;
}

const CarComponent: React.FC<CarProps> = ({ car, onEdit, onDelete }) => {
    return (
        <div className={styles.carContainer}>
            <h3>{car.model_name}</h3>
            <p>Plate Number: {car.plate_number}</p>
            <p>Color: {car.color}</p>
            <div className={styles.carButtons}>
                <button onClick={() => onEdit(car)}>Edit</button>
                <button onClick={() => onDelete(car._id)}>Delete</button>
            </div>
        </div>
    );
};

export default CarComponent;
