// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9 ;

contract CollegeRating {

    struct Feedback{
        string collegeName;
        string studentName;
        string star;
        string feedback;
    }

    // mapping (string => Feedback[]) public rating;

    Feedback[] public collegesRatings;
    uint public totalRatings = 0;

    function giveRating(
        string memory collegeName,
        string memory studentName,
        string memory star,
        string memory feedback
    ) public{
        Feedback memory newFeedback = Feedback({
            collegeName: collegeName,
            studentName: studentName,
            star: star,
            feedback: feedback
        });
        // rating[collegeName].push(newFeedback);
        collegesRatings.push(newFeedback);
        totalRatings++;
    }

    // function getRatings(string memory collegeName) public view returns (Feedback[] memory){
    //     return rating[collegeName];
    // }

    function getCollegesRatings() public view returns(Feedback[] memory){
        return collegesRatings;
    }

}