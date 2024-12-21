// long polling essentially menas that the request is taking too long 
// I'll check with you later,but do let me know by responding back only when it's ready 
// we will make a pole request server does not respond , insted of saying immediately 
// it waits for the task to complete 



// when request/response and polling isi'nt ideal 
// A request takes a long time to process , (uploading a youtube video )
// the backend whats to send notification , (A user just logged in )
// short polling is good but chatty , we will use long poling(Kafka uses it)



// Working 
// client sends the request
// server responds immediatly with an handle 
// server continues to process the request 
// client uses the handle to check for the status if there is noting in result the kafka blocks it 
// server does not resply until it has the response , the client keep waaiting we dont waste bandwidth 
// so we got an handle , we can disconnect annd we are less chatty , 
// push does not work with kafka
//some variating has timeouts too
// client request 
// client gets the request id 
// client asks is x ready then wait ---------------(long polling waiting long requst response we can dis if we want)------------------server replies with response





// pros are less chatty , client can disconnect
// not real time 


const app=require('express')();

jobs={}

app.post("/submit",(req,res)=>{
const jobId=`job:${Math.floor((Math.random()*10)+1)}`
jobs[jobId]=0
console.log(jobId)
updateJob(jobId,0);
res.end()
})



app.get("/checkstatus",async (req,res)=>{    //the fucntion inside of which we have a await call , we must make that function as a async, so that it does not block the main event loop thread
    while(await checkJobComplete(req.query.jobId)==false);   //here we are essentially waiting, making the client wait , for the response this is called long polling 
    res.end("Job is completed")  //this essentially helps us send the respise back to the client 
    // res.end();
})


app.listen(8080,()=>console.log("Listening to 8080"))


async function checkJobComplete(jobId){
    return new Promise((resolve,reject)=>{
        if(jobs[jobId]<=100){
        console.log("status",jobs[jobId])
        this.setTimeout(()=>resolve(false),1000)
        }else 
        resolve(true);
    })
}

function updateJob(jobId,prog){
    jobs[jobId]=prog
    if(prog<=100) this.setTimeout(() => {
        updateJob(jobId,prog+10)
    }, (2000));
        else return 
}
