const sequelize = require('./config/database');

require('./models/*');

sequelize.sync({force:true});