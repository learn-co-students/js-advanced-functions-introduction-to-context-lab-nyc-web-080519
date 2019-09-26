// Your code here

let createEmployeeRecord = arr => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployees = employeeData => {
  return employeeData.map(arr => createEmployeeRecord(arr))
}

let createTimeInEvent = (employeeData, dateTime) => {
  const [date, hour] = dateTime.split(' ')

  employeeData.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour), date 
  })

  return employeeData
}

let createTimeOutEvent = (employeeData, dateTime) => {
  const [date, hour] = dateTime.split(' ')

  employeeData.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour), date
  })

  return employeeData
}

let hoursWorkedOnDate = (employee, date) => {
  let inEvent = employee.timeInEvents.find(timeStamp => timeStamp.date == date
    //console.log(timeStamp) => { type: 'TimeIn', hour: 900, date: '44-03-15' }
  )

  let outEvent = employee.timeOutEvents.find(timeStamp => timeStamp.date === date)

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = (employee, date) => {
  let wagesEarned = hoursWorkedOnDate(employee, date) * employee.payPerHour
  return wagesEarned
}


let allWagesFor = (employee) => {
  let eligibleDates = employee.timeInEvents.map(employeeData => employeeData.date)

  let payment = eligibleDates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)

  return payment
}

let createEmployeeRecords = (src) => {
  return src.map(row => createEmployeeRecord(row))
}

let findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(rec => rec.firstName === firstName) 
}

let calculatePayroll = arrayOfEmployeeRecords => {
  return arrayOfEmployeeRecords.reduce((acc, rec) => acc + allWagesFor(rec)
  , 0)
}





