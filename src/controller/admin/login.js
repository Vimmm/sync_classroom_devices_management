const {exec} = require('../../db')

module.exports = async (ctx) => {
    // 1. 参数解析
    // 2. 通过参数查询数据
    // 3. 数据处理
    // 4. 数据包装，错误处理
    // 5. 赋值返回
    // const school = ctx.query.school
    // admin, repairer, school
    // success jump
    const jumpUrls = {
        admin: '/admin',
        repairer: '/repairer',
        school: '/school'
    }
    const {inputAccount, inputPasswords, inputIdentity} = ctx.request.body
    let sql
    if(inputIdentity === 'school') {
        sql = `select ID,account,passwords from school where account='${inputAccount}'`
    }else if(inputIdentity === 'repairer'){
        sql = `select ID,account,passwords from user where account='${inputAccount}' and role=2`
    } else if ( inputIdentity === 'admin') {
        sql = `select ID,account,passwords from user where account='${inputAccount}' and role=1`
    }else {
        throw new Error('请选择正确身份')
    }

    const [data] = await exec(sql)
    
    if(data && inputPasswords === data.passwords){
        //验证成功，跳转至教学点页面
        //跳转代码待补充
        ctx.body = jumpUrls[inputIdentity]
    }else if(!data){
        throw new Error('账号不正确')
    }else {
        throw new Error('密码输入错误')
    }

    ctx.cookies.set('token', Buffer.from(`${data.ID}.${data.account}.${inputIdentity}`).toString('base64'))
}