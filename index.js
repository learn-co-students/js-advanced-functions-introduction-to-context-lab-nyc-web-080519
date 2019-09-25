function createEmployeeRecord (employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployees (arrayEmployeeData) {
    return arrayEmployeeData.map(employeeData => {
        return createEmployeeRecord(employeeData);
    });
}

function createTimeInEvent (employeeRecord, timeIn) {
    let [date, hour] = timeIn.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10),
    })
    return employeeRecord;
}

function createTimeOutEvent (employeeRecord, timeOut) {
    let [date, hour] = timeOut.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10),
    })
    return employeeRecord;
}

function hoursWorkedOnDate (employee, date) {
    let inEvent = employee.timeInEvents.find( e => {
        return e.date === date;
    });
    let outEvent = employee.timeOutEvents.find( e => {
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate (employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor (employee) {
    const allDates = employee.timeInEvents.map(timeInEvent => {
        return timeInEvent.date;
    })
    return allDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date);
    },0);
}

function calculatePayroll (arrayEmployees) {
    return arrayEmployees.reduce((memo, employee) => {
        return memo + allWagesFor(employee);
    },0)
}

function createEmployeeRecords (ultronData) {
    return ultronData.map(e => {
        return createEmployeeRecord(e);
    })
}

function findEmployeeByFirstName (arrayEmployees, firstName) {
    return arrayEmployees.find(employee => {
        return employee.firstName === firstName;
    })
}