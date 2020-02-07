const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    const {inputAccount, inputPasswords, inputIdentity} = ctx.request.body
    if(inputIdentity === 'school') {
        const sql = `select ID,account,passwords from school where account='${inputAccount}'`
        const [data] = await exec(sql)
        if(inputPasswords === data.passwords){
            //验证成功，跳转至教学点页面
            //跳转代码待补充
            ctx.body = data
        }else {
            ctx.body='密码输入错误'
        }
    }else if(inputIdentity === 'user'){
        const sql = `select ID,account,passwords,role from user where account='${inputAccount}'`
        const [data] = await exec(sql)
        console.log(data)
        if(inputPasswords === data.passwords){
           if(data.role === 1){
               //进入管理员页面
                ctx.body = data
           }else if(data.role === 2){
                 //进入维修员页面
                ctx.body = data
           }
        }else {
            ctx.body='密码输入错误'
        }
    }
}