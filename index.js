const express = require('express');
const app = express();
require('./db/config');
const signup = require('./db/Signup');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const product = require('./db/product')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';






app.post('/register', async (req, resp) => {
    let data = new signup(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password
    console.log(result);
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send("Something went wrong ,please try again after some time")
        }
        resp.send({result, auth: token })
    })
    console.warn("Data saved successfully");
})

app.post('/login',async (req, resp) => {
    if (req.body.email && req.body.password) {
        const data = await signup.findOne(req.body).select("-password");
        if (data) {
            Jwt.sign({ data }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send("Something went wrong ,please try again after some time")
                }
                resp.send({data, auth: token })
            })
        }
        else {
            resp.send({ result: "No user found" })
        }
    }
    else {
        resp.send({ result: "No user found" })
    }


})


app.post('/add', verifyToken,async (req, resp) => {
    let data = new product(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);
})

app.get('/products',verifyToken, async (req, resp) => {
    let data = await product.find();
    if (product.length > 0) {
        resp.send(data)
    }
    else {
        resp.send({ result: "No Products Found" });
    }

})

app.delete('/product/:id', verifyToken,async (req, resp) => {

    let result = await product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get('/product/:id', verifyToken,async (req, resp) => {
    let result = await product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: "No Record Found" })
    }
})

app.put('/product/:id', verifyToken,async (req, resp) => {
    let result = await product.updateOne({ _id: req.params.id }, { $set: req.body });
    resp.send(result);

})

app.get('/search/:key', verifyToken,async (req, resp) => {
    let result = await product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }


        ]
    });
    resp.send(result);
})

function verifyToken(req,resp,next){
    let token=req.headers['authorization'];
    if(token){
        token =token.split(' ')[1];
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:"Please Provide Valid Token"});
            }
            else{
                next();
            }
        })

    }else{
        resp.status(403).send({result:"Please Add Token"})

    }
}
app.listen(5000);