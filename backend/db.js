const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "123",
        database: "reacttodo",
        host:"localhost",
        port:5432
    })

    module.exports=pool