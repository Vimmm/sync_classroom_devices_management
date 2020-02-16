const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'XiaoShuai@207',
    port: '3306',
    database: 'sc_devices'
})

con.connect()

const exec = sql => new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
        if (err) reject(err)
        else resolve(res)
    })
})

module.exports = { exec, escape: mysql.escape }