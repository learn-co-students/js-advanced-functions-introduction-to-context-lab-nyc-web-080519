// create an employee hash based on an arr
let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// this returns an array of employees that were created
let createEmployees = function(arr) {

    return arr.map(function(subArr){
        return createEmployeeRecord(subArr)
    })
}

// time in 
let createTimeInEvent = function(employee, time){
    let [date, hour] = time.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee   
}

// time out
let createTimeOutEvent = function (employee, time) {
    let [date, hour] = time.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

// finds the date that an employee time in and time out
let hoursWorkedOnDate = function (employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function (e) {
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function (e) {
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employee, dateSought) {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}


let allWagesFor = function (employee) {
    let eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}


let createEmployeeRecords = function (src) {
    return src.map(function (row) {
        return createEmployeeRecord(row)
    })
}


let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(function (rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}