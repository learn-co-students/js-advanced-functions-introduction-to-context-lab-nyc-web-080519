// Your code here

function createEmployeeRecord(empArray) {

    // console.log(empArray)

    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    // this.firstName = empArray[0],
    // this.familyName = empArray[1],
    // this.title = empArray[2],
    // this.payPerHour = empArray[3],
    // this.timeInEvents = [],
    // this.timeOutEvents = []
}

function createEmployees(arrays) {
    // let newData = []
    // arrays.forEach(empData => {
    //     newData.push(new createEmployeeRecord(empData))
    // })
    // return newData

    return arrays.map(employee => {
        return createEmployeeRecord(employee)
    })
}


function createTimeInEvent(employee, time) {
    const [date, hour] = time.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, time) {
    const [d, h] = time.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(h, 10),
        date: d
    })
    return employee
}

function hoursWorkedOnDate(employee, givenDate) {
    const timeIn = employee.timeInEvents.find(time => {
        return time.date === givenDate
    })
    const timeOut = employee.timeOutEvents.find(time => {
        return time.date === givenDate
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}


// you can call .reduce(addUp) on an array of numbers to recieve the total
function addUp(total, num) {
    return total + num;
}
function allWagesFor(employee) {
    // let earnings = []
    // employee.timeInEvents.forEach(timeOBJ => {
    //     earnings.push(wagesEarnedOnDate(employee, timeOBJ.date))
    // })
    const earnings = employee.timeInEvents.map(timeOBJ => {
        return wagesEarnedOnDate(employee, timeOBJ.date)
    })
    return earnings.reduce(addUp)
}


function calculatePayroll(employees) {
    // const earnings = employee.timeInEvents.map(timeOBJ => {
        //     return wagesEarnedOnDate(employee, timeOBJ.date)
        // })
    const earnings = employees.map(employee => {
        return allWagesFor(employee)
    })
    return earnings.reduce(addUp)
}


function createEmployeeRecords(data) {

    //
    //
    // ATTENTION
    //
    // THIS ONE LINER WORKS BC IF YOU USE => FUNC AND DONT
    //USE { } THEN THERE ARE IMPLICIT RETURNS
    //
    return data.map(row => createEmployeeRecord(row))
}


function findEmployeeByFirstName(employees, first) {

    // console.log("YEETYEETYEETYEETYEETYEETYEETYEET", employees)

    return employees.find(e => {
        return e.firstName === first
    })
}

