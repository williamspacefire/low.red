let mysql = require("mysql")
let dbcred = require("../config.json")

exports.db = () => {
    const connection = mysql.createConnection(dbcred)

    /*connection.connect((error) => {
        if (error?.stack) {
            
            console.log(error.stack)
            
            global.result.error = true
            global.result.message = "An error accured while trying to connect to the Database. See the console for StackTrace."
        } else {
            console.log("Database connected")
            global.result.message = "Database connected"
        }
    })*/

    return connection
}