const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    const sqlUser = `select * from user where role=2`
    const sqlSchool = `select * from school`
    const [users, schools] = await Promise.all([
        exec(sqlUser),
        exec(sqlSchool)
    ])
    ctx.body = users.map(user => {
        user.school = schools.filter(school => school.repairer === user.ID)
        return user
    })
}