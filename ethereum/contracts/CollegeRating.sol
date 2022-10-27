// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9 ;

contract CollegeRating {

    struct Feedback{
        string collegeName;
        string studentName;
        string star;
        string feedback;
    }
    
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

        collegesRatings.push(newFeedback);
        totalRatings++;
    }

    function getCollegesRatings() public view returns(Feedback[] memory){
        return collegesRatings;
    }

}