// One Publisher and Many Suibscriber


// where we have a client which can publish something to the server and then movees on 
// and then another client can consumes from the server this another piece which was 
// publish, it was designed to solve a problem where a lot of service need to talk
// to each other , so we are creating this mesh architecture , where all client one 
// c2 ,c3 has some data need to send to c5 c6 c7 but it will get complex , so what we do is 
// client can just publish the content in the server and anyone who want to consume it 
// can simply consume it.



// one publisher and many reader


// suppose if we have a req/res architecture then in that case lets analyze the below architecture where 
// it breaks Client ---->Upload Service--->Compress Service----->Format Service---->Notification Service----->Copyright Service 
// becsue req and res is bad for multiple receivers , high couppleing , client and server has to be always running 
// then we need to do chaining and circuit breaking 



// Pub Sub service 
// Client uploads (its job is done)
// then there is some sort of message queue(topics/channel) 
// the upload service just publish the result int he queue and compress service just consumes it from the message queue , 
// without being directly coupled with the upload service 
// then format service gets that compresed video from the message queue, then converts it to the requried format and publish it in the message queue
// finally once all the format is ready the notification service consumes it and notify the user 



// Pros
// scales with multiple receivers
// great for microservices
// loose coupling 
// client need not have to be always running 


// Cons
// message delivery issue (dont know wheathter the consumers got the message)
// Complexity
// Network Saturation 
// polling when lots of client want to poll 



// Use of Rabbit MQ(helps us replicated Publiser /Subscriber)
// Publish a job and have a worker pick them up 





var amqp = require('amqplib');

var hosturl="amqps://pzavcqip:Bx1jQWM3Oi4-5kiOvJULfz_j0f4smWxd@mustang.rmq.cloudamqp.com/pzavcqip"

const msg="Hello guys and gals"
connect();

async function connect(){
    try{
        const ampqserver=hosturl
        const connection=await amqp.connect(ampqserver);
        const channel=await connection.createChannel();  //creating stream level channel
        await channel.assertQueue('jobs');  //create new queue called jobs
        await channel.sendToQueue("jobs",Buffer.from(msg))   //send the msg as a parameter 
        console.log(`Messahe ${msg} sent successfully`)
        await channel.close();
        await connection.close();
    }catch(ex){
        console.error(ex)
    }
}
