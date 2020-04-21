var express = require('express');
var mysql = require('mysql');
const router = express.Router();
// var cors = require('cors')
// var app=express();
// app.use(cors());


//create Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'voting'
});

//Connect to the database
connection.connect(function (err) {
    if (err){
        console.log(err.message)
        return
    }
    console.log("Connected!");
});

router.post('/users', async (req, res) => {
    const email = req.body.user;
    const vote =req.body.votes_for;
    // console.log(email)
    connection.query("select * from voters where email=?", [email], function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            connection.query("INSERT INTO voters VALUES (?,?,?)",
                [0,email, vote], function (error, results, fields) {
                    if (!error) {
                        connection.query("UPDATE votes SET counts=\
                                (SELECT counts FROM votes WHERE candidates=?)+1 \
                                    WHERE candidates=?",
                            [vote,vote], function (error, results) {
                                if(!error)
                                    res.send({error:"Thanks for Voting"});
                             })
                    }
                    else {
                        console.log(error.message);
                        res.send({error:"Some error Occucured"});
                    }
                })
        }
        else{
            res.send({error:"You have already Voted"});
        }
    });
})

router.get('/results',async (req,res)=>{
    connection.query("select * from votes",function (error, results) {
        if(error){
            console.log(error.message)
            res.end({error:"Voting Counting In progress"});
        }
        console.log(results)
        res.send({results:results});
    })
})

module.exports = router