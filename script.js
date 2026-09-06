document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("date");
const today = new Date();
dateInput.min = today.toISOString().split("T")[0];

document.getElementById("booking-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const matter = document.getElementById("matter").value.trim();

  if (!name || !date || !time) return;

  const message =
`Hello Advocate Sharon Dhanaraj, I would like to request an in-person appointment.

Name: ${name}
Preferred date: ${date}
Preferred time: ${time}
Matter: ${matter || "Not provided"}

Please confirm the appointment.`;

  const url = "https://wa.me/919847388026?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");
  document.getElementById("status").textContent = "WhatsApp opened with your appointment request.";
});