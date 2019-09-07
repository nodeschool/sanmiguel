const mongo = require("mongodb")
const connection = async ()=>{
  const conn = await mongo.connect("mongodb://denny:denny123@ds013901.mlab.com:13901/nssm",{useNewUrlParser: true})
  const DB = conn.db()
  const COL = DB.collection("helloWorld")
  const res = await COL.find({}).toArray()
  console.log(res)

}

connection()