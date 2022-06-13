// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9 ;

contract CollegeRating {

    struct Feedback{
        string studentName;
        string star;
        string feedback;
    }

    mapping (string => Feedback[]) public rating;

    function giveRating(
        string memory collegeName,
        string memory studentName,
        string memory star,
        string memory feedback
    ) public{
        Feedback memory newFeedback = Feedback({
            studentName: studentName,
            star: star,
            feedback: feedback
        });
        rating[collegeName].push(newFeedback);
    }

    function getRatings(string memory collegeName) public view returns (Feedback[] memory){
        return rating[collegeName];
    }

}