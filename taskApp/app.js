const ejs = require("ejs");
const search = require('./search.js');
const regist = require('./regist.js');
const del = require('./delete.js');
//const express = require('express');
//const app = require('express').createServer();
//app.engine('ejs',ejs.renderFile);
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname + '/views/list.html', 'utf-8'));
}).listen(8291);
const io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
    console.log('chinen connect');
     socket.on('client_to_server', function(data) {
        if (data.value['type'] == "search"){
            search.getTasks(function (){
                const retTasks = search.retGetTasks;
                //console.log("app.js : " + retTasks);
                io.sockets.emit('server_to_client', {value : retTasks});
            });
        }
        else if (data.value['type'] == "regist"){
            const task = {};
            task.content = data.value['content'];
            task.startTime = data.value['startTime'];
            task.requiredTime = data.value['requiredTime'];
            task.remarks = data.value['remarks'];
            regist.registTask(task, function (){
                search.getTasks(function (){
                    const retTasks = search.retGetTasks;
                    //console.log("app.js : " + retTasks);
                    io.sockets.emit('server_to_client', {value : retTasks});
                });
            });
        }
        else if (data.value['type'] == "delete"){
            const id = data.value['id'];
            del.deleteTask(id, function (){
                search.getTasks(function (){
                    const retTasks = search.retGetTasks;
                    io.sockets.emit('server_to_client', {value : retTasks});
                });
            });
        }

    });
});



// list.jsを動作
//app.get("/", function(req, res){
//    //search.getTasks();
//    const tasks = {};
//    //const tasks = search.retGetTasks;
//    
//    res.render('list.ejs', {tasks});
//});

//// search
//app.get("/search", function(req, res){
//    res.contentType("application/json");
//    search.getTasks();
//    let retTasks = search.retGetTasks;
//    res.end(JSON.stringify(retTasks));
//});
//
//// 登録機能動作
//app.get("/regist", function(req, res){
//    console.log("登録機能開始");
//
//    const task = {};
//    task.content = req.query['content'];
//    task.startTime = req.query['startTime'];
//    task.requiredTime = req.query['requiredTime'];
//    task.remarks = '';
//// content:'new', startTime:'99:99', requiredTime:'99m    in', remarks:'bikou99'};
//    //const search = require('./search.js');
//    regist.registTask(task);
//    res.redirect(req.baseUrl + '/');
//});
//  
//// 削除機能動作
//app.post("/delete", function(req, res){
//    console.log("削除機能開始");
//    
//    res.redirect(req.baseUrl + '/');
//});
