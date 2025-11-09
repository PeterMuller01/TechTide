// feedback.js
// Basic form validation with optional anonymous email

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function (event) {
    const email = document.getElementById("email");
    const anonymous = document.getElementById("anonymous");
    const category = document.getElementById("category");
    const subject = document.getElementById("subject");
    const details = document.getElementById("details");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    let messages = [];

    // Only check email if "anonymous" is NOT checked
    if (!anonymous.checked) {
      if (email.value.trim() === "") {
        isValid = false;
        messages.push("Please enter your email address or check anonymous.");
      } else if (!emailPattern.test(email.value.trim())) {
        isValid = false;
        messages.push("Please enter a valid email address.");
      }
    }

    if (category.value === "") {
      isValid = false;
      messages.push("Please select a feedback category.");
    }

    if (subject.value.trim() === "") {
      isValid = false;
      messages.push("Please enter a short title.");
    }

    if (details.value.trim() === "") {
      isValid = false;
      messages.push("Please include some details in your feedback.");
    }

    if (!isValid) {
      event.preventDefault();
      alert(messages.join("\n"));
    } else {
      alert("Feedback submitted successfully!");
    }
  });
});
