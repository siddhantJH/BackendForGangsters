// it essentially means that the request is taking a while and i will chek later 
// for such scenario we used short polling , it is common when you have a request which takes long time to complete '
// so we can make a backend asynchronously process things , and use some sort of future promise jobid and then the 
// client can pol for the status of the job.


// when request/response isn't ideal : like uploading the video in the youtube , and once its completed then backend sends backe the 
// notification, like user just logged in(event happens in backed) , it is very good style for certain use cases 


// Working
// Client sends a request the the server responds immediately with a handle(it can be uniq id) the backedn is free to do whatever it want 
// use queu, memory , the request is not executed immediately the client can use the handle to look for the status , is it ready,is it ready 
// the idea of making a pol is req res, but combination of the asynch with req and res , basically reduces the number of req and res (significantly)
// we only deilved the response to the client when the client asks for it , but if the client is diconneted the server wont lnger keep the response so 
// the response will get lost (so to resolve it we use rabbitMQ)


// Pros
// simple
// good for long runnning request
// Client can disconnect safely


// Cons
// Too Chatty , the problem is if we scale this then there are lot of data to store as there are multiple client 
// once it adds up there are lot of requst and nw is congested, wasted backend resourses
// every pol consumes a resouces in backend some part of ram, check takes finite amout of time 





const app= require("express")();
const jobs={}


// only submits the job
app.post("/submit",(req,res)=>{
    const jobId=`job:${Math.floor((Math.random() * 10) + 1)}`
    console.log(jobId);
    jobs[jobId]=0;
    updateJob(jobId,0);  //starting the job
    res.end("\n\n"+jobId+"\n\n")
})


app.get("/checkstatus",(req,res)=>{
    console.log(jobs[req.query.jobId])
    res.end("\n\n"+jobId+"\n\n")
})


function updateJob(jobId,prg){
jobs[jobId]=prg;
if(prg==100) return;
this.setTimeout(()=>updateJob(jobId,prg+10),3000) //repeates the line of code continously for after every 3000 ms
}


// use postman to send the request and receive it 
// there is a folder Backend polling once first we need to submit the job by callong the submit api 
// then we call the get req, the only catch here is each get call is called polling 
app.listen(8080,()=>console.log("listening to 8080"))