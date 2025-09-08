require('dotenv').config();
const createServer = require('./Infrastructures/http/createServer.js');
const container = require('./Infrastructures/ServiceLocator.js');

const PORT = process.env.PORT || 3000;
const app = createServer(container);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});