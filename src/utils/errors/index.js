const { ValidationError } = require("sequelize");
const AppError = require("./app-error");
const ServiceError = require("./service-error");

module.exports = {
    AppError : require('./app-error'),
    ValidationError : require('./validation-error'),
    ServiceError : require('./service-error')
}