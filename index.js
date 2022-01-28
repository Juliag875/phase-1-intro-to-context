// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents : [],
    timeOutEvents : []
  }
}

function createEmployeeRecords(arr) {
  return arr.map(record => createEmployeeRecord(record))
}

function createTimeInEvent (record, dateStamp) {
  let [date, hour] = dateStamp.split(' ')
  record.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })
  return record
}

function createTimeOutEvent(record, dateStamp){
  let [date, hour] = dateStamp.split(' ')
  record.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })
  return record
}

function hoursWorkedOnDate(record, hoursWorked) {
  let timeIn = record.timeInEvents.find(hours => hours.date === hoursWorked)
  let timeOut = record.timeOutEvents.find(hours => hours.date === hoursWorked)
  return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(record, hoursWorked) {
  let wage = hoursWorkedOnDate(record, hoursWorked) * record.payPerHour;
  return parseInt(wage);
}

function allWagesFor(record) {
  let allWages = record.timeInEvents.map(wage => wage.date)
  return allWages.reduce((total,dates) => total + wagesEarnedOnDate(record,dates),0)
}

function calculatePayroll(records) {
  return records.reduce((sum,dates) => sum + allWagesFor(dates), 0)
}