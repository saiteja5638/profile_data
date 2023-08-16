
const fs = require('fs');

  function read()
  {
    fs.readFile('app/crud_json/webapp/model/data.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Error reading file');
          return;
        }
        res.send(data);
      });
  }

  read()


module.exports = read
