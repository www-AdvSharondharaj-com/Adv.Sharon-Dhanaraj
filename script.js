document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.textContent = open ? "×" : "☰";
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

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

Please review and confirm the appointment.`;

  const url = "https://wa.me/919847388026?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");

  document.getElementById("status").textContent =
    "WhatsApp opened with your appointment request.";
});
