const {exec} = require('../../db')

module.exports = async (ctx) => {
    ctx.cookies.set('token', '', {signed: false, maxAge: 0})
    ctx.body = '/login'

}