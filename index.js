//------------------------------------function 1---------------------------------------
// Create a function called createEmployeeRecord that takes in an array as an argument. 
// Place each item in the array into a distinct constant. 
// Return a new hash that includes the created constants. 


function createEmployeeRecord(array) {
    const firstName = array[0]
    const lastName = array[1]
    const title = array[2]
    const pay = array[3]
    return {
        firstName: firstName,
        familyName: lastName,
        title: title,
        payPerHour: pay,
        timeInEvents: [],
        timeOutEvents: []
    }
}

//------------------------------------function 2---------------------------------------
// Create a variable that includes a fuction with an argument of employeeRowData, which includes a first name, last name, title, and pay per hour. 
// The function should return a function that takes the initial arguement array and uses the map method to return a new employee record. 

let createEmployees = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

//------------------------------------function 3---------------------------------------
// Create a let called createTimeInEvent that houses a function, which takes in two arguments employee and data stamp. 
// The function should first set a let called [date,hour], which takes a date stamp and spilts out the date and time stamp based on a space. 
// The function than takes the first arguement (employee), which is an object, sets a type, hour, and date. 
// We then return the updated employee. 


let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
//------------------------------------function 4---------------------------------------

// Create a let called createTimeOutEvent, which houses a function.
// The function should take an employee object and datastamp. 
// Formt the datestamp. 
// Push the updated information into employee.timeOutEvents. 

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

//------------------------------------function 5---------------------------------------

// Create a variable called hoursWorkedOnDate, which houses function.
// The function should house an employee object and a date. 
// The function should house a variable that traverses the employee object to timeInEvents and uses the find method to get the correct time in date.
// The function should house a variable that traverses the employee object to timeOutEvents and uses the find method to get the correct time in date.

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let createEmployeeRecords = function(src) {
  return src.map(function(row){
    return createEmployeeRecord(row)
  })
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

//-----------------------------Purpose ---------------------------------------

//The purpose of this lab was to learn how to use find, map, and reduce methods and to identify that is code is very repetitive without execution context.


