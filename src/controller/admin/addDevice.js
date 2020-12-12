const {exec} = require('../../db')

module.exports = async (ctx) => {
    const {
        name,
        device_number, 
        device_model, 
        type,
        product_time,
        start_time,
        end_time,
        school,
        device_status
    } = ctx.request.body
    const sql = `insert into devices (name, device_number, device_model, type, product_time, start_time, end_time, school, device_status) 
        values ('${name}', '${device_number}', '${device_model}', ${type}, ${product_time}, ${start_time}, ${end_time}, ${school}, ${device_status})`
    const data = await exec(sql)
    const insertDataSql = `select * from devices where ID=${data.insertId}`
    ctx.body = await exec(insertDataSql)
}