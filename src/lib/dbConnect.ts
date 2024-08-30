import mongoose from "mongoose";
import { number } from "zod";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject  = {}

async function dbConnect(): Promise<void>{
    if (connection.isConnected){
        console.log("connected to database");
        return;
    }
}

try{
    const db = await mongoose.connect(process.env.MONGODB_URI || " ", {})
    connection.isConnected = db.connections[0].readyState;
    console.log("db is Connected successfully")

}
catch(error){
    console.log("database connection is failed")
    process.exit(1)

}

export default dbConnect;