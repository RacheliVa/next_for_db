import {NextResponse} from 'next/server'
import { connectDatabase,getAllDocuments } from "@/services/mongo";


export async function GET(request: Request){
const client = await connectDatabase();
const cars = await getAllDocuments(client, 'cars');
client.close();

return NextResponse.json(cars);
}