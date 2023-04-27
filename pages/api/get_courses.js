import connectToDB from '../../middleware/database';
import Course from '../../models/Course';


async function handler(req, res) {

    if(req.method=='GET'){
        const data = await Course.find();
        res.send( data);
    }

}
export default connectToDB(handler);