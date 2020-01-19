const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const mime = require('mime-types')

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', function(req, res, next) {
    fs.readFile('dist/index.html', (err, data) => {
        res.status(200)
        res.end(data);
    })
});

app.listen(3000, function() {
    console.log('Server is running at 3000')
})