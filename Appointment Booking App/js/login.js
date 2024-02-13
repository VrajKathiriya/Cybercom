const userRoleEl = document.getElementById("role");
const userEmailEl = document.getElementById("email");
const userPasswordEl = document.getElementById("password");
const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", loginUser);

let loggedInUser = sessionStorage.getItem("loggedInUser");
loggedInUser = JSON.parse(loggedInUser) || [];

if (loggedInUser) {
  if (loggedInUser.role == "doctor") location.href = "doctorDashboard.html";
  else if (loggedInUser.role == "patient")
    location.href = "patientDashboard.html";
}

// function which will login the user
function loginUser(e) {
  e.preventDefault();

  // get the values from input
  const userRole = userRoleEl.value;
  const userEmail = userEmailEl.value;
  const userPassword = userPasswordEl.value;

  // basic vallidation
  if (!userRole) {
    alert("Please select a role");
    return;
  } else if (!userEmail) {
    alert("Please enter email");
    return;
  } else if (!userPassword) {
    alert("Please enter password");
    return;
  }

  if (userRole == "doctor") {
    loginDoctor(userEmail, userPassword);
  } else if (userRole == "patient") {
    loginPatient(userEmail, userPassword);
  } else return;
}

// function which will login a doctor
function loginDoctor(email, password) {
  let doctors = localStorage.getItem("doctors");
  doctors = JSON.parse(doctors) || [];

  let loggedInDoctor;
  doctors.forEach((doctor) => {
    if (doctor.email == email && doctor.password == password) {
      loggedInDoctor = doctor;
      return;
    }
  });

  if (loggedInDoctor) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInDoctor));
    location.href = "doctorDashboard.html";
  } else alert("Please enter correct details");
}

// function which will login a patient
function loginPatient(email, password) {
  let patients = localStorage.getItem("patients");
  patients = JSON.parse(patients) || [];

  let loggedInPatient;
  patients.forEach((patient) => {
    if (patient.email == email && patient.password == password) {
      loggedInPatient = patient;
      return;
    }
  });

  if (loggedInPatient) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInPatient));
    location.href = "patientDashboard.html";
  } else alert("Please enter correct details");
}
