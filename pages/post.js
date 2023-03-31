import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3'
import collegerating from '../ethereum/collegerating';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function Post(){
    const router = useRouter();

    const [state, setState] = useState({
        studentName: '',
        collegeName: '',
        star: '',
        feedback: ''
    });

    const onSubmit = async (event)=>{
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();
        await collegerating.methods.giveRating(
            state.collegeName,
            state.studentName,
            state.star,
            state.feedback
        ).send({
            from: accounts[0]
        })
        
        router.pushRoute('/');
    }

    const onChange = (e)=>{
        setState({...state , [e.target.name]: e.target.value})
    }
    return (
        <Layout>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Your Name</label>
                    <input name="studentName" placeholder='Anonymous' onChange={onChange} value={state.studentName}/>
                </Form.Field>
                <Form.Field>
                    <label>College Name</label>
                    <input name="collegeName" placeholder='Chitkara University' onChange={onChange} value={state.collegeName}/>
                </Form.Field>
                <Form.Field>
                    <label>Star</label>
                    <input name="star" placeholder='5' onChange={onChange} value={state.star}/>
                </Form.Field>
                <Form.Field>
                    <label>Feedback</label>
                    <textarea name="feedback" onChange={onChange} value={state.feedback}></textarea>
                </Form.Field>

                <Button primary>Post</Button>

            </Form>
        </Layout>
    )
}
export default Post;

// export class post extends Component {
    
// }

// export default post

