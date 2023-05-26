import React, { Component } from 'react'
import collegerating from '../ethereum/collegerating';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Link from 'next/link'
import ReviewCard from '../components/Hero/ReviewCard';

export class RatingIndex extends Component {

  static async getInitialProps() {
    let ratings = await collegerating.methods.getCollegesRatings().call();
    const totalRatings = await collegerating.methods.totalRatings().call();
    let count = [0, 0, 0, 0, 0];
    ratings.map((ele) => {
      count[ele[2] - 1] = count[ele[2] - 1] + 1;
    })
    for (var i = 0; i < 5; i++) {
      count[i] = Math.floor(count[i] / ratings.length * 100);
    }
    ratings = ratings.slice().reverse();

    return { ratings, totalRatings, count };
  }
  state = {
    searchedColleges: [],
    searchedCourses: [],
    reviews: (this.props.ratings),
    filtered_By_College_Course: (this.props.ratings),
    reviewCount: (this.props.count),
    findCollege: "",
    findCourse: "",
    averageRating: 0,
    showSpinner: false
  }
  searchTerm = "";
  courseTerm = "";
  allColleges = [];
  allCourses = [];

  filterContent(searchTerm) {
    let result = this.allColleges.filter((college) => college.name.toLowerCase().includes(searchTerm.toLowerCase()));
    result = result.slice(0, 10);
    this.setState({ ...this.state, searchedColleges: result });
  }
  filterContent2 = (term) => {
    let result = this.allCourses.filter((course) => course.courseName.toLowerCase().includes(term.toLowerCase()));
    result = result.slice(0, 10);
    this.setState({ ...this.state, searchedCourses: result });
  }

