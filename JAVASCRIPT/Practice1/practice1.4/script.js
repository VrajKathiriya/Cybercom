$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    // check if the required fields is empty or not

    // cities validation
    if (!$("#from").val()) {
      $(".error-box").text("Please enter the current city");
    } else if (!$("#to").val()) {
      $(".error-box").text("Please enter the destination city");
    } else if ($("#from").val().toLowerCase() == $("#to").val().toLowerCase()) {
      $(".error-box").text("Please enter different cities");
    }

    // Date validation
    else if (!$(".date-picker input").val()) {
      $(".error-box").text("Please select the date");
    }

    // validation for no of seats
    else if (!$("#seats").val()) {
      $(".error-box").text("Enter number of seats");
    } else if (isNaN($("#seats").val())) {
      $(".error-box").text("Enter only digits for seats");
    }

    // validation for full name
    else if (!$("#fullName").val()) {
      $(".error-box").text("Please enter your fullname");
    } else if (!validName($("#fullName").val())) {
      $(".error-box").text("Please enter only alphabats of length 3 to 16");
    }

    // validation for email
    else if (!$("#email").val()) {
      $(".error-box").text("Please enter your email");
    } else if (!IsEmail($("#email").val())) {
      $(".error-box").text("Please enter valid email");
    }

    // validation for phone number
    else if (!$("#phone").val()) {
      $(".error-box").text("Please enter your phone number");
    } else if (isNaN($("#phone").val())) {
      $(".error-box").text("Enter only digits for phone number");
    } else if ($("#phone").val().length != 10) {
      $(".error-box").text("Please enter 10 digits for number");
    }

    // validation complete
    else {
      alert("Form validation complete");
      $(".error-box").text("**Errors will be shown here");
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

    function validName(name) {
      const pattern = /^[a-zA-Z]{3,16}$/;
      if (name.match(pattern)) {
        return true;
      } else return false;
    }
  });
});
