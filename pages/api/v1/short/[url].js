import { host, user, database, password } from '../../../../components/env';

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ host: host }))
  }
  