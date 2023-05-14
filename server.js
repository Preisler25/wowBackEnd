let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    let email = req.query.email;

    if (username == 'admin' && password == 'admin') {
        res.json({success: true, message: 'Login successfully'});
    }
});


app.listen(port, () => {'Server is running on port ' + port});