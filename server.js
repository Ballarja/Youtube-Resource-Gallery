const express = require("express");
const app = express();
const bcyrpt = require("bcrypt");
const { hash } = require("bcrypt");

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
    res.json(users);
})

app.post("/users", async (req, res) => {
    try{
        const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(res.body.password, salt)
        console.log(salt);
        console.log(hashedPassword);
        const user = {name: req.body.name, password: hashedPassword};
        users.push(user);
        res.status(201).send()
    }catch{
        res.status(500).send()
    }
})

app.post("/users/login", async (req, res) => {
    const user = users.find(users => user.name = req.body.name);
    if(user === null){
        return res.status(400).send("Cannot find user");
    }
    try {
        if(await bcyrpt.compare(req.body.password, user.password)){
            res.send("Success");
        }else{
            res.send("Denied");
        }
    } catch{
        res.status(500).send()
    }

})

app.listen(3000);
