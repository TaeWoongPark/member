import maria from 'mysql'
import axios from 'axios'
export const conn = maria.createConnection({
  host:'localhost',
  port:3306,
  user:'member',
  password:'1q2w3e!!',
  database:'memberBoard'  
})

/**
 * DB
 */
conn.connect()

axios.defaults.baseURL = 'http://localhost:4000'