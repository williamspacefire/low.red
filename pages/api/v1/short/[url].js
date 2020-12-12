//const {db} = require("../../../../components/dbconnection");
import { host, user, database, password } from '../../../../components/env';

const mysql = require('mysql');
const sha256 = require("js-sha256").sha256;
const urlencode = require("urlencode");

const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

export default function handler(req, res) {

    const { query: {url}, } = req;
    let newUrl = urlencode.decode(url);

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    
    const h = sha256(newUrl);
    const hash = h[0]+h[1]+h[2]+h[3]+h[4];
    
    db.query('INSERT INTO urls SET ?', {short: hash, url: newUrl}, (error, results, fields) => {
        //db.release();
        
        if (error) throw error;

        console.log(results.insertId);
        res.end(JSON.stringify({
            url: newUrl,
            short: hash
        }))
    })
  }
  