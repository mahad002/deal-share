import mongoose from "mongoose";

export function mongooseConnect() {
    
    if(mongoose.connection.readystate === 1){
        return mongoose.connection.setPromise();
    } else {
        const uri = process.env.MONGODB_URI;
        return mongoose.connect(uri);
    }
}