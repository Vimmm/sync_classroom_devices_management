const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // console.log(school)
    const sqlSchool = `select name,location,type,tel,ID,repairer from school`
    const sqlDevices = `select * from devices`
    const [schools, devices] = await Promise.all([
        exec(sqlSchool),
        exec(sqlDevices)
    ]).catch(err => console.log(err))
    // console.log(schools, devices)
    ctx.body = schools.map(school => {
        school.devices = devices.filter(device => device.school === school.ID)
        return school
    })
    // const data = '廖莎'
    // ctx.body = data
}