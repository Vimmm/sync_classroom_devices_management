const {exec} = require('../../db')

module.exports = async (ctx) => {

    const {repairerID} = ctx.query
    const sqlRecord = `select * from repair_records where repairer='${repairerID}'`
    const data = await exec(sqlRecord)
    ctx.body = data
}