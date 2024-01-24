$(document).ready(function () {
  let error = true;
  // validation for gender
  $("#gender").blur(function () {
    error = true;
    if (!$("#gender").val()) {
      $("#genderError").text("Please select gender");
    } else {
      error = false;
      $("#genderError").text("");
    }
  });

  // validation for first name
  $("#firstName").blur(function () {
    error = true;
    if (!$("#firstName").val()) {
      $("#firstNameError").text("Please enter first name");
    } else if (!isOnlyAlphabats($("#firstName").val())) {
      $("#firstNameError").text("Please enter alphabates of length 3 to 16");
    } else {
      error = false;
      $("#firstNameError").text("");
    }
  });

  // validation for last name
  $("#lastName").blur(function () {
    error = true;
    if (!$("#lastName").val()) {
      $("#lastNameError").text("Please enter last name");
    } else if (!isOnlyAlphabats($("#lastName").val())) {
      $("#lastNameError").text("Please enter alphabates of length 3 to 16");
    } else {
      error = false;
      $("#lastNameError").text("");
    }
  });

  // validation for date of birth
  $("#month").blur(function () {
    error = true;
    if (!$("#month").val()) {
      $("#monthError").text("Please select month");
    } else {
      error = false;
      $("#monthError").text("");
    }
  });
  $("#day").blur(function () {
    error = true;
    if (!$("#day").val()) {
      $("#dayError").text("Please select day");
    } else {
      error = false;
      $("#dayError").text("");
    }
  });
  $("#year").blur(function () {
    error = true;
    if (!$("#year").val()) {
      $("#yearError").text("Please select year");
    } else {
      error = false;
      $("#yearError").text("");
    }
  });

  // validation for height
  $("#patientHeight").blur(function () {
    error = true;
    if (!$("#patientHeight").val()) {
      $("#heightError").text("Please enter height");
    } else if (isNaN($("#patientHeight").val())) {
      $("#heightError").text("Please enter only digits for height");
    } else {
      error = false;
      $("#heightError").text("");
    }
  });

  // validation for weight
  $("#patientWeight").blur(function () {
    error = true;
    if (!$("#patientWeight").val()) {
      $("#weightError").text("Please enter weight");
    } else if (isNaN($("#patientWeight").val())) {
      $("#weightError").text("Please enter only digits for weight");
    } else {
      error = false;
      $("#weightError").text("");
    }
  });

  // validation for email
  $("#patientEmail").blur(function () {
    error = true;
    if (!$("#patientEmail").val()) {
      $("#emailError").text("Please enter email");
    } else if (!IsEmail($("#patientEmail").val())) {
      $("#emailError").text("Please enter proper email");
    } else {
      error = false;
      $("#emailError").text("");
    }
  });

  // validation for reason box
  $("#patientReason").blur(function () {
    error = true;
    if (!$("#patientReason").val()) {
      $("#reasonError").text("Please enter reason");
    } else if (!isOnlyAlphabats($("#patientReason").val())) {
      $("#reasonError").text(
        "Please enter only alphabats of atleast 3 leangth"
      );
    } else {
      error = false;
      $("#reasonError").text("");
    }
  });

  // when submit button clicked
  $("#submit").click(function (e) {
    e.preventDefault();
    if (!error) alert("Your detail submitted successfully");
    else alert("Please fill required fields properly");
  });
});

function isOnlyAlphabats(name) {
  const pattern = /^[a-zA-Z]{3,16}$/;
  if (name.match(pattern)) return true;
  else return false;
}
function IsEmail(email) {
  const regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}
