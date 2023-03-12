import { messagesModel } from "../dao/db/models/messages.model.js"

let loadMessages = async () => {
    try {
        let messages = await messagesModel.find({},{_id:0 , user:1, message: 1})
        return messages
    } catch (error) {
        return {message: error.message}
    }
    
}

let saveMessage = async (data) => {
    try {
        await messagesModel.create(data)
        let messages = loadMessages()

        return messages
    } catch (error) {
        return {message: error.message}
    }
    
}

export { loadMessages , saveMessage }