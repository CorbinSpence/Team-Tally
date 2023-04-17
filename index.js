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

var stillUsed = true
const data = inquirer.prompt([
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
                        }
                    )
                    break;
                case 'Add Employee':
                    break;
                case 'Update Employee Role':
                    break;
                case 'View All Roles':
                    break;
                case 'Add Role':
                    break;
                case 'View All Departments':
                    break;
                case 'Add Department':
                    break;
                case 'Quit':
                    stillUsed = false
                    break;
            }
        })



