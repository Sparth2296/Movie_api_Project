const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const db = require('./config/db')



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.use('/assets', express.static(path.join(__dirname, './assets')))
app.set('/views', express.static(path.join(__dirname, './views')))
app.use('/', require('./router/movie.router'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Example app listening on port ${port}!`);
    }
});