const express = require('express'),
app = express();
const runnin = require('./data/playstation')

require('dotenv').config();
app.get('/', (req,res)=>{
    res.send(runnin)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async ()=>{
    await console.log(`listening to port: ${PORT}`);
})


