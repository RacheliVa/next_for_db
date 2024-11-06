"use server"
import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
    const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
    return await MongoClient.connect(dbConnection);
}

export async function insertDocument(client: any, collection: string, document: object) {
    const db = client.db('db01');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client: any, collection: string) {
    const db = client.db('db01');
    const documents = await db.collection(collection).find().toArray();
    return documents;
}

export async function deleteDocument(client: any, collection: string, id: string) {
    const db = client.db('db01');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result; 
}

// services/service.js
export async function updateCar(id:string, updatedCar:any) {
    try {
        const response = await fetch(`/api/cars`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...updatedCar }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update car');
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating car:", error);
        throw error;
    }
}
