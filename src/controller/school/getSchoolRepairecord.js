const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // console.log(school)
    const {school} = ctx.query
    console.log(school)
    const sqlSchoolrecord = `select * from repair_records where school=${school}`
    ctx.body = await exec(sqlSchoolrecord)
    
    // const data = '廖莎'
    // ctx.body = data
}