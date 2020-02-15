const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    const account = ctx.state.account
    
    const sqlUser = `select * from user where account='${account}'`
    const [user] = await exec(sqlUser)

    const sqlSchool = `select * from school where repairer=${user.ID}`
    const schools = await exec(sqlSchool)

    if(Array.isArray(schools) && schools.length !== 0) {
        const schoolsInSql = schools.map(school => school.ID).join(',')
        const sqlDevices = `select * from devices where school in (${schoolsInSql})`
        // const statusSql = `select * from repair_records where school in (${schoolsInSql})`
        const devices = await exec(sqlDevices)
        
        user.schools = schools.map(school => {
            school.allDevice = devices.filter(device => device.school === school.ID)
            return school
        })
    }

    ctx.body = user
}