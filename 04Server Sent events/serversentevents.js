// One request a very long response 
// its a pure http things , does not really work on other protocol 
// one request but there are responses are very very long 
//we are responding but it does not have an end 
// the client understands the streaming chunks and parses it(more like a dash algorithm)
// client parses the mini msg and find my mini events responses 


// Limitation 
// Venilla req/res isn't ideal for notification backend
// client wants real time notification from backend 
    //A used just logged in 
    // A message is just received 
// Push works but restrictive 
// Server events work with req and res
// also wrk with http



// Response
// A response has start and end 
// clients sends a request 
// server sends logical events as part of response (logical events the reponse does not ends we are sending events in these chunks)
// client is smart enough,
// server never writes the end of the response 
// client parses the segment , it is still a req but an uneneding response 
// client parses the stream data looking for these events 



// timeline of request and response
//client here first sends the request , its a special request 
// the server will actually response with an event 
// client sends a request backend gets the message 
// backend then response with the event1(bunch of byte that has start and end client has to understand), backend does not write the whole reponse
// event2 
// event3
// event4


// pros 
// Reatltime: sort open channel sends us teh feed of events
// compatile with req and res

// cons
// client has to be online 
// the clients migh not be able to handle it clearly 
// pollig is preffered for light clients if client is not strong enough(we cannot keep looking for the response)
// http/1.1 problem is (only 6 connections), all 6 connection will be blocked , http2.0 is better we can have multiple streams in one connection 
// Refer Graduate Networking course IIITD



// Practice 
const app=require("express")();

app.get("/",(req, res)=>res.send("hello!"));

app.get("/stream",(req,res)=>{
    res.setHeader("Content-type","text/event-stream");
    send(res);
})


const port=8888

let i=0;
function send(res)
{
    res.write("data: "+`hello from the server---[${i++}]\n\n`) //we are essentially writing the events or data into the response ,last\n\n means the  boundry of the events
    setTimeout(()=>send(res),1000)
}


app.listen(port)
console.log("listening to post"+`${port}`)
