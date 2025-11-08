// feedback.js
// Basic validation for the feedback form

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function (event) {
    // get the inputs
    const email = document.getElementById("email");
    const category = document.getElementById("category");
    const subject = document.getElementById("subject");
    const details = document.getElementById("details");

    // simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // assuming everything is fine
    let isValid = true;
    let messages = [];

    // check email
    if (email.value.trim() === "") {
      isValid = false;
      messages.push("Please enter your email address.");
    } else if (!emailPattern.test(email.value.trim())) {
      isValid = false;
      messages.push("Please enter a valid email address.");
    }

    // check category
    if (category.value === "") {
      isValid = false;
      messages.push("Please select a feedback category.");
    }

    // check subject
    if (subject.value.trim() === "") {
      isValid = false;
      messages.push("Please enter a short title.");
    }

    // check details
    if (details.value.trim() === "") {
      isValid = false;
      messages.push("Please include some details in your feedback.");
    }

    // if something failed
    if (!isValid) {
      event.preventDefault(); // stop the form from sending
      alert(messages.join("\n")); // show all issues at once
    } else {
      // success message (for demo purposes)
      alert("Feedback submitted successfully!");
    }
  });
});