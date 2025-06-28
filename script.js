// navbar //
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const closeBtn = document.getElementById('close-btn');
const navItems = navLinks.querySelectorAll('a'); // semua link <a>

toggle.addEventListener('click', () => {
  navLinks.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('active');
});

// Tambahkan event listener ke setiap <a>
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
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
  
  const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const points = [];
    const POINTS_COUNT = 100; // Jumlah titik
    const MAX_DISTANCE = 120; // Jarak maksimal antar titik

    for (let i = 0; i < POINTS_COUNT; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4, // Kecepatan horizontal
        vy: (Math.random() - 0.5) * 0.4, // Kecepatan vertikal
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < POINTS_COUNT; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        // Pantul jika mengenai pinggir layar
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff'; // Titik putih
        ctx.fill();
      }

      for (let i = 0; i < POINTS_COUNT; i++) {
        for (let j = i + 1; j < POINTS_COUNT; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / MAX_DISTANCE})`; // Garis putih
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

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