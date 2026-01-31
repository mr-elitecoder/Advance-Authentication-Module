const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);

  const email = formData.get("email").toLowerCase().trim();
  const password = formData.get("password");

  loginMessage.textContent = "";

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    /* URL: Where am I going?

        Method: What am I doing? (POST = Sending/Saving).

        Body: What am I carrying? (The email/password).

        JSON: The language we both speak.
    */

    const data = await response.json();

    if (!response.ok) {
      loginMessage.style.color = "red";
      loginMessage.textContent = data.message || "Login Failed";
      return;
    }

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful ! Redirecting...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000); // our protected page
  } catch (error) {
    console.log(error);
    loginMessage.textContent = "Server error. Please try again Later";
  }
});
