/* eslint-disable no-console */
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./todoSchema');

mongoose.Promise = global.Promise;
const mongodb = mongoose.connect('mongodb://localhost:27017/localtest', {
  useNewUrlParser: true, // 이 부분이 다른걸로 바뀜
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodb.then(() => {
  console.log('mongodb has been connected');
}).catch((err) => {
  console.log('mongodb connect err', err);
});

app.listen(3000, () => console.log('server is run'));

app.post('/save', (req, res) => {
  const todo = new TodoModel({
    message: req.body.message,
    date: req.body.date,
  });

  todo.save((err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
});
