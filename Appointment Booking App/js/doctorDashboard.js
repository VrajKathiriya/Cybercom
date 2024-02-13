const doctorNameEl = document.getElementById("doctor-name");
const startTimeEl = document.getElementById("start-time");
const endTimeEl = document.getElementById("end-time");
const setBtn = document.getElementById("set-btn");
const deleteBtn = document.getElementById("delete-btn");
const logoutBtn = document.getElementById("logout-btn");

// get the information of logged in user
let loggedInDoctor = sessionStorage.getItem("loggedInUser");
loggedInDoctor = JSON.parse(loggedInDoctor);

if (!loggedInDoctor) {
  location.href = "index.html";
  alert("Please login to show dashboard");
}

let availabilities = localStorage.getItem("availabilities");
availabilities = JSON.parse(availabilities) || [];

document.addEventListener("DOMContentLoaded", function () {
  doctorNameEl.innerText = loggedInDoctor.name.toUpperCase();

  let id = loggedInDoctor.id;

  let loggedInDoctorAvailability;
  availabilities.forEach((availability) => {
    if (availability.id == id) loggedInDoctorAvailability = availability;
  });

  if (!loggedInDoctorAvailability) return;

  startTimeEl.value = loggedInDoctorAvailability.startTime;
  endTimeEl.value = loggedInDoctorAvailability.endTime;

  setBtn.innerText = "Update";
  deleteBtn.classList.remove("hidden");
});

// add eventListner to set button
setBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (setBtn.innerText == "Set") setAvailability();
  else updateAvailability(loggedInDoctor.id);
});

// add eventListner to not available button
deleteBtn.addEventListener("click", deleteAvailability);

logoutBtn.addEventListener("click", logoutUser);

// function which will set availability of doctors
function setAvailability() {
  const startTime = startTimeEl.value;
  const endTime = endTimeEl.value;

  if (!compareTimes(startTime, endTime)) {
    alert("Please enter proper time");
    return;
  }

  let availabilities = localStorage.getItem("availabilities");
  availabilities = JSON.parse(availabilities) || [];

  let availability = {
    id: loggedInDoctor.id,
    name: loggedInDoctor.name,
    startTime,
    endTime,
    duration: calculateDuration(startTime, endTime),
  };

  availabilities = [...availabilities, availability];

  localStorage.setItem("availabilities", JSON.stringify(availabilities));

  setBtn.innerText = "Update";

  deleteBtn.classList.remove("hidden");
}

// function that will update availability
function updateAvailability(id) {
  let availabilities = localStorage.getItem("availabilities");
  availabilities = JSON.parse(availabilities) || [];
  let index;
  availabilities.forEach((availability, i) => {
    if (availability.id == id) index = i;
  });
  const startTime = startTimeEl.value;
  const endTime = endTimeEl.value;

  if (!compareTimes(startTime, endTime)) {
    alert("Please enter proper time");
    return;
  }

  let availability = {
    id: loggedInDoctor.id,
    name: loggedInDoctor.name,
    startTime,
    endTime,
    duration: calculateDuration(startTime, endTime),
  };

  availabilities[index] = availability;
  console.log(availabilities);
  localStorage.setItem("availabilities", JSON.stringify(availabilities));
}

// function that will delete availability
function deleteAvailability(id) {
  let availabilities = localStorage.getItem("availabilities");
  availabilities = JSON.parse(availabilities) || [];

  let confirmed = confirm("Are you sure you are not available");
  if (!confirmed) return;
  availabilities = availabilities.filter(
    (availability) => availability.id != loggedInDoctor.id
  );

  localStorage.setItem("availabilities", JSON.stringify(availabilities));
  location.reload();
}

// function that will compare time
function compareTimes(startTime, endTime) {
  // Convert time strings to Date objects
  var time1 = new Date("1970-01-01T" + startTime);
  var time2 = new Date("1970-01-01T" + endTime);

  // Compare the Date objects
  if (time1 < time2) {
    return true;
  } else {
    return false;
  }
}

// function that will calculate duration
function calculateDuration(startTimeString, endTimeString) {
  var startTime = new Date("1970-01-01T" + startTimeString);
  var endTime = new Date("1970-01-01T" + endTimeString);

  // Calculate the time difference in milliseconds
  var durationMilliseconds = endTime - startTime;

  // Convert the duration to hours, minutes, and seconds
  var hours = Math.floor(durationMilliseconds / (60 * 60 * 1000));
  var minutes = Math.floor(
    (durationMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
  );

  return `${hours}:${minutes} hours`;
}

// function that will logout user
function logoutUser() {
  let confirmed = confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  location.href = "index.html";
  sessionStorage.clear();
}
