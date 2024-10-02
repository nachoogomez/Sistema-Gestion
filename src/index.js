import app from './app.js';
//import './models/User.js';
//import './models/Payment.js';;
//import './models/Receipt.js';
import { sequelize } from './database/database.js'


async function main() {
        try {
           await sequelize.sync({force: false});

            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            }); 
            
        } catch (error) {
            console.log('Error connecting to the database: ', error);
            
        }
}

main();


