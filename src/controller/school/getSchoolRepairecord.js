const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    const school = ctx.state.userId

    const sqlSchoolrecord = `select * from repair_records where school=${school}`
    const data = await exec(sqlSchoolrecord)
    
    if (data.length !== 0) {
        // (${Array.from(new Set(data)).map(record => record.school).join(',')})
        const sqlDevice = `select * from devices where ID in (${Array.from(new Set(data)).map(it => it.device).join(',')})`
        const devices = await exec(sqlDevice)
        const sqlRepairer = `select * from user where ID in (${Array.from(new Set(data)).map(it => it.repairer).join(',')}) and role="2"`
        const repairerInfo = await exec(sqlRepairer)
        ctx.body = data.map(it => {
            it.deviceInfo = (devices || []).find(d => d.ID === it.device) || {}
            it.repairerInfo = (repairerInfo || []).find(d => d.ID === it.repairer) || {}
            return it
        })
    } else ctx.body = []
}