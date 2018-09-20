const express = require('express');
const ejs = require("ejs");
  
const app = express();
app.engine('ejs',ejs.renderFile);

const task1 = { content:'日報１', startTime:'9:30', requiredTime:'15min', remarks:'bikou1'};
const task2 = { content:'日報２', startTime:'10:30', requiredTime:'30min', remarks:'bikou2'};

const dao = require('./dao.js');
dao.getTasks();
  
app.get("/", function(req, res){
    const tasks = dao.retGetTasks;
    res.render('list.ejs', {tasks});
});

app.post("/register", function(req, res){
    console.log("HYHYHYJY");

    const task = { content:'new', startTime:'99:99', requiredTime:'99m    in', remarks:'bikou99'};
    const dao = require('./dao.js');
    dao.registTask(task);
    res.redirect(req.baseUrl + '/');
});
  
const server = app.listen(8291, function(){
    console.log('Server is running!');
})
