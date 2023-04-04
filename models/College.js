import mongoose from 'mongoose';
const {Schema} = mongoose;

const collegeSchema = new Schema({
    rank: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})
mongoose.models = {}
const College = mongoose.model('colleges', collegeSchema);
export default College;