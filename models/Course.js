import mongoose from 'mongoose';
const {Schema} = mongoose;

const courseSchema = new Schema({
    collegeName: {
        type: String,
        required: true,
    }
})
mongoose.models = {}
const Course = mongoose.model('courses', courseSchema);
export default Course;