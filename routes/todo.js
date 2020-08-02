var express = require('express');
var router = express.Router();
const pool = require('../config/db')


router.get('/todolist', function(req, res) {
  pool.getConnection(function(err, connection){    
    connection.query('select * from todolist',  function(err, rows){
      if(err) throw err;
      else {
        res.json({
              status: 200,
              rows,
              message: "todo lists successfully"
            })
      }
    });
     
    connection.release();
  });
});
 
router.post('/todolist', function(req, res) {
  let sql = `INSERT INTO todolist(todolist_text) VALUES (?)`;
  let values = [
    req.body.todolist_text,
  ];
  pool.getConnection(function(err, connection){    
    connection.query(sql, [values],  function(err, rows){
      if(err) throw err;
      else {
        res.json({
          status: 200,
          message: "New todolist added successfully"
        })
      }
    }); 
    connection.release();
  });
});


router.put('/todolist', function (req, res) {
  let id = req.body.id;
  let todolist_text = req.body.todolist_text;
  let status = req.body.status;

  if (!id || !todolist_text || !status) {
      res.status(400).send({ message: 'Please provide todolist id, text and status' });
  }
  pool.getConnection(function(err, connection){    
    connection.query("UPDATE todolist SET todolist_text = ?, status = ? WHERE id = ?", [todolist_text, status, id], function(err, rows){
      if(err) throw err;
      else {
        let message = "";
        if (rows.changedRows === 0)
            message = "todolist not found or data";
        else
            message = "todolist successfully updated";
  
        res.json({ 
          error: false, 
          data: rows, 
          message: message 
        });
      }
    });
    connection.release();
  });
});

router.delete('/todolist/:id', function (req, res) {
  let id = req.params.id;

  if (!id) {
      return res.status(400).send({ error: true, message: 'Please provide todolist id' });
  }
  pool.getConnection(function(err, connection){    
    connection.query('DELETE FROM todolist WHERE id = ?', [id],  function(err, rows){
      if (err) throw err;

      let message = "";
      if (rows.affectedRows === 0)
          message = "todolist not found";
      else
          message = "todolist successfully deleted";

      return res.send({ error: false, data: rows, message: message });
    });
     
    connection.release();
  });
});



module.exports = router;
