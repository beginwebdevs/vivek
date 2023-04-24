require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cookieParser = require('cookie-parser')
const path = require('path')


const cors = require('cors');
const app = express();






const PORT = process.env.PORT || 5000;




app.use(cors({ credentials: true, origin: ['https://vadmin.beginweb.in', 'https://vivekf.beginweb.in', 'http://localhost:3000'] }));
app.use(express.json({limit: '8mb'}));
app.use(cookieParser())
app.use(routes);



app.get('/', (req, res) => {
    res.sendFile(path.join('app', 'index.html'))
})





mongoose.connect(process.env.MONGOURL).then(() => {

app.listen(PORT, () => {
    console.log('app is listening')
})
})
