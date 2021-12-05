const mongo = require('mongoose')

const messageTemplate = new mongo.Schema({
    content: {
        type: String      
    },
    sender: {
        type: String     
    },
    date: {
        type: Date    
    }
})
//exporting the scheme
module.exports = mongo.model('messages',messageTemplate)