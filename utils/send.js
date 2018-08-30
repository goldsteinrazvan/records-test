var amqp = require('amqplib/callback_api');

function sendToQueue(msg){
    amqp.connect('amqp://localhost', (err,conn) =>{
        conn.createChannel( (err,ch) =>{
            var q = 'projects'
            ch.assertQueue(q,{ durable: true})
            ch.sendToQueue(q,
                new Buffer(JSON.stringify(msg)), {persistent:true}
            )
            console.log("Message sent to queue: ", msg)
        })
    })
}

module.exports.sendToQueue = sendToQueue