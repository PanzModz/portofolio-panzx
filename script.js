// navbar //
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Skill
  document.addEventListener("DOMContentLoaded", () => {
    const fills = document.querySelectorAll('.fill');
    fills.forEach(fill => {
      const percentEl = fill.querySelector('.percent');
      const target = parseInt(fill.dataset.fill, 10);
      let current = 0;

      const interval = setInterval(() => {
        if (current >= target) {
          clearInterval(interval);
        } else {
          current++;
          percentEl.textContent = current + "%";
        }
      }, 20);
    });
  });
  
    function enterApp() {
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('navbar').classList.add('active');
      showSection('home');
    }

    function showSection(id) {
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("success-msg");
    const errorMsg = document.getElementById("error-msg");
    const finalMsg = document.getElementById("final-msg");
    const statusList = document.getElementById("status-ul");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const imageInput = document.getElementById("image");

      if (!name || !email || !message) {
        errorMsg.textContent = "❌ Semua field harus diisi.";
        successMsg.textContent = "";
        return;
      }

      const token = "8173902644:AAHO_nUPw_Z0ukfzQc2U0VhufeH7IjGbWiw";
      const chat_id = "7635071107";

      const caption = `
<b>📩 Pesan Baru dari Website</b>
<b>👤 Nama:</b> ${name}
<b>📧 Email:</b> ${email}
<b>📝 Pesan:</b> ${message}
      `;

      const saveStatus = (text) => {
        const li = document.createElement("li");
        li.textContent = text;
        if (statusList.children[0]?.textContent === "Belum ada pesan dikirim.") {
          statusList.innerHTML = "";
        }
        statusList.appendChild(li);
      }

      if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const formData = new FormData();
        formData.append("chat_id", chat_id);
        formData.append("caption", caption);
        formData.append("parse_mode", "HTML");
        formData.append("photo", file);

        fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          body: formData
        })
        .then((res) => {
          if (res.ok) {
            showSuccess(name, message);
            saveStatus(`${name}: "${message}" (dengan gambar)`);
          } else {
            return res.json().then(data => {
              throw new Error(data.description || "Gagal mengirim gambar.");
            });
          }
        })
        .catch((err) => {
          errorMsg.textContent = "❌ Gagal mengirim: " + err.message;
          successMsg.textContent = "";
        });

      } else {
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chat_id,
            text: caption,
            parse_mode: "HTML",
          }),
        })
        .then((res) => {
          if (res.ok) {
            showSuccess(name, message);
            saveStatus(`${name}: "${message}" (tanpa gambar)`);
          } else {
            return res.json().then(data => {
              throw new Error(data.description || "Gagal mengirim pesan.");
            });
          }
        })
        .catch((err) => {
          errorMsg.textContent = "❌ Gagal mengirim: " + err.message;
          successMsg.textContent = "";
        });
      }
    });

    function showSuccess(name, msg) {
      successMsg.textContent = "";
      errorMsg.textContent = "";
      finalMsg.textContent = "✅ Pesan Berhasil Dikirim Ke Owner Website";
      form.style.display = "none";
    }