const inquirer = require('inquirer')
const mysql = require('mysql2')

//TODO: set connection variables
mysql.createConnection({
    host: 'localhost',
    user: '',
    password: ''
})

inquierer.prompt([
    {
        type:'',
        name:'',
        message:''
    }
]).then((data)=>{

})