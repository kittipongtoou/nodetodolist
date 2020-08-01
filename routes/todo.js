var express = require('express');
var router = express.Router();
const db = require('../config/db')


router.get('/todolist', function(req, res) {
  let sql = `SELECT * FROM todolist`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "todo lists successfully"
    })
  })
});

router.post('/todolist', function(req, res) {
  let sql = `INSERT INTO todolist(todolist_text) VALUES (?)`;
  let values = [
    req.body.todolist_text,
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New todolist added successfully"
    })
  })
});


router.put('/todolist', function (req, res) {
  
  let id = req.body.id;
  let todolist_text = req.body.todolist_text;
  let status = req.body.status;

  if (!id || !todolist_text || !status) {
      res.status(400).send({ message: 'Please provide todolist id, text and status' });
  }

  db.query("UPDATE todolist SET todolist_text = ?, status = ? WHERE id = ?", [todolist_text, status, id], function (error, results, fields) {
      if (error) throw error;

      let message = "";
      if (results.changedRows === 0)
          message = "todolist not found or data";
      else
          message = "todolist successfully updated";

      res.json({ 
        error: false, 
        data: results, 
        message: message 
      });
  });
});

router.delete('/todolist', function (req, res) {
  
  let id = req.body.id;

  if (!id) {
      return res.status(400).send({ error: true, message: 'Please provide todolist id' });
  }
  db.query('DELETE FROM todolist WHERE id = ?', [id], function (error, results, fields) {
      if (error) throw error;

      let message = "";
      if (results.affectedRows === 0)
          message = "todolist not found";
      else
          message = "todolist successfully deleted";

      return res.send({ error: false, data: results, message: message });
  });
});



module.exports = router;
