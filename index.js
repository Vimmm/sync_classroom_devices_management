const Koa = require('koa')
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser')
const route = require('./src/routers')
const RouterMapper = require('./src/core/Router')
const admin = require('./src/routers/admin')
const school = require('./src/routers/school')
const repairer = require('./src/routers/repairer')
const cors = require('@koa/cors')
const errHandler = require('./src/middleware/errHandler')
const auth = require('./src/middleware/auth')

const koa = new Koa()

const routerMapper = new RouterMapper([
    ...route,
    ...admin,
    ...school,
    ...repairer,
])

const routers = routerMapper.initRoutes()

koa.proxy = true

koa
    .use(errHandler())
    .use(auth())
    .use(helmet())
    .use(cors())
    .use(bodyParser())
    .use(routers())
    .listen(3000, () => {
        console.log('Server Success Listen on 3000 port')
    })