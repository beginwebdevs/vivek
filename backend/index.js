require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const cors = require('cors');
const app = express();






const PORT = process.env.PORT || 5000;


app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'https://vivekf.beginweb.in'] }));
app.use(express.json({limit: '8mb'}));
app.use(routes);


app.get('/', (req, res) => {
    res.send('vivek apis');
})





mongoose.connect(process.env.MONGOURL).then(() => {

app.listen(PORT, () => {
    console.log('app is listening')
})
})
