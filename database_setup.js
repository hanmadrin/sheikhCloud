const sequelize = require('./configs/database');

require('./models/*');

sequelize.sync({force:true});