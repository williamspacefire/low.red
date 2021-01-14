import { host, user, database, password } from '../../../../../components/env';

const mysql = require('mysql');
const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

export default function handler(req, res) {

    const { query: {id}, } = req;

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    
    db.query(`SELECT * FROM urls WHERE short = '${id}' LIMIT 1`, (error, results, fields) => {
        
        if (error) throw error;
        
        if (results[0] && results[0]?.short === id) {
            res.end(JSON.stringify(results[0]))
        } else {
            res.end(JSON.stringify({
                error: true,
                message: "ID not found in the database",
                code: 404
            }))
        }
    })
}