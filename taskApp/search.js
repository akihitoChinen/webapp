const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'akihito',
    password : 'kumanbachi1065',
    database : 'mydb'
});

exports.getTasks = function(Callback) {
    const sql = 'select * from mydb.tasks order by startTime;';
    const query = connection.query(sql, function (err, results){
        console.log('一覧表示');
        if (err) {
            console.error("DB failed : " + err.stack);
            return;
        }
        //console.log("dao.js : " + results);
        exports.retGetTasks = results;
        console.log('db接続終了');
        Callback();
    });
}

//exports.registTask = function(task) {
//    const content = task['content'];
//    const startTime = task['startTime'];
//    const requiredTime = task['requiredTime'];
//    const remarks = task['remarks'];
//    console.log(task);
//
//    //接続します
//    connection.connect();
//
//    const sql = 'insert into mydb.tasks (content, startTime, requiredTime, remarks) values (?,?,?,?);';
//    const inserts = [content, startTime,requiredTime, remarks];
//    const query = connection.query(sql,inserts, function (err, results){
//        console.log('登録');
//    });
//
//    connection.end(function() {
//       console.log('db接続終了');
//    });
//}
