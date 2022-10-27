import web3 from './web3';
import CompiledCollegeRating from './build/CollegeRating.json';

// This file is created because anytime we want to tell web3 about a already deployed contract, we have to give web3 that contract's interface or abi. And abi is defined in the CollegeRating.json file after we compile our ethereum directory

const instance = new web3.eth.Contract( // This is our contract instance which refers to a perticular address.
    CompiledCollegeRating.abi,
    '0x366Df48B3729489D95AE7568116611A04A7F10d4'
);

export default instance;