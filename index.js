
// document.DOMContentLoaded(function(event) {
//     console.log("loaded and parsed")
// })

function createEmployeeRecord(record) {
    const employeeRecordObject = {
        "firstName": record[0],
        "familyName": record[1],
        "title": record[2],
        "payPerHour": record[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
    return employeeRecordObject
}

function createEmployeeRecords(employees) {
    let employeeArr = []
    employees.forEach(function (employee) {
       employeeArr.push(createEmployeeRecord(employee))
    })
    return employeeArr
}

function createEmployees(employees) {
    let employeeArr = []
    employees.forEach(function (employee) {
       employeeArr.push(createEmployeeRecord(employee))
    })
    return employeeArr
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const obj = parseDate(dateStamp, "TimeIn")
    employeeRecord.timeInEvents.push(obj)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const obj = parseDate(dateStamp, "TimeOut")
    employeeRecord.timeOutEvents.push(obj)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.filter(timeInEvent => timeInEvent.date === date)[0].hour
    const timeOut = employeeRecord.timeOutEvents.filter(timeOutEvent => timeOutEvent.date === date)[0].hour
    return Math.abs(timeIn - timeOut) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date)
    const payRate = employeeRecord.payPerHour
    return hours * payRate
}

function allWagesFor(employeeRecord) {
    let total = 0
    employeeRecord.timeInEvents.forEach(function(timeInEvent) {
       total += wagesEarnedOnDate(employeeRecord, timeInEvent.date)
    })
    return total
}

function findEmployeeByFirstName(srcArray, firstNamer) {
    let match = undefined
    srcArray.forEach(function(employee) {
        console.log(employee.firstName)
        if (employee.firstName === firstNamer) {
            match = employee
        }
    })
    return match
}

function calculatePayroll(employeeRecords) {
    let total = 0
    employeeRecords.forEach(function(employee) {
        total += allWagesFor(employee)
    })
    return total;
}

function parseDate(dateStamp, type) {
    const date = dateStamp.split(" ")[0]
    const hour = dateStamp.split(" ")[1]
    const obj = {
        type: type,
        hour: parseInt(hour),
        date: date
    }
    return obj
}