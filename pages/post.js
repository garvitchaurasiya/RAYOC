import React, { useEffect, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3'
import collegerating from '../ethereum/collegerating';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Post() {
    const [state, setState] = useState({
        studentName: '',
        collegeName: '',
        star: '',
        feedback: ''
    });
    const router = useRouter();
    const [searchedColleges, setSearchedColleges] = useState([]);
    let allColleges = ['a', 'b'];
    let searchTerm = "";

    useEffect(() => {
        async function getAllColleges() {


        }
        getAllColleges();
    })

    const filterContent = (searchTerm) => {
        const result = allColleges.filter((college) => college.name.toLowerCase().includes(searchTerm.toLowerCase()));
        result = result.slice(0, 10);
        console.log("filtered", result);
        setSearchedColleges(result);
    }

    const changeSearchTerm = async (e) => {
        searchTerm = e.target.value;
        if (searchTerm === "") {
            document.getElementById("searchResults").style.display = "none";
        } else {
            document.getElementById("searchResults").style.display = "block";
        }
        const response = await fetch('http://localhost:3000/api/get_colleges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        allColleges = json;
        filterContent(searchTerm);
    }

    const onSubmit = async (event) => {
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

    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const onClickCollege = (name) => {
        setState({ ...state, collegeName: name })
        let input = document.querySelector('#searchBar');
        input.value = name;
        document.getElementById("searchResults").style.display = "none";
    }
    return (
        <Layout>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Your Name</label>
                    <input name="studentName" placeholder='Anonymous' onChange={onChange} value={state.studentName} />
                </Form.Field>
                <Form.Field>
                    <label>College Name</label>
                    
                    <input name="collegeName" id="searchBar" autoComplete="off" placeholder='Search' onChange={changeSearchTerm} />

                    <div id="searchResults" className='absolute bg-white border-2 w-full'>
                        {searchedColleges.map((ele) => {
                            return <div key={ele.rank} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { onClickCollege(ele.name) }}>
                                {ele.name}
                            </div>
                        })}
                    </div>
                </Form.Field>
                <Form.Field>
                    <label>Star</label>
                    <input name="star" placeholder='5' onChange={onChange} value={state.star} />
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
