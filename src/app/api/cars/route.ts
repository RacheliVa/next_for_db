import { NextResponse } from 'next/server';
import { connectDatabase, insertDocument,getAllDocuments,deleteDocument, updateCar } from "@/services/mongo";

export async function GET(request: Request) {
    const client = await connectDatabase();
    const cars = await getAllDocuments(client, 'cars');
    client.close();

    return NextResponse.json(cars);
}

export async function POST(request: Request) {
    try {
        const client = await connectDatabase();
        const body = await request.json();

        if (!body.model_name || !body.plate_number || !body.color) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newCarDocument = {
            model_name: body.model_name,
            plate_number: body.plate_number,
            color: body.color,
        };

        const result = await insertDocument(client, 'cars', newCarDocument);
        client.close();

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error inserting car:", error);
        return NextResponse.json({ message: 'Error inserting car' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const client = await connectDatabase();
        const { id } = await request.json(); // Assuming the ID is sent in the request body

        if (!id) {
            return NextResponse.json({ message: 'Missing required field: id' }, { status: 400 });
        }

        const result = await deleteDocument(client, 'cars', id); // Assuming deleteDocument is implemented to delete by id
        client.close();

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Car deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ message: 'Error deleting car' }, { status: 500 });
    }
}


