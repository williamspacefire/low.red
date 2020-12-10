import { host, user, database, password } from '../../../../components/env';
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

export default function handler(req, res) {

    const { query: {url}, } = req;
    let newUrl = url;

    while(newUrl.includes("%2f")) newUrl =  newUrl.replace("%2f", "-")

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ deus: newUrl }))
  }
  