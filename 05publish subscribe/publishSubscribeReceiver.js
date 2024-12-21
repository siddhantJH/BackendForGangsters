var amqp = require('amqplib');

var hosturl="amqps://pzavcqip:Bx1jQWM3Oi4-5kiOvJULfz_j0f4smWxd@mustang.rmq.cloudamqp.com/pzavcqip"
connect()

async function connect(){
    try{
       const connection = await amqp.connect(hosturl)
       const channel=await connection.createChannel();
       await channel.assertQueue("jobs")  //asserting that the queue exist
        channel.consume("jobs",message=>{
            console.log(`Message Receioved ${message.content.toString()}`)
        })
        console.log("waiting for response")
    
    }catch(ex){
        console.error(ex)
    }
}


// when one consumer is consuming the job from the rabbitMQ
// if another clients tries to consume it , he will not be able to consume the job
// job, if first consumer die then immediatly second consumer will get the job 
// PS C:\Users\SIDHANT\Desktop\Backend Naseer\05publish subscribe> node .\publistSubscribeClient.js  
// Messahe Hello guys and gals sent successfully
// PS C:\Users\SIDHANT\Desktop\Backend Naseer\05publish subscribe> node .\publishSubscribeReceiver.js
// waiting for response
// Message Receioved Hello guys and gals
// Message Receioved Hello guys and gals
// Message Receioved Hello guys and gals
// everytime we run the client code the jobs will pile up, and cosumber will get all at once
