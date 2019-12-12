var express = require('express');
var app = express();

app.listen(4000, () => {
  console.log('Server running on port 3000');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/temp', (req, res, next) => {
  // simulate temp
  const precision = 10; // 2 decimals
  let max = 35;
  let min = 15;
  let randomnum =
    Math.floor(
      Math.random() * (max * precision - min * precision) + min * precision
    ) /
    (1 * precision);
  res.json({ value: randomnum });
});

app.get('/humidity', (req, res, next) => {
  // simulate humidity %
  let max = 70;
  let min = 35;
  let randomnum = Math.floor(Math.random() * (max - min) + min);
  res.json({ value: randomnum });
});

app.get('/air-pressure', (req, res, next) => {
  // air pressure in psi
  // @see https://en.wikipedia.org/wiki/Standard_conditions_for_temperature_and_pressure
  const precision = 1000; // 2 decimals
  let max = 14.6959;
  let min = 14.5038;
  let randomnum =
    Math.floor(
      Math.random() * (max * precision - min * precision) + min * precision
    ) /
    (1 * precision);
  res.json({ value: randomnum });
});
