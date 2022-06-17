// The purpose of that is to make sure that we can manually boot up our next application and specifically tell it to use our routes.js file.

const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
})

const routes = require('./routes');

const handler = routes.getRequestHandler(app);

app.prepare().then(()=>{
    createServer(handler).listen(3000, (err)=>{
        if(err) throw err;
        console.log('Ready on localhost: 3000');
    })
})