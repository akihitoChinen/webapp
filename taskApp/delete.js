const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'akihito',
    password : 'kumanbachi1065',
    database : 'mydb'
});

exports.deleteTask = function(id, Callback) {
    console.log("削除内容 : " + id);

    const sql = 'delete from mydb.tasks where id=?;';
    const inserts = [id];
    const query = connection.query(sql,inserts, function (err, results){
        console.log('削除完了');
        if (err) {
            console.error("DB failed : " + err.stack);
            return;
        }
        console.log('削除 db接続終了');
        Callback();
    });
}
