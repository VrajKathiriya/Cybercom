const patientNameEl = document.getElementById("patient-name");
const startTimeEl = document.getElementById("start-time");
const checkBtn = document.getElementById("check-btn");
const doctorListEl = document.getElementById("doctor-list");
const logoutBtn = document.getElementById("logout-btn");

// get the information of logged in user
let loggedInPatient = sessionStorage.getItem("loggedInUser");
loggedInPatient = JSON.parse(loggedInPatient);

if (!loggedInPatient) {
  location.href = "index.html";
  alert("Please login to show dashboard");
}

document.addEventListener("DOMContentLoaded", function () {
  patientNameEl.innerText = loggedInPatient.name.toUpperCase();

  let patients = localStorage.getItem("patients");
  patients = JSON.parse(patients) || [];
  let appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments) || [];

  let currentPatient = patients.find(
    (patient) => patient.id == loggedInPatient.id
  );

  loggedInPatient = currentPatient;

  sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInPatient));

  let appointment = appointments.find(
    (appointment) => appointment.patientId == loggedInPatient.id
  );

  if (loggedInPatient.appointmentRequest == "sent") {
    document.querySelector(".table").innerText =
      "You already sent request to doctor please wait untill they will accept or decline your request.";
  } else if (loggedInPatient.appointmentRequest == "accepted") {
    document.querySelector(
      ".table"
    ).innerText = `Your request has been approved with doctor ${appointment.doctorName} at ${appointment.startTime}`;
  }
});

checkBtn.addEventListener("click", checkAvailability);

logoutBtn.addEventListener("click", logoutUser);

// function which will check the availability of doctors
function checkAvailability(e) {
  e.preventDefault();

  const startTime = startTimeEl.value;

  let availabilities = localStorage.getItem("availabilities");
  availabilities = JSON.parse(availabilities) || [];

  availabilities = availabilities.filter(
    (availability) =>
      availability.startTime <= startTime && availability.endTime >= startTime
  );

  bindData(availabilities);
}

// function which will bind data into table
function bindData(availabilities) {
  let html = "";
  availabilities.forEach((availability) => {
    html += `
    <tr>
      <td>${availability.name}</td>
      <td>${availability.startTime}</td>
      <td>${availability.endTime}</td>
      <td>${availability.duration}</td>
      <td><button class="btn btn-primary" onclick="bookAppointment({
        doctorId: ${availability.id},
        doctorName: '${availability.name}'
      })">Book Appointment</button></td>
      
    </tr>
    `;
  });
  doctorListEl.innerHTML = html;
}

// function which will book the appointment
function bookAppointment({ doctorId, doctorName }) {
  const confirmed = confirm(
    "Are you sure you want to sent appointment request?"
  );

  if (!confirmed) return;

  let appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments) || [];

  let patients = localStorage.getItem("patients");
  patients = JSON.parse(patients) || [];

  patients.forEach((patient) => {
    if (patient.id == loggedInPatient.id) {
      patient.appointmentRequest = "sent";
    }
  });

  localStorage.setItem("patients", JSON.stringify(patients));

  loggedInPatient.appointmentRequest = "sent";
  sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInPatient));

  const startTime = startTimeEl.value;
  let appointment = {
    id: Date.now(),
    doctorId,
    doctorName,
    patientId: loggedInPatient.id,
    patientName: loggedInPatient.name,
    startTime,
    status: "pending",
  };

  appointments = [...appointments, appointment];

  localStorage.setItem("appointments", JSON.stringify(appointments));

  location.reload();
}

// function that will logout user
function logoutUser() {
  let confirmed = confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  location.href = "index.html";
  sessionStorage.clear();
}
