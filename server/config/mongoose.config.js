const mongoose = require('mongoose');

const database = 'family-book'

mongoose.connect(`mongodb://localhost/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the db: ${database}`))
    .catch((err) => console.log('Could not connect you the database.', err));