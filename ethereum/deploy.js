const HDWalletProvider = require('@truffle/hdwallet-provider'); // It's going to simultaneously specify which account we want to unlock and use as a source of Ether for deploying our contract and it's also going to specify that outside API or what outside node we are going to connect to.
const Web3 = require('web3');
const compiledCollegeRating = require('./build/CollegeRating.json');

const provider = new HDWalletProvider(
    'session carbon task this muscle right reveal fork oak nephew blouse sick', // This is our Account Mneumonic. Account Mneumonic allows us to derive both public and private key. So with mneumonic alone we can get the total access to our account through this HD wallet provider.
    'https://sepolia.infura.io/v3/f2d8f3681edc4ae99f2ea03ae71effdd' // This is the url of what network we want to connect to.
);

const web3 = new Web3(provider);

const deploy = async()=>{  // The only reason to create the deploy method here is to use the async await syntax as we can't use await outside a method.
    const accounts = await web3.eth.getAccounts(); // We may be think here that why we are getting accounts here instead of a single account as we have passed a single mneumonic. It's because even a single mneumonic can generate multiple account. Please research how?
    console.log('Attempting to deploy from account', accounts[0]);

    let result;
    try{
        let result = await new web3.eth.Contract(compiledCollegeRating.abi) // We are receiving JSON as the ABI in interface property we don't want to pass the json to create a contract that's why we are parsing(dividing) the JSON file into javascript object.
        .deploy({
            data: compiledCollegeRating.evm.bytecode.object // In data property we are specifing the bytecode which is the actual raw compiled contract.
        })
        .send({    // It's actually the send method that triggers the communication from web3 off to the network.
            from: accounts[0], // It's the person's account that is being used to create the contract.
            gas: '1000000', // Gas is the maximum about of wei we can send with the request or the minimum. NOT SURE.
        })
        console.log('Contract deployed to: ',result.options.address);
    }catch (error) {
        console.log( "Something went wrong!!!", error.message);
    }

    

        provider.engine.stop(); // To prevent a hanging development, added this code. Please do research...

};
deploy();
// console.log(compiledCollegeRating.abi)