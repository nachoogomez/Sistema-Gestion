import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol :{
        type: DataTypes.ENUM('superadmin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
});

// Sync model

/*(async () =>{
    try {
       await sequelize.sync();
        console.log("Table User created");
    } 
    catch (error) {
        console.log("Error creating table User: ", error);
        
    }
})();*/
