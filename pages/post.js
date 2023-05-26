import React, { useState } from 'react'
import web3 from '../ethereum/web3'
import collegerating from '../ethereum/collegerating';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';

export default function Post() {
    const [state, setState] = useState({
        studentName: '',
        collegeName: '',
        star: '5',
        feedback: '',
        course: '',
        showSpinner: false
    });
    const router = useRouter();
    const [searchedColleges, setSearchedColleges] = useState([]);
    let allColleges = [];
    let searchTerm = "";

    const [searchedCourses, setSearchedCourses] = useState([]);
    let allCourses = [];
    let courseTerm = "";


    const filterContent = (term) => {
        let result = allColleges.filter((college) => college.name.toLowerCase().includes(term.toLowerCase()));
        result = result.slice(0, 10);
        return result;
    }
    const filterContent2 = (term) => {
        let result = allCourses.filter((course) => course.courseName.toLowerCase().includes(term.toLowerCase()));
        result = result.slice(0, 10);
        return result;
    }

    const changeSearchTerm = async (e) => {
        searchTerm = e.target.value;
        if (searchTerm === "") {
            document.getElementById("searchResults").style.display = "none";
        } else {
            document.getElementById("searchResults").style.display = "block";
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_colleges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        allColleges = json;
        let result = filterContent(searchTerm);
        setSearchedColleges(result);
    }

    const changeCourseTerm = async (e) => {
        courseTerm = e.target.value;
        if (courseTerm === "") {
            document.getElementById("courseResults").style.display = "none";
        } else {
            document.getElementById("courseResults").style.display = "block";
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        allCourses = json;
        let result = filterContent2(courseTerm);
        setSearchedCourses(result);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setState({...state, showSpinner: true});
            const accounts = await web3.eth.getAccounts();
            await collegerating.methods.giveRating(
                state.collegeName,
                state.studentName,
                state.star,
                state.feedback,
                state.course
            ).send({
                from: accounts[0]
            })
            router.push('/');
        } catch (error) {
            setState({...state, showSpinner: false});
        }
        
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
    const onClickCourse = (name) => {
        setState({ ...state, course: name })
        let input = document.querySelector('#courseSearchBar');
        input.value = name;
        document.getElementById("courseResults").style.display = "none";
    }
    const checkedAnonymous = () => {
        if (state.studentName === 'Anonymous') {
            document.querySelector('#studentName').disabled = false;
            setState({ ...state, studentName: '' })
        }
        else {
            document.querySelector('#studentName').disabled = true;
            setState({ ...state, studentName: 'Anonymous' })
        }
    }
    return (
        <>
            {state.showSpinner && <Spinner/>}
            <div className="flex flex-col justify-center items-center w-screen mt-4">
                <div className='w-1/2'>
                    <form>
                        <div className='w-full'>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Write a Feedback.</h2>
                                <p className="text-sm leading-6 text-gray-600">Post a genuine feedback anonymously and keep in mind it can&#39;t be deleted.</p>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-full">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Your Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="studentName"
                                                name="studentName"
                                                placeholder='Name'
                                                onChange={onChange}
                                                value={state.studentName}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <div className='flex'>
                                            <div className="flex h-6 items-center">
                                                <input
                                                    onClick={checkedAnonymous}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6 ml-2">
                                                <label htmlFor="candidates" className="font-medium text-gray-900">
                                                    Be Anonymous
                                                </label>
                                                <p className="text-gray-500">Check this box if don&#39;t want to show name.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label htmlFor="collegeName" className="block text-sm font-medium leading-6 text-gray-900">
                                            College Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="collegeName"
                                                id="searchBar"
                                                autoComplete="off"
                                                placeholder='Search'
                                                onChange={changeSearchTerm}
                                                className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <div id="searchResults" className='w-1/2 rounded-md hidden absolute bg-white border-2'>
                                                {searchedColleges.map((ele) => {
                                                    return <div key={ele.rank} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { onClickCollege(ele.name) }}>
                                                        {ele.name}
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">
                                            Course
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="course"
                                                id="courseSearchBar"
                                                autoComplete="off"
                                                placeholder='Course Name'
                                                onChange={changeCourseTerm}
                                                className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <div id="courseResults" className='w-1/2 rounded-md hidden absolute bg-white border-2'>
                                                {searchedCourses.map((ele, index) => {
                                                    return <div key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { onClickCourse(ele.courseName) }}>
                                                        {ele.courseName}
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Rate Your College
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="star"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={onChange}
                                            >
                                                <option value="5">Extremely good</option>
                                                <option value="4">Good</option>
                                                <option value="3">Neither good not bad</option>
                                                <option value="2">Bad</option>
                                                <option value="1">Extremely Bad</option>
                                            </select>
                                        </div>
                                        <p className="text-sm text-gray-500">How would to rate this college to your juniors.</p>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Feedback
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="feedback"
                                                onChange={onChange}
                                                value={state.feedback}
                                                rows={4}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className="text-sm leading-6 text-gray-600">We would love to know how is your experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={() => { router.push('/') }} className="text-sm font-semibold leading-6 text-gray-900">
                                Back
                            </button>
                            <button
                                type="submit"
                                onClick={onSubmit}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}