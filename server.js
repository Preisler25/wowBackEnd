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
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  
app.get('/endGame', async (req, res) => {
    let username = req.query.username;
    let best_time = req.query.best_time;
    let missed_clicks = req.query.missed_clicks;

    console.log(best_time);
    let sql = `UPDATE users SET best_time = ${best_time}, games_played = games_played + 1, missed_clicks =  ${missed_clicks} WHERE user_name = '${username}'`;

    console.log(sql);

    try {
        let rows = await dbGet(sql);

        console.log(rows);

        if (rows.length > 0) {
            console.log('Update successful');
            console.log(rows[0]);
            res.json({
                status: true,
            });
        } else {
            console.log('Update failed');
            res.json({ status: false, message: 'Update failed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: false, message: 'An error occurred' });
    }
});


app.get('/login', async (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
  
    let sql = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}'`;
    console.log(sql);
    try {
      let rows = await dbGet(sql);
  
      console.log(rows);
  
      if (rows.length > 0) {
        console.log('Login successful');
        console.log(rows[0]);
        res.json({
          status: true,
          email: rows[0].email,
          best_time: rows[0].best_time,
          games_played: rows[0].games_played,
          missed_clicks: rows[0].missed_clicks
        });
      } else {
        console.log('Login failed');
        res.json({ status: false, message: 'Login failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.json({ status: false, message: 'An error occurred' });
    }
  });
  
app.listen(port, () => {console.log('Server is running on port ' + port)});