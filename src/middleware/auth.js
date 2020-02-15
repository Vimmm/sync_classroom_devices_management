const {exec} = require('../db')

module.exports = () => async (ctx, next) => {
    const token = ctx.cookies.get('token')
    const userInfo = Buffer.from(token, 'base64').toString('utf-8')
    // console.log(userInfo)
    const [ID, account, identity] = userInfo.split('.')
    // console.log(ID, account, identity)
    let sql
    if(identity === 'school') {
        sql = `select account from school where ID=${ID}`
    }else if(identity === 'repairer'){
        sql = `select account from user where ID=${ID} and role=2`
    } else if ( identity === 'admin') {
        sql = `select account from user where ID=${ID} and role=1`
    }else {
        throw new Error('请登陆')
    }
    const [data] = await exec(sql)
    if (data.account !== account) throw new Error('请登陆')
    else {
        ctx.state['account'] = account
        ctx.state['identity'] = identity
        ctx.state['userId'] = ID
    }
    await next()
}