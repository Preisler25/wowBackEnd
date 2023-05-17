let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = 3000;
let { createPool } = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wow'
});

let dbGet = (sql) => {
    pool.query(sql, (err, result) => {
        if (err) throw err;
        return result;
    });
}

app.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    let sql = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}'`;
    console.log(sql);
    res = dbGet(sql);
    print(res);
    if (username == 'admin' && password == 'admin') {
        res.json({status: true, email: "email", best_time: 100, games_played: 100, missed_clicks: 10});
    }
    else {
        res.json({status: false, message: 'Login failed'});
    }
});


app.listen(port, () => {console.log('Server is running on port ' + port)});