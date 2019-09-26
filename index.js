let createEmployeeRecord = fourElArr => {
  return {
    firstName: fourElArr[0],
    familyName: fourElArr[1],
    title: fourElArr[2],
    payPerHour: fourElArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployees = arr => {
  return arr.map(arrChild => {
    return createEmployeeRecord(arrChild)
  })
}

// let createTimeInEvent = (employee, dateStamp) => {
//   employee.timeInEvents.push({
//       type: "TimeIn",
//       hour: parseInt(dateStamp.slice(-4)),
//       date: dateStamp.slice(0, 10)
//   })

//   return employee;
// }

// function createTimeOutEvent(empRecObj, dateStamp) {
//   empRecObj.timeOutEvents.push({
//     type: "TimeOut",
//     hour: parseInt(dateStamp.slice(-4)),
//     date: dateStamp.slice(0, 10)
//   })

//   return empRecObj
// }

// let hoursWorkedOnDate = (employee, soughtDate) => {
//   let inEvent = employee.timeInEvents.find(e => e.date === soughtDate)
//   let outEvent = employee.timeOutEvents.find(e => e.date === soughtDate)

//   return (outEvent.hour - inEvent.hour) / 100
// }

let createTimeInEvent = function(employee, dateStamp){
  let dateStampArr = dateStamp.split(' ');
  let hour = dateStampArr[1];
  let date = dateStampArr[0];

  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
  })

  return employee;
}

let createTimeOutEvent = function(employee, dateStamp){
  let dateStampArr = dateStamp.split(' ');
  let hour = dateStampArr[1];
  let date = dateStampArr[0];

  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
  })

  return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
  let inEvent = employee.timeInEvents.find(function(e){
      return e.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = (employee, date) => {
  let hours = hoursWorkedOnDate(employee, date)
  return hours * employee.payPerHour
}

let allWagesFor = employee => {
  let dates = employee.timeInEvents.map(event => event.date)
  let wages = dates.map(date => wagesEarnedOnDate(employee, date))
  return wages.reduce((a, c) => a + c)
}

let createEmployeeRecords = employeesArr => {
  return employeesArr.map(createEmployeeRecord)
}

let findEmployeeByFirstName = (srcArr, firstName) => {
  return srcArr.find(employee => employee.firstName === firstName)
}

let calculatePayroll = employeesArr => {
  let payroll = employeesArr.map(allWagesFor)
  return payroll.reduce((a, c) => a + c)
}