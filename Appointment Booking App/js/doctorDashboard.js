const doctorNameEl = document.getElementById("doctor-name");
const startTimeEl = document.getElementById("start-time");
const endTimeEl = document.getElementById("end-time");
const setBtn = document.getElementById("set-btn");
const deleteBtn = document.getElementById("delete-btn");
const logoutBtn = document.getElementById("logout-btn");
const appointmentsListEl = document.getElementById("appointments-list");
const acceptedAppointmentsListEl = document.getElementById(
  "accepted-appointments-list"
);

// get the information of logged in user
let loggedInDoctor = sessionStorage.getItem("loggedInUser");
loggedInDoctor = JSON.parse(loggedInDoctor);

let availabilities = localStorage.getItem("availabilities");
availabilities = JSON.parse(availabilities) || [];

if (!loggedInDoctor) {
  location.href = "index.html";
  alert("Please login to show dashboard");
}

document.addEventListener("DOMContentLoaded", function () {
  let appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments) || [];

  doctorNameEl.innerText = loggedInDoctor.name.toUpperCase();

  let id = loggedInDoctor.id;

  let loggedInDoctorAvailability;
  availabilities.forEach((availability) => {
    if (availability.id == id) loggedInDoctorAvailability = availability;
  });

  // if doctor are not available
  if (!loggedInDoctorAvailability) {
    let patients = localStorage.getItem("patients");
    patients = JSON.parse(patients) || [];

    let patientIds = appointments.map((appointment) => {
      if (appointment.doctorId == loggedInDoctor.id)
        return appointment.patientId;
    });

    patients.forEach((patient) => {
      if (patientIds.includes(patient.id)) {
        patient.appointmentRequest = "not sent";
      }
    });

    localStorage.setItem("patients", JSON.stringify(patients));

    appointments = appointments.filter(
      (appointment) => appointment.doctorId != loggedInDoctor.id
    );

    localStorage.setItem("appointments", JSON.stringify(appointments));

    return;
  }

  startTimeEl.value = loggedInDoctorAvailability.startTime;
  endTimeEl.value = loggedInDoctorAvailability.endTime;

  setBtn.innerText = "Update";
  deleteBtn.classList.remove("hidden");

  appointments = appointments.filter(
    (appointment) => appointment.doctorId == loggedInDoctor.id
  );
  bindData(appointments);
});

// function which will bind data into table
function bindData(appointments) {
  appointments.forEach((appointment) => {
    if (appointment.status == "pending") {
      appointmentsListEl.innerHTML += `
      <tr>
      <td>${appointment.patientId}</td>
      <td>${appointment.patientName}</td>
      <td>${appointment.startTime}</td>
      <td><span class="btn btn-success" onclick="acceptAppointment(${appointment.id})">Accept</span> <span class="btn btn-danger" onclick="declineAppointment(${appointment.id})">Decline</span></td>
      </tr>
      `;
    } else {
      acceptedAppointmentsListEl.innerHTML += `
      <tr>
      <td>${appointment.patientId}</td>
      <td>${appointment.patientName}</td>
      <td>${appointment.startTime}</td>
      <td>Accepted <span class="btn btn-success" onclick="declineAppointment(${appointment.id})">Done</span></td>
      </tr>
      `;
    }
  });
}

// add eventListner to set button
setBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (setBtn.innerText == "Set") setAvailability();
  else updateAvailability(loggedInDoctor.id);
});

// add eventListner to not available button
deleteBtn.addEventListener("click", deleteAvailability);

logoutBtn.addEventListener("click", logoutUser);

// function which will accept appointment
function acceptAppointment(appointmentId) {
  let confirmed = confirm("Are you sure you want to Accept this request?");
  if (!confirmed) return;

  let appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments) || [];
  let patients = localStorage.getItem("patients");
  patients = JSON.parse(patients) || [];

  let patientId;
  appointments.forEach((appointment) => {
    if (appointment.id == appointmentId) {
      appointment.status = "success";
      patientId = appointment.patientId;
    }
  });

  patients.forEach((patient) => {
    if (patient.id == patientId) {
      patient.appointmentRequest = "accepted";
    }
  });

  localStorage.setItem("patients", JSON.stringify(patients));
  localStorage.setItem("appointments", JSON.stringify(appointments));

  location.reload();
}

// function which will decline the appointment request
function declineAppointment(appointmentId) {
  let confirmed = confirm("Are you sure?");
  if (!confirmed) return;

  let appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments) || [];
  let patients = localStorage.getItem("patients");
  patients = JSON.parse(patients) || [];

  let appointment = appointments.find(
    (appointment) => appointment.id == appointmentId
  );

  appointments = appointments.filter(
    (appointment) => appointment.id != appointmentId
  );

  patients.forEach((patient) => {
    if (patient.id == appointment.patientId) {
      patient.appointmentRequest = "not sent";
    }
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));
  localStorage.setItem("patients", JSON.stringify(patients));
  location.reload();
}

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
