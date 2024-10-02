import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize'
import { User } from './User.js'

export const Payment = sequelize.define('Payment', {
    id:{
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    amount:{
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    
    },
    date: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW },
})

Payment.belongsTo(User, { foreignKey: 'userId' });

/*(async () =>{
    try {
        await sequelize.sync();
        console.log("Table Payment created");
        
    } catch (error) {
        console.log("Error creating table Payment: ", error);
        
    }
})*/