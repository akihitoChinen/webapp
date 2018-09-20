const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'akihito',
    password : 'kumanbachi1065',
    database : 'mydb'
});

exports.registTask = function(task, Callback) {
    const content = task['content'];
    const startTime = task['startTime'];
    const requiredTime = task['requiredTime'];
    const remarks = task['remarks'];
    console.log("登録内容 : " + task);

    const sql = 'insert into mydb.tasks (content, startTime, requiredTime, remarks) values (?,?,?,?);';
    const inserts = [content, startTime,requiredTime, remarks];
    const query = connection.query(sql,inserts, function (err, results){
        console.log('登録完了');
        if (err) {
            console.error("DB failed : " + err.stack);
            return;
        }
        console.log('登録 db接続終了');
        Callback();
    });
}
