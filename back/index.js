let express = require('express'); 
let crypto = require('crypto');
let uuid = require('uuid/v1');
let app = express();

let users = {
    template: {
        guardian: false,
        pw: crypto.createHmac('sha256', 'password123').digest('hex'),
        in_location: true,
        last_refresh: 1551509511345,
        guardians: [],
        terminate: []
    }
};

app.get('/', function(req, res){
    res.status(418);
    res.send("I'm a teapot");
});

app.post('/refresh', function(req, res){
    if(req.query.uid in users){
        if(users[req.query.uid] == crypto.createHmac('sha256', req.query.pw).digest('hex')){
            users[req.query.uid].last_refresh = Date.now();
            res.status(200);
            res.send('Success');
        } else {
            res.status(403);
            res.send("Wrong password");
        }
    } else {
        res.status(400);
        res.send("Invalid UID");
    }
});

app.get('/time', function(req, res){
    if(req.query.uid in users){
        res.status(200);
        res.send(Date.now() - users[req.query.uid].last_refresh);
    } else {
        res.status(400);
        res.send("Invalid UID");
    }
});

app.post('/terminate', function(req, res){
    if(req.query.tuid in users){
        if(req.query.uid in users[req.query.tuid].guardians){
            terminate[users[req.query.tuid].guardians.indexOf(req.query.uid)] = 1;
            if(terminate.reduce((p,n)=>p && n) == 1){
                delete users[req.query.tuid];
            }
            res.status(200);
            res.send("Success");
        } else {
            res.status(403);
            res.send("Invalid UID");
        }
    } else {
        res.status(400);
        res.send("Invalid TUID");
    }
});

app.post('/create', function(req, res){
    let uid = uuid();
    console.log(uid);
    users[uid] = users.template;
    users[uid].guardian = (req.query.guardian == "1");
    users[uid].pw = crypto.createHmac('sha256', req.query.pw).digest('hex');
    users[uid].in_location = (req.query.in_location == "1");
    users[uid].last_refresh = Date.now();
    res.status(200);
    res.send(uid);
});

app.listen(5000);