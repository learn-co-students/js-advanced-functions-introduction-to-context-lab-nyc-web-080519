function createEmployeeRecord(dataArr) {
  return {
    firstName: dataArr[0],
    familyName: dataArr[1],
    title: dataArr[2],
    payPerHour: dataArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}


function createEmployees(arrOfArrs) {
  let output = arrOfArrs.map( arr => createEmployeeRecord(arr))
  return output
}



function createTimeInEvent(empObject, timeStamp) {
  empObject.timeInEvents.push({type: "TimeIn", 
      hour: parseInt(timeStamp.split(" ")[1]), 
      date: timeStamp.split(" ")[0] })
  return empObject
}

function createTimeOutEvent(empObject, timeStamp) {
  empObject.timeOutEvents.push({type: "TimeOut", 
      hour: parseInt(timeStamp.split(" ")[1]), 
      date: timeStamp.split(" ")[0] })
  return empObject
}

function hoursWorkedOnDate(empObj, date){
  let clockIn = empObj.timeInEvents.find( event => event.date == date).hour * .01
  let clockOut = empObj.timeOutEvents.find( event => event.date == date).hour * .01
  let hrsWorked = parseInt(clockOut) - parseInt(clockIn)
  return parseInt(hrsWorked)
}

function wagesEarnedOnDate(empObj, date) {
    return  hoursWorkedOnDate(empObj, date) * empObj.payPerHour
}

function allWagesFor(empObj) {
  let totalPay = 0
  empObj.timeInEvents.forEach( function(day) { 
    totalPay += wagesEarnedOnDate(empObj, day.date)
  })
  return totalPay
}

function createEmployeeRecords(arrArr) {
  let output = []
  arrArr.forEach( function(arr) {  output.push(createEmployeeRecord(arr))  })
  return output
}

function calculatePayroll(arr) {
  let output = 0
  arr.forEach( function(empObj){
    output += allWagesFor(empObj)
  }  )
  return output
}

function findEmployeeByFirstName(arr, firstName) {
  let output = arr.find( function(obj) { return obj.firstName === firstName})
  
  return output
}