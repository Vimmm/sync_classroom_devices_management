
const ErrorModel = require('../model/error')
const SuccessModel = require('../model/success')

module.exports = () => async (ctx, next) => {
    if(ctx.path.startsWith('/api')){
        try {
            await next()
            ctx.body = new SuccessModel(ctx.body)
        } catch (err) {
            // console.error(err)
            ctx.body = new ErrorModel(err.toString())
        }
    } else {
        await next()
    }
    
}
