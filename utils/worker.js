var amqp = require('amqplib/callback_api')

function consumeMessage(){
    amqp.connect('amqp://localhost', (err,conn) =>{

        conn.createChannel( (err, ch) =>{
            var q = 'projects'
            ch.assertQueue(q, {durable:true})
            console.log(' [x] Waiting for messages in %s. To exit press CTRL+C', q)
    
            ch.consume(q, (msg) =>{
                console.log(" [x] Received %s", msg.content.toString())
                ch.ack(msg)
            }, {noAck:false})
        })
    })
}

module.exports.consumeMessage = consumeMessage