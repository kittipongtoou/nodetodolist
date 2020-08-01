const mysql = require('mysql')
 

const db = mysql.createConnection({
    host     : 'us-cdbr-east-02.cleardb.com',
    user     : 'b035c98fa4534a',
    password : '13ab901c',
    database : 'heroku_3ed15bc696398e0'
  })
 
db.connect((err) =>{
    if(err){ 
        console.error('error connecting: ' + err.stack)
        return
    }
    console.log('connected as id ' + db.threadId)
}) 
module.exports = db