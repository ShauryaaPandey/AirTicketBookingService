const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const {PORT } = require('./config/server-config');

const ApiRoutes = require('./routes/index');

const db = require('./models/index');

const setupAndStartServer = () => {

    //setting bodyparser middleware
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);

    app.listen(PORT,() => {
        console.log(`Server started at PORT : ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
            }
    });
}

setupAndStartServer();