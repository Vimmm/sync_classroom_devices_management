module.exports = class ErrorModel {
    constructor (message) {
        this.code = -1
        this.message = message
        this.data = {}
    }
}