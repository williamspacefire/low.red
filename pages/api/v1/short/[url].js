import { host, user, database, password, hosturl } from '../../../../components/env';

const mysql = require('mysql');
const base64 = require("base-64");
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
    
    db.query(`SELECT * FROM urls WHERE url = '${url}' LIMIT 1`, (error, results, fields) => {
        if (results.length > 0) {
            res.end(JSON.stringify({
                url: results[0].url,
                short: results[0].short
            }))
        } else {
            db.query("SELECT id FROM urls ORDER BY id DESC LIMIT 1", (error, results, fields) => {
                if (error) throw error;
        
                let id = 1
        
                if (results.length > 0) id = results[results.length-1].id+1
                
                let short = base64.encode(id);
                
                while(short.includes("=")) short = short.replace("=", "");
                
                db.query('INSERT INTO urls SET ?', {short: short, url: newUrl}, (error, results, fields) => {
                    if (error) throw error;
        
                    console.log(results.insertId);
                    fetch(`${hosturl}/${short}`);
                    res.end(JSON.stringify({
                        url: newUrl,
                        short: short
                    }))
                })
            })
        }
    })
  }
  