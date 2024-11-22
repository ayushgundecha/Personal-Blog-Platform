const http = require('http');
const app = require('./app');

require('dotenv').config();

const {mongoConnection} = require('./services/mongo');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer(){
    await mongoConnection(); // establishing mongo connection
    server.listen(PORT, ()=> {
        console.log(`listening to the ${PORT} PORT `);
    });
}

startServer();
