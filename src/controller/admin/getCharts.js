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
    ctx.body = data
}