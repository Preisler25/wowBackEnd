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

let dbGet = async(sql) => {
    res = await pool.query(sql, (err, result) => {
        if (err) throw err;
        return result.rows;
    });
   return res;
}

app.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    let sql = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}'`;
    console.log(sql);
    resu = dbGet(sql);
    if (resu.rows != null) {
        res.json({status: true, email: resu.email, best_time: resu.best_time, games_played: resu.games_played, missed_clicks: resu.missed_clicks});
    }
    else {
        res.json({status: false, message: 'Login failed'});
    }
});


app.listen(port, () => {console.log('Server is running on port ' + port)});