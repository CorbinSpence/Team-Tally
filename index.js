const inquirer = require('inquirer')
const mysql = require('mysql2')

const mainMenuChoices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']

//TODO: set connection variables


const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'employee_db'
})

dbConnection.connect(function (err){
    if(err){
        console.log(err)
        throw err
    }
    mainMenu()
})
function mainMenu(){
    inquirer.prompt([
        {
            type:'list',
            name:'dataQuery',
            message:'What do you what to do?',
            choices:[...mainMenuChoices],
        },
        // {
        //     type:'text',
        //     name: 'test',
        //     message: 'Does This message show?'
        // }
    ]).then((data)=>{
        switch(data.dataQuery){
            case 'View All Employees':
                dbConnection.query(
                    'SELECT * FROM employee',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'Add Employee':
                //TODO: add prompted data to query statement
                dbConnection.query(
                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ()',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'Update Employee Role':
                //TODO: add prompted data to query statement
                dbConnection.query(
                    'UPDATE employee SET ${columns} WHERE ${condition}',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'View All Roles':
                dbConnection.query(
                    'SELECT * FROM role',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'Add Role':
                //TODO: add prompted data to query statement
                dbConnection.query(
                    'INSERT INTO role (title, salary, department_id) VALUES ()',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'View All Departments':
                dbConnection.query(
                    'SELECT * FROM department',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'Add Department':
                //TODO: add prompted data to query statement
                dbConnection.query(
                    'INSERT INTO department (name) VALUES ()',
                    function(err, results, field){
                        console.log(results)
                        mainMenu()
                    }
                )
                break;
            case 'Quit':
                process.exit(0)
        }
    })
}