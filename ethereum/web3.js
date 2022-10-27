import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/575dd94850a143c7aaebe197e1031a35"
  );
  web3 = new Web3(provider);
}
 
export default web3;


// When we use create-react-app, that server or that process that we were running inside of our terminal took all of the react code that we wrote and served it up into our browser. So all create-react-app did for us was take all the javascript code and made it available to the browser. Our browser downloaded that code and executed that code. Our React application boot up and it displayed some amount of content on the screen.
// Nextjs makes use of a process called server site rendering. The idea of server side rendering is that whenever someone accesses our next js server, the server is going to take our React application and rather than just send all that javascript down to the browser, next is going to try to render the entire React app itself. In lehman language, all our javascript code is being executed on the next server. That server builds up an HTML document and then it takes that single document and it sends it down to the browser by which a user can see the content on the screen much much quickly
// Window is a global variable that is only available inside the browser. Since next js excecutes javascript code on next server, window object is undefined in that case.

// import Web3 from "web3";
// window.ethereum.request({ method: "eth_requestAccounts" });

// const web3 = new Web3(window.ethereum);

// export default web3;
