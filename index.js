const Koa = require('koa')
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser')
const RouterMapper = require('./src/core/Router')
const admin = require('./src/routers/admin')
const login = require('./src/routers/login')
const logout = require('./src/routers/logout')
const school = require('./src/routers/school')
const repairer = require('./src/routers/repairer')
const cors = require('@koa/cors')
const errHandler = require('./src/middleware/errHandler')
const auth = require('./src/middleware/auth')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs') 

const koa = new Koa()

const routerMapper = new RouterMapper([
    ...admin,
    ...school,
    ...repairer,
    ...login,
    ...logout
])

const routers = routerMapper.initRoutes()
const template = fs.readFileSync(path.resolve(__dirname, './src/static/index.html'))


koa.proxy = true
// console.log('index')
// console.log(path.resolve(__dirname, './src/static'))
koa
    .use(errHandler())
    .use(auth())    
    .use(helmet())
    .use(cors())
    .use(serve(path.resolve(__dirname, './src/static')))
    
    .use(bodyParser())
    .use(routers())
    .use(async ctx => {
        ctx.status = 200
        ctx.set('Content-Type', 'text/html; charset=utf-8')
        // console.log(template)
        ctx.body = template
    })
    .listen(3389, () => {
        console.log('Server Success Listen on 3389 port')
    })
    