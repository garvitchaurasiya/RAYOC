import connectToDB from '../../middleware/database';
import College from '../../models/College';


async function handler(req, res) {

    if(req.method=='POST'){
        const data = await College.find();
        res.send( data);

    }

}
export default connectToDB(handler);