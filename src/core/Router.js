const compose = require('koa-compose')
const Router = require('koa-router')

module.exports = class RouterMapper {
    constructor (configs) {
        this.configs = configs
    }
    initRoutes () {
        const routes = this.generateRoutes()
        return () => compose([
            ...routes.map(r => r.routes()),
            ...routes.map(r => r.allowedMethods())
        ])
    }
    generateRoutes () {
        return this.configs.map(
            conf => conf.routes.reduce(
                (router, item) => router[item.method || 'all'](item.path, item.controller),
                new Router({ prefix: conf.prefix })
            )
        )
    }
}