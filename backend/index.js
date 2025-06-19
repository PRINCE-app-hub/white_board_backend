// this one is to start the server 

const app=require('./server/server');
const { server } = require('./server/server'); 
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
