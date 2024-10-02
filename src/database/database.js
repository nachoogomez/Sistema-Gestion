import { Sequelize } from "sequelize";

export const sequelize = new Sequelize ('sistemagest', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})