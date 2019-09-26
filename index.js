// Your code here
let createEmployeeRecord = function (dataArray) {
    return {
        firstName: dataArray[0],
        familyName: dataArray[1],
        title: dataArray[2],
        payPerHour: dataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = function (employeesData) {
    return employeesData.map(function (dataEntry){
        return createEmployeeRecord(dataEntry)
    })
}

let createTimeInEvent = function (employee, timeInEventData) {
    let [date, hour] = timeInEventData.split(' ')
    
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let createTimeOutEvent = function (employee, timeOutEventData) {
    let [date, hour] = timeOutEventData.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let hoursWorkedOnDate = function (employee, specificDate) {
    let inEvent = employee.timeInEvents.find(function (element) {
        return element.date === specificDate
    })

    let outEvent = employee.timeOutEvents.find(function (element){
        return element.date === specificDate
    })

    return (outEvent.hour - inEvent.hour)/100 
}

let wagesEarnedOnDate = function (employee, specificDate) {
    // pass this employee and the specific date into the hoursWorkedOnDate function to get a number of hours worked to multiply by wages
    let rawWage = hoursWorkedOnDate(employee, specificDate) * employee.payPerHour
    // Make rawWages a string and then turn it into a float using parseFloat
    return parseFloat(rawWage.toString())
}

let allWagesFor = function (employee) {
    let workedDates = employee.timeInEvents.map(function (element) {
        return element.date
    })

    let payableDates = workedDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payableDates
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





// // 1. Assume that employees always check -in ** and ** check - out.
// // 2. Assume employees always check -in and out on the hour
// // 3. The time is represented on a 24 - hour clock(1300 is 1: 00 pm); this keeps the
// // math easier and is the standard in most of the world
// // 4. When timestamps are needed, they will be provided as `String`s in the form:
// // `"YYYY-MM-DD 800"` or`"YYYY-MM-DD 1800"` e.g. `"2018-01-01 2300"`
// // 5. Employees will never work across days i.e.in at`2200` and out at`0400` the
// // next day.