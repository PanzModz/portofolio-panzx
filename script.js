// navbar //
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Skil
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
  
  /* Send Ke Telegram*/
  
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Semua field harus diisi!',
        text: 'Silakan lengkapi nama, email, dan pesan.',
      });
      return;
    }

    const token = "7608218755:AAGxZXhE1K79PzQ9VJQFy6AdJ9QhRIebirE"; // Ganti dengan token bot kamu
    const chat_id = "7635071107"; // Ganti dengan chat ID admin/owner

    const text = `
📩 *Pesan Baru dari Website*
👤 Nama: ${name}
📧 Email: ${email}
📝 Pesan: ${message}
    `;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: "Markdown",
      }),
    })
    .then((res) => {
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Pesan Terkirim!',
          text: 'Terima kasih, pesan kamu sudah dikirim.',
        });
        form.reset();
      } else {
        return res.json().then(data => {
          throw new Error(data.description || "Gagal mengirim pesan.");
        });
      }
    })
    .catch((err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim!',
        text: 'Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.',
      });
    });
  });
