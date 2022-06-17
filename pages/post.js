import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3'
import collegerating from '../ethereum/collegerating';
import Layout from '../components/Layout';
import {Router} from '../routes';

export class post extends Component {

    state = {
        studentName: '',
        collegeName: '',
        star: '',
        feedback: ''
    }

    onSubmit = async (event)=>{
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();
        await collegerating.methods.giveRating(
            this.state.collegeName,
            this.state.studentName,
            this.state.star,
            this.state.feedback
        ).send({
            from: accounts[0]
        })
        
        Router.pushRoute('/');
    }

    onChange = (e)=>{
        this.setState({...this.state , [e.target.name]: e.target.value})
    }

    render() {
        return (
            <Layout>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Your Name</label>
                        <input name="studentName" placeholder='Anonymous' onChange={this.onChange} value={this.state.studentName}/>
                    </Form.Field>
                    <Form.Field>
                        <label>College Name</label>
                        <input name="collegeName" placeholder='Chitkara University' onChange={this.onChange} value={this.state.collegeName}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Star</label>
                        <input name="star" placeholder='5' onChange={this.onChange} value={this.state.star}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Feedback</label>
                        <textarea name="feedback" onChange={this.onChange} value={this.state.feedback}></textarea>
                    </Form.Field>

                    <Button primary>Post</Button>

                </Form>
            </Layout>
        )
    }
}

export default post