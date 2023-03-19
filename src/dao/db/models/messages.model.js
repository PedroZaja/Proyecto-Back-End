import moongose from 'moongose';

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({

    user: {type: String, required: true},
    message: {type: String, required: true}

});

export const messagesModel = moongose.model(messagesCollection, messagesSchema)