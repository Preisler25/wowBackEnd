let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    if (username == 'admin' && password == 'admin') {
        res.json({status: true, email: "email", best_time: 100, games_played: 100, miss_clicked: 10});
    }
    else {
        res.json({status: false, message: 'Login failed'});
    }
});


app.listen(port, () => {console.log('Server is running on port ' + port)});