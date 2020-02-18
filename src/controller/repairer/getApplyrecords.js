const {exec} = require('../../db')

module.exports = async (ctx) => {

    const repairerID = ctx.state.userId
    const { status } = ctx.query
    let sqlRecord
    if (status) {
        sqlRecord = `select * from repair_records where repairer=${repairerID} and status=${status}`
    } else {
        sqlRecord = `select * from repair_records where repairer=${repairerID}`
    }
    const data = await exec(sqlRecord)
    if (data.length !== 0) {
        const sqlSchool = `select * from school where ID in (${Array.from(new Set(data)).map(record => record.school).join(',')})`
        const sqlDevice = `select * from devices where ID in (${Array.from(new Set(data)).map(record => record.device).join(',')})`
        const [schools, devices] = await Promise.all([exec(sqlSchool), exec(sqlDevice)])
        ctx.body = data.map(it => {
            it.schoolInfo = (schools || []).find(s => s.ID === it.school) || {}
            it.deviceInfo = (devices || []).find(d => d.ID === it.device) || {}
            return it
        })
    } else ctx.body = []
}