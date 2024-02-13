const userRoleEl = document.getElementById("role");
const userNameEl = document.getElementById("name");
const userEmailEl = document.getElementById("email");
const userPasswordEl = document.getElementById("password");
const userPhoneEl = document.getElementById("phone");
const registerBtn = document.getElementById("register");

const maleRadioEl = document.getElementById("male");
const femaleRadioEl = document.getElementById("female");

let loggedInUser = sessionStorage.getItem("loggedInUser");
loggedInUser = JSON.parse(loggedInUser) || [];

if (loggedInUser) {
  if (loggedInUser.role == "doctor") location.href = "doctorDashboard.html";
  else if (loggedInUser.role == "patient")
    location.href = "patientDashboard.html";
}

registerBtn.addEventListener("click", registerUser);

// function which register user into local storage
function registerUser(e) {
  e.preventDefault();

  // get the values from the input
  const userRole = userRoleEl.value;
  const userName = userNameEl.value;
  const userEmail = userEmailEl.value;
  const userPassword = userPasswordEl.value;
  const userPhone = userPhoneEl.value;
  const gender = maleRadioEl.checked ? "male" : "female";

  // basic validation
  if (!userRole) {
    alert("Please select a role");
    return;
  } else if (!userName) {
    alert("Please enter name");
    return;
  } else if (!userEmail) {
    alert("Please enter email");
    return;
  } else if (!userPhone) {
    alert("Please enter phone number");
    return;
  } else if (!userPassword) {
    alert("Please enter password");
    return;
  }

  // create a new user with new values
  const newUser = {
    id: Date.now(),
    role: userRole,
    name: userName,
    email: userEmail,
    password: userPassword,
    phone: userPhone,
    gender: gender,
  };

  // if user is doctor
  if (userRole == "doctor") {
    registerDoctor(newUser);
    clearForm();
  } else if (userRole == "patient") {
    registerPatient(newUser);
    clearForm();
  } else return;
}

// function which register a doctor
function registerDoctor(newDoctor) {
  let doctors = localStorage.getItem("doctors");
  doctors = JSON.parse(doctors) || [];

  doctors = [...doctors, newDoctor];

  localStorage.setItem("doctors", JSON.stringify(doctors));
}

// function which register a patinet
function registerPatient(newPatient) {
  let patients = localStorage.getItem("patients");
  patients = JSON.parse(patients) || [];

  patients = [...patients, newPatient];

  localStorage.setItem("patients", JSON.stringify(patients));
}

// function which will clear all values
function clearForm() {
  userRoleEl.value = "";
  userNameEl.value = "";
  userEmailEl.value = "";
  userPasswordEl.value = "";
  userPhoneEl.value = "";
}
