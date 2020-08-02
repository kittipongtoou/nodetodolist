const mysql = require('mysql')
 
var pool =  mysql.createPool({
    host     : 'us-cdbr-east-02.cleardb.com',
    user     : 'b035c98fa4534a',
    password : '13ab901c',
    database : 'heroku_3ed15bc696398e0'
    });


module.exports = pool