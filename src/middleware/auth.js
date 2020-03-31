const {exec} = require('../db')

const schoolRegexp = /^\/api\/school.*/
const repairerRegexp = /^\/api\/repairer.*/
const adminRegexp = /^\/api\/admin.*/

module.exports = () => async (ctx, next) => {
    if (ctx.path !== '/api/common/login' && ctx.path !== '/api/common/logout') {
        const token = ctx.cookies.get('token')
        if (!token) {
            ctx.status = 401
            return ctx.body = '/login'
        }
        const userInfo = Buffer.from(token, 'base64').toString('utf-8')
        const [ID, account, identity] = userInfo.split('.')
        // console.log(ID, account, identity)
        let sql
        if(identity === 'school') {
            if (!schoolRegexp.test(ctx.path)) throw new Error('您已越权')
            sql = `select account from school where ID=${ID}`
        }else if (identity === 'repairer'){
            if (!repairerRegexp.test(ctx.path)) throw new Error('您已越权')
            sql = `select account from user where ID=${ID} and role=2`
        } else if ( identity === 'admin') {
            if (!adminRegexp.test(ctx.path)) throw new Error('您已越权')
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
    }
    await next()
}