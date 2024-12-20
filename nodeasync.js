const fs=require("fs")
console.log("1")
const res=fs.readFile("test.txt",(err,data)=>console.log(data)) //This is basically a async call we dot wait here 
console.log("2")


// please search how event loop works in the above case