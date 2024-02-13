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
});

checkBtn.addEventListener("click", checkAvailability);

logoutBtn.addEventListener("click", logoutUser);

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

function bindData(availabilities) {
  let html = "";
  availabilities.forEach((availability) => {
    html += `
    <tr>
      <td>${availability.name}</td>
      <td>${availability.startTime}</td>
      <td>${availability.endTime}</td>
      <td>${availability.duration}</td>
      <td><button class="btn btn-primary">Book Appointment</button></td>
    </tr>
    `;
  });
  console.log(html);
  doctorListEl.innerHTML = html;
}

// function that will logout user
function logoutUser() {
  let confirmed = confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  location.href = "index.html";
  sessionStorage.clear();
}
