// Your code here
function createEmployeeRecord(personArray) {
    const firstName = personArray[0]
    const lastName = personArray[1]
    const title = personArray[2]
    const pay = personArray[3]
    return {
        firstName: firstName,
        familyName: lastName,
        title: title,
        payPerHour: pay,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(employees) {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, date) {
    const dateArr = date.split(" ")
    const parsedDate = dateArr[0]
    const parsedHour = parseInt(dateArr[1])
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parsedHour,
        date: parsedDate,
    })
    return employee
}

function createTimeOutEvent(employee, date) {
    const dateArr = date.split(" ")
    const parsedDate = dateArr[0]
    const parsedHour = parseInt(dateArr[1])
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parsedHour,
        date: parsedDate,
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const enter = employee.timeInEvents.find(function(timeInEvent) {
        return timeInEvent.date === date
    })
    const exit = employee.timeOutEvents.find(function(timeOutEvent) {
        return timeOutEvent.date === date
    })
    return (exit.hour - enter.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(function(timeInEvent) {
        return timeInEvent.date
    })
    return dates.reduce(function(sum, day) {
        return sum + wagesEarnedOnDate(employee, day)
    }, 0)
}

function createEmployeeRecords(employees) {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(function(employee) {
        return employee.firstName === name
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function(sum, employee) {
        return sum + allWagesFor(employee)
    }, 0)
}