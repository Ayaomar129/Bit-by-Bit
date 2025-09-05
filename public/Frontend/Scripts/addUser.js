 document.getElementById("addUserForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;
      const userData = { name, email, password, role };
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(userData)
        });

        const data = await res.json();
        console.log("Response:", data);

        const errorBox = document.getElementById("errorBox");
        errorBox.innerHTML = "";

        if (res.ok) {
          alert("User created successfully!");
          window.location.href = "users.html";
        } else {
          if (data.errors) {
            let errorHtml = `<div class="alert alert-danger"><ul>`;
            for (const key in data.errors) {
              errorHtml += `<li>${data.errors[key][0]}</li>`;
            }
            errorHtml += `</ul></div>`;
            errorBox.innerHTML = errorHtml;
          } else {
            errorBox.innerHTML = `<div class="alert alert-danger"> ${data.message}</div>`;
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Something went wrong: " + err);
      }
    });