  changeSearchTerm = async (e) => {
    this.searchTerm = e.target.value;
    if (this.searchTerm === "") {
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
    this.allColleges = json;
    this.filterContent(this.searchTerm);
  }

  changeCourseTerm = async (e) => {
    this.courseTerm = e.target.value;
    if (this.courseTerm === "") {
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
    this.allCourses = json;
    this.filterContent2(this.courseTerm);
  }


  onClickCollege(name) {
    let input = document.querySelector('#searchBar');
    input.value = name;
    document.getElementById("searchResults").style.display = "none";
    let filtered = this.props.ratings.filter((college) => {
      return college[0] === name;
    })
    let count = this.filterStars(filtered);
    this.setState({
      ...this.state,
      reviews: filtered,
      filtered_By_College_Course: filtered,
      reviewCount: count[0],
      findCourse: name,
      averageRating: count[1]
    })
  }

  onClickCourse = (name) => {
    let input = document.querySelector('#courseSearchBar');
    input.value = name;
    document.getElementById("courseResults").style.display = "none";
    let filtered = this.props.ratings.filter((course) => {
      return course[4] === name;
    })
    let count = this.filterStars(filtered);
    this.setState({
      ...this.state,
      reviews: filtered,
      filtered_By_College_Course: filtered,
      reviewCount: count[0],
      findCourse: name,
      averageRating: count[1]
    })
  }

  filterStars = (filtered) => {
    let count = [0, 0, 0, 0, 0];
    console.log(filtered);
    filtered.map((ele) => {
      count[ele[2] - 1] = count[ele[2] - 1] + 1;
    })
    let avg = 0;
    let total = 0;
    for (var i = 0; i < 5; i++) {
      if (filtered.length === 0)
        count[i] = 0;
      else
        count[i] = Math.floor(count[i] / filtered.length * 100);
      avg += count[i] * (i + 1);
      total += count[i];
    }
    return [count, Math.floor(avg / total)];
  }

  sortWithStars(stars) {
    let filtered = this.state.filtered_By_College_Course.filter((data) => {
      console.log(data[2], stars, this.state.findCollege, data[0])
      return data[2] >= stars && (this.state.findCollege == '' || data[0] == this.state.findCollege);
    });
    this.setState({ ...this.state, reviews: filtered })
  }

  clearFilters = () => {
    this.setState({
      searchedColleges: [],
      searchedCourses: [],
      reviews: (this.props.ratings),
      reviewCount: (this.props.count),
      findCollege: "",
      findCourse: ""
    })
  }

  render() {
    return (
      <>
        <div className='w-full bg-gray-100'>
          <div className="">
            <div>
              <div className='bg-sky-600 h-64'>

                <div className='flex justify-between py-5 px-8 '>
                  <div className='text-white w-1/2 text-3xl italic font-bold'>
                    Rayoc <img
                      className="h-8 w-8 inline"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt="Your Company"
                    />
                  </div>
                  <div className='bg-gray-500 h-12 w-12 rounded-full'>
                    <img src={`https://api.multiavatar.com/garvit.png?apikey=jDLBmJ7USQizoZ`} />
                  </div>
                </div>
                <hr />
                <div className='flex justify-between items-center px-8'>
                  <div>
                    <Link href='/'>
                      <button className='p-2 m-4 text-white font-medium'>Home</button>
                    </Link>
                    <Link href='/post'>
                      <button className='p-2 m-4 text-white font-medium'>Post Review</button>
                    </Link>
                    <Link href='/post'>
                      <button className='p-2 m-4 text-white font-medium'>Website Demo</button>
                    </Link>
                    <Link href='/post'>
                      <button className='p-2 m-4 text-white font-medium'>About</button>
                    </Link>
                  </div>
                  <div style={{ 'width': '33vw' }}>
                    <input className='w-full p-2 rounded-lg' name="collegeName" id="searchBar" autoComplete="off" placeholder='Search' onChange={this.changeSearchTerm} />
                    <div id="searchResults" className='absolute bg-white border-2 hidden' style={{ 'width': '33vw' }}>
                      {this.state.searchedColleges.map((ele) => {
                        return <div key={ele.rank} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { this.onClickCollege(ele.name) }}>
                          {ele.name}
                        </div>
                      })}


                    </div>
                  </div>
                </div>
              </div>
                <div className='flex justify-between items-start px-8' style={{ 'marginTop': '-90px' }}>
                  <div className='w-3/5 p-6 border-2 bg-white rounded-xl' style={{ 'width': '55vw' }}>
                    {this.state.reviews.length !== 0 ? (this.state.reviews.map((ele, index) => {
                      return <ReviewCard key={index} author={ele[1]} collegeName={ele[0]} review={ele[3]} stars={ele[2]} course={ele[4]} />
                    })) : <div className='flex justify-center'>No reviews found</div>}
                  </div>
                  <div className='w-2/6 p-6 border-2 bg-white rounded-xl' style={{ 'width': '33vw'}}>
                    <div className='flex justify-between'>
                      <div className='text-lg font-semibold'>Student Reviews</div>
                      <button onClick={this.clearFilters}>Clear Filters</button>
                    </div>
                    <div>
                      <Icon name='star' color={(this.state.averageRating >= 1) ? 'yellow' : 'grey'} />
                      <Icon name='star' color={(this.state.averageRating >= 2) ? 'yellow' : 'grey'} />
                      <Icon name='star' color={(this.state.averageRating >= 3) ? 'yellow' : 'grey'} />
                      <Icon name='star' color={(this.state.averageRating >= 4) ? 'yellow' : 'grey'} />
                      <Icon name='star' color={(this.state.averageRating >= 5) ? 'yellow' : 'grey'} />
                      Based on {this.state.reviews.length} Reviews
                    </div>
                    <div className='mb-3 mt-6'>
                      5 <Icon name='star' color='yellow' />
                      <div className="h-4 ml-4 rounded-lg w-2/3 bg-gray-200 inline-block">
                        <div className='h-full bg-yellow-500 rounded-lg' style={{ 'width': `${this.state.reviewCount[4]}%` }}></div>
                      </div> {this.state.reviewCount[4]}%
                    </div>
                    <div className='my-3'>
                      4 <Icon name='star' color='yellow' />
                      <div className="h-4 ml-4 rounded-lg w-2/3 bg-gray-200 inline-block">
                        <div className='h-full bg-yellow-500 rounded-lg' style={{ 'width': `${this.state.reviewCount[3]}%` }}></div>
                      </div> {this.state.reviewCount[3]}%
                    </div>
                    <div className='my-3'>
                      3 <Icon name='star' color='yellow' />
                      <div className="h-4 ml-4 rounded-lg w-2/3 bg-gray-200 inline-block">
                        <div className='h-full bg-yellow-500 rounded-lg' style={{ 'width': `${this.state.reviewCount[2]}%` }}></div>
                      </div> {this.state.reviewCount[2]}%
                    </div>
                    <div className='my-3'>
                      2 <Icon name='star' color='yellow' />
                      <div className="h-4 ml-4 rounded-lg w-2/3 bg-gray-200 inline-block">
                        <div className='h-full bg-yellow-500 rounded-lg' style={{ 'width': `${this.state.reviewCount[1]}%` }}></div>
                      </div> {this.state.reviewCount[1]}%
                    </div>
                    <div className='my-3'>
                      1 <Icon name='star' color='yellow' />
                      <div className="h-4 ml-4 rounded-lg w-2/3 bg-gray-200 inline-block">
                        <div className='h-full bg-yellow-500 rounded-lg' style={{ 'width': `${this.state.reviewCount[0]}%` }}></div>
                      </div> {this.state.reviewCount[0]}%
                    </div>

                    <div className='text-lg font-semibold mt-6 mb-2'>Share your thoughts</div>
                    <div className='flex justify-center flex-col'>If you are studing in college, share your valuable feedback to millions of freshers
                      <Link href='/post'>
                        <button className='border-2 py-2 px-12 my-4'>Write a review</button>
                      </Link>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-lg font-semibold mt-4 mb-2'>Filter Review</div>
                      <div className="mt-2" style={{}}>
                        <input
                          name="course"
                          id="courseSearchBar"
                          autoComplete="off"
                          placeholder='Course Name'
                          onChange={this.changeCourseTerm}
                          className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div id="courseResults" className='w-1/4 rounded-md hidden absolute bg-white border-2'>
                          {this.state.searchedCourses.map((ele, index) => {
                            return <div key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => { this.onClickCourse(ele.courseName) }}>
                              {ele.courseName}
                            </div>
                          })}
                        </div>
                      </div>
                      <div className="ml-1 mb-1 mt-4">
                        <input type="radio" id='stars_5' name="sortWithStars" onClick={() => { this.sortWithStars('5') }} />
                        <label htmlFor='stars_5'>5<Icon name='star' color='black' size='small' /> & above</label>
                      </div>
                      <div className="m-1">
                        <input type="radio" id='stars_4' name="sortWithStars" onClick={() => { this.sortWithStars('4') }} />
                        <label htmlFor='stars_4'>4<Icon name='star' color='black' size='small' /> & above</label>
                      </div>
                      <div className="m-1">
                        <input type="radio" id='stars_3' name="sortWithStars" onClick={() => { this.sortWithStars('3') }} />
                        <label htmlFor='stars_3'>3<Icon name='star' color='black' size='small' /> & above</label>
                      </div>
                      <div className="m-1">
                        <input type="radio" id='stars_2' name="sortWithStars" onClick={() => { this.sortWithStars('2') }} />
                        <label htmlFor='stars_2'>2<Icon name='star' color='black' size='small' /> & above</label>
                      </div>
                      <div className="m-1">
                        <input type="radio" id='stars_1' name="sortWithStars" onClick={() => { this.sortWithStars('1') }} />
                        <label htmlFor='stars_1'>1<Icon name='star' color='black' size='small' /> & above</label>
                      </div>
                    </div>

                  </div>
                </div>
            </div>
          </div>
        </div>

      </>

    )
  }
}

export default RatingIndex