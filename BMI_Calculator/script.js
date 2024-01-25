$(document).ready(function () {
  // height validation
  $("#height").blur(function () {
    if (!$("#height").val()) {
      $("#heightError").text("**Please enter height");
    } else if (isNaN($("#height").val())) {
      $("#heightError").text("**Please enter only digits for height");
    } else if ($("#height").val() < 0) {
      $("#heightError").text("**Please enter only positive number");
    } else {
      error = false;
      $("#heightError").text("");
    }
  });

  // weight validation
  $("#weight").blur(function () {
    if (!$("#weight").val()) {
      $("#weightError").text("**Please enter weight");
    } else if (isNaN($("#weight").val())) {
      $("#weightError").text("**Please enter only digits for weight");
    } else if ($("#weight").val() < 0) {
      $("#weightError").text("**Please enter only positive number");
    } else {
      $("#weightError").text("");
    }
  });

  // action when button is clicked
  $("#calculate").click(function (e) {
    e.preventDefault();
    const height = $("#height").val();
    const weight = $("#weight").val();

    if (!height) {
      alert("Please enter height");
      $("#output").text("");
      $("#category").text("");
    } else if (!weight) {
      alert("Please enter weight");
      $("#output").text("");
      $("#category").text("");
    }

    const bmi = calculateBMI(height, weight);
    console.log(bmi);

    if (height > 0 && weight > 0) {
      $("#output").text(bmi.toFixed(2));
      if (bmi < 18.5) {
        $("#category").text("Underweight");
        $("#category").css("color", "#dc2f2f");
        $("#output").css("color", "#dc2f2f");
        $(".container").css("border", "5px solid #dc2f2f");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        $("#category").text("Normal");
        $("#category").css("color", "#42b883");
        $("#output").css("color", "#42b883");
        $(".container").css("border", "5px solid #42b883");
      } else if (bmi >= 25 && bmi <= 29.9) {
        $("#category").text("Overweight");
        $("#category").css("color", "#fda403");
        $("#output").css("color", "#fda403");
        $(".container").css("border", "5px solid #fda403");
      } else {
        $("#category").text("Obesity");
        $("#category").css("color", "#dc2f2f");
        $("#output").css("color", "#dc2f2f");
        $(".container").css("border", "5px solid #dc2f2f");
      }
    }
  });
});

function calculateBMI(height, weight) {
  return weight / (height * height);
}
