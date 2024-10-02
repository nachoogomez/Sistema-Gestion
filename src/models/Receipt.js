import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize'
import { Payment } from './Payment.js'

export const Receipt = sequelize.define('Receipt', {
    id:{
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    file:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

Receipt.belongsTo(Payment, { foreignKey: 'paymentID' });

