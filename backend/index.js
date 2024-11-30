import express from "express"
import cors from "cors"
import con from "./db.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async(req, res)=>{
    con.query("select * from tb", (err,db_res,fields)=>{
        res.json(db_res)
    })
})

app.post("/", async(req,res)=>{
    const {title, content, status} = req.body
    con.query(`insert into tb (title, content, status) values (?, ?, ?)`,
        [title, content, status],
        (err, db_res,fields)=>{
            if(err){
                console.error("Error inserting the value")
                res.send(500).json({message: "Failed to create task"})
            }else{
                res.status(201).json({id: db_res.insertId, title, content, status})
            }
        }
    )
})

app.delete("/:id", async(req,res)=>{
    const {id} = req.params;
    con.query(`delete from tb where id=${id}`, (err,db_res,fields)=>{
        res.json(db_res)
    })
})


app.listen(3000, ()=>{
    console.log("listening port 3000")
})