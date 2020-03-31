const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const sqlCords = `select * from school`
    const sqlRepaircords = `select * from repair_records`
    const data = await exec(sqlRepaircords)

    if (data.length !== 0) {
        // (${Array.from(new Set(data)).map(record => record.school).join(',')})
        const sqlRepairer = `select * from user where ID in (${Array.from(new Set(data)).map(it => it.repairer).join(',')}) and role="2"`
        const repairerInfo = await exec(sqlRepairer)
        // console.log(await exec(sqlDevice))
        // return []
        ctx.body = data.map(it => {
            it.repairerInfo = (repairerInfo || []).find(d => d.ID === it.repairer) || {}
            return it
        })
    } else ctx.body = []
}