const registerForm = document.querySelector("#registerForm");
const registerMessage = document.querySelector("#registerMessage");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").toLowerCase().trim();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  registerMessage.textContent = "";
  registerMessage.style.color = "red";

  if (!name || !email || !password || !confirmPassword) {
    registerMessage.textContent = "All Fields Required Dear :|";
    return;
  }

  if (password !== confirmPassword) {
    registerMessage.textContent = "Password does't match";
    return;
  }
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      registerMessage.textContent = data.message || "Register failed";
      return;
    }

    registerMessage.style.color = "green";
    registerMessage.textContent =
      "Account Created Dear ! Redirecting to Login...";
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  } catch (error) {
    console.log(error);
    registerMessage.textContent = "Server error... Please try again later";
  }
});
