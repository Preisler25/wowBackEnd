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

let dbGet = async (sql) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  app.get('/login', async (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
  
    let sql = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}'`;
    console.log(sql);
    try {
      let result = await dbGet(sql);
      let rows = result.rows;
  
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