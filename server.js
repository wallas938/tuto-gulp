const express = require('express');
const app = express();
const fs = require('fs');

console.log(process.env.PORT)
app.use(express.static('src'))

app.get('/', function(req, res, next) {
    fs.readFile('src/index.html', (err, data) => {
        if (err) throw err;
        return res.status(200)
            .setHeader('Content-Type', 'text/css')
            .send(data);
    })
});

app.listen(3000, function() {
    console.log('Server is running at 3000')
})