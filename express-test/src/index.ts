import express from "express"

const app = express()

app.get("/",(req,res)=>{
  console.log("the server is up")
  res.send("the server is up and running")
})

app.listen(3000, ()=>{
  console.log("the server is running on the port 3000")
})