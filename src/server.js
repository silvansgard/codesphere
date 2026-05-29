require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const stkRoutes = require('./routes/stkRoutes');

const application = express();
const applicationPort = process.env.PORT || 3000;

application.use(cors());
application.use(express.json());
application.use(express.static(path.join(__dirname, '..', 'public')));

application.use('/api', stkRoutes);

application.listen(applicationPort, () => {
  console.log(`Payment dashboard is running on port ${applicationPort}`);
});
