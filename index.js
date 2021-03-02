// Your code here
let createEmployeeRecord = function(arr) {
  return { 
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

let createEmployeeRecords = function(arrOfEmpData){
  return arrOfEmpData.map(function(singleEmp) {
    return createEmployeeRecord(singleEmp);
  })
}


let createTimeInEvent = function(emp, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  emp.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })
  return emp
}

let createTimeOutEvent = function(emp, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  emp.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return emp
}

let hoursWorkedOnDate = function(emp, lookDate){
  let inEvent = emp.timeInEvents.find(function(e){
    return e.date === lookDate
  })
  let outEvent = emp.timeOutEvents.find(function(e){
    return e.date === lookDate
  })
  return (outEvent.hour - inEvent.hour) / 100
}


let wagesEarnedOnDate = function(emp, lookDate){
  let wagesEarned = hoursWorkedOnDate(emp, lookDate) * emp.payPerHour
  return parseFloat(wagesEarned.toString())
}

let allWagesFor = function(emp) {
   let elligibleDates = emp.timeInEvents.map(function(e){
     return e.date
   })
   let payable = elligibleDates.reduce(function(memo, d){
     return memo + wagesEarnedOnDate(emp, d)
   }, 0)
   return payable
}

let calculatePayroll = function(allEmp){
  return allEmp.reduce(function(memo, rec){
    return memo + allWagesFor(rec)
  }, 0)
}

let findEmployeeByFirstName = function(allEmp, fname){
  return allEmp.find(function(rec){
    return rec.firstName === fname
  })
}