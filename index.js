const inquirer = require('inquirer')
const mysql = require('mysql2')

const mainMenuChoices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']

function addEmployee(){
    inquirer.prompt([
        {
            type:'text',
            name:'firstName',
            message:"What is the employee's first name?"
        },
        {
            type:'text',
            name:'lastName',
            message:"What is the employee's last name?"
        }
    ]).then((innerData)=>{
        dbConnection.query(
            `SELECT id, title FROM role`,
            (err, results, fields)=>{
                let titleArr = results.map((val)=>val.title)
                let roleDict = {}
                results.forEach((val)=>roleDict[val.title]=val.id)
                inquirer.prompt([
                    {
                        type:'list',
                        name:'role',
                        message:"What is the employee's role?",
                        choices:[...titleArr]
                    }
                ]).then((roleData)=>{
                    dbConnection.query(
                        `SELECT first_name, last_name, id FROM employee`,
                        (err, results, fields)=>{
                            let nameArr = results.map((val)=>val.first_name+' '+val.last_name)
                            let employeeDict = {}
                            results.forEach((val)=>employeeDict[val.first_name+' '+val.last_name] = val.id)
                            inquirer.prompt([
                                {
                                    type:'list',
                                    name:'manager',
                                    message:"Who is the employee's Manager?",
                                    choices:[...nameArr]
                                }
                            ]).then((employeeData)=>{
                                dbConnection.query(
                                    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${innerData.firstName}", "${innerData.lastName}", ${roleDict[roleData.role]}, ${employeeDict[employeeData.manager]})`,
                                    function(err, results, field){
                                        console.log(results)
                                        mainMenu()
                                    }
                                )
                            })
                        }
                    )
                })
            }
        )
    })
}
function addRole(){
    inquirer.prompt([
        {
            type:'text',
            name:'title',
            message:'What is the name of this role?'
        },
        {
            type:'number',
            name:'salary',
            message:'What is the salary of the role?'
        }
    ]).then((data)=>{
        dbConnection.query(
            'SELECT * FROM department',
            function(err, results, field){
                let dict = {}
                results.forEach(val=>{dict[val.name] = val.id})
                let departmentArr = results.map((val)=>{return val.name})
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department is it from?',
                        choices: [...departmentArr]
                    }
                ]).then((departments)=>{
                    dbConnection.query(
                        `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${dict[departments.department]})`,
                        function(err, results, field){
                            console.log(results)
                            mainMenu()
                        }
                    )
                })
            }
        )
    })
}
function addDepartment(){
    inquirer.prompt([
        {
            type:'text',
            name:'name',
            message:'What is the name of this departemnt?'
        }
    ]).then((data)=>{
        dbConnection.query(
            `INSERT INTO department (name) VALUES ("${data.name}")`,
            function(err, results, field){
                console.log(results)
                mainMenu()
            }
        )
    })
}
function updateEmployee(){
    dbConnection.query(
        `SELECT first_name, last_name, id FROM employee`,
        (err, results, fields)=>{
            let nameArr = results.map((val)=>val.first_name+' '+val.last_name)
            let employeeDict = {}
            results.forEach((val)=>employeeDict[val.first_name+' '+val.last_name] = val.id)
            inquirer.prompt([
                {
                    type:'list',
                    name:'employee',
                    message:"Which employee's role do you want to update",
                    choices:[...nameArr]
                }
            ]).then((employeeData)=>{
                dbConnection.query(
                    `SELECT title, id FROM role`,
                    (err, results, fields)=>{
                        let titleArr = results.map((val)=>val.title)
                        let roleDict = {}
                        results.forEach((val)=>roleDict[val.title] = val.id)
                        inquirer.prompt([
                            {
                                type:'list',
                                name:'newRole',
                                message:"Which role do you want to assign the new employee?",
                                choices:[...titleArr]
                            }
                        ]).then((roleData)=>{
                            dbConnection.query(
                                `UPDATE employee SET role_id=${roleDict[roleData.newRole]} WHERE id=${employeeDict[employeeData.employee]}`,
                                function(err, results, field){
                                    console.log(results)
                                    mainMenu()
                                }
                            )
                        })
                    }
                )
            })
        }
    )
    
    
}

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
                addEmployee()
                break;
            case 'Update Employee Role':
                updateEmployee()
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
                addRole()
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
                addDepartment()
                break;
            case 'Quit':
                process.exit(0)
        }
    })
}