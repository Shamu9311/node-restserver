const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {
        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            // Ya no soporta eso Mongoose
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de datos online');
    } catch (e) {
        console.log(e);
        throw new Error('Could not connect to Mongo');
    }
}

module.exports = {
    dbConnection
}