// How does push notification works in case of the large scale chat application

// I want it as soon as possible , as req and res is not always ideal for certain 
// purpose so push is sort of a notification purpose , if we try to implement it using req res we 
// need to continuously look for the msg is it there is it there is it there not good for scaling 
// ṣo we need 



// push client connects to the server 
// sever sends data to the client the client does not ask for it 
// so it is unidirectinal from the server side , cliend does not have to ask for the request 
// protocol can be bidirectional(as tcp is used)
// used by rabbitMQ



// when you submit a messgae in queue the client consumes the messges fromt the rabbitMQ
// rabbitMQ push the content of the queue the moment we get the result it is pushed to the client 
//who are conected to it


// In the backend we gets a message we push the result to all the client,the 
//the youtube does not directly push the messgae to the client it send it to the cloud
// pros and cons of push is 


// pros it is realtime we dont wait the moment we get the output we push it to the client


// cons in this case is client must be online , physically connected to the server 
// another is client might not be able to handle the load , what if ther server pushing 
// tons of message to the client and client is not capable , requiors a bidirectional protocol , 
// polling is preffered for light client 


const http=require("http")
const WebSocketServer=require("websocket").server


// this we need to pass on to the websocket upgrade connection
const httpServer=http.createServer((req,res)=>{
    console.log("We have received a request")
})

const websocket=new WebSocketServer({
    "httpServer":httpServer
})


let connections=[]
websocket.on("request",request=>{
connection=request.accept(null,request.origin)

// when ever any connection sends the messgae this will run and it will noptify to each of the user
connection.on("message",()=>{
    connections.forEach((conn)=>{
        conn.send(`User ${conn.socket.remotePort} says ${conn.data}`)
    })
})

// pushing the connected user to the buffer array
connections.push(connection)


//looping thorough each of the previsoulsy connected used and sending them that the used is connected 
connections.forEach((conn)=>{
console.log(`User ${conn.socket.remotePort} just connected`)
})
})

httpServer.listen(8080,()=>console.log("Listening to port 8080 for clients"))


