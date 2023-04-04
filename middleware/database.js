import mongoose from "mongoose";

const connectToDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    await mongoose.connect('mongodb://127.0.0.1:27017/rayoc');
    return handler(req, res);
}

export default connectToDB;