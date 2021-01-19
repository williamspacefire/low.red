import { host, user, database, password } from '../../../../components/env';

const mysql = require('mysql');
const base64 = require("base-64");
const urlencode = require("urlencode");
const validUrl = require("url-validation");
const parse = require('url-parse');
const shortenerProviders = require('../../../../components/shortenerproviders');

const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

export default function handler(req, res) {

    const { query: {url}, } = req;
    const newUrl = urlencode.decode(url);
    const urlParsed = parse(newUrl, true)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 's-maxage=15778800, stale-while-revalidate')
    
    if (validUrl(newUrl) && !shortenerProviders.includes(urlParsed.host)) {
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
                        res.end(JSON.stringify({
                            url: newUrl,
                            short: short
                        }))
                    })
                })
            }
        })
    } else if (shortenerProviders.includes(urlParsed.host)) {
        res.end(JSON.stringify({
            error: true,
            message: `This is already a ${urlParsed.host} shortened url.`,
            code: 346
        }))
    } else {
        res.end(JSON.stringify({
            error: true,
            message: "Invalid url, please try again with a valid url.",
            code: 345
        }))
    }
  }
  