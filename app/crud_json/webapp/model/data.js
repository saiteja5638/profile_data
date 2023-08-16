const express = require('express');
const fs = require('fs');

const app = express();

app.get('/api/readfile', (req, res) => {
  fs.readFile('app/crud_json/webapp/model/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});