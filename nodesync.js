const fs=require("fs")
console.log("1")
const res=fs.readFileSync("test.txt") //we are basically blocked here the event loop is blocked here reading it 
console.log("file",res)
console.log("2")