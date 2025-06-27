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
    const successMsg = document.getElementById("successMsg");
    const errorMsg = document.getElementById("errorMsg");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const token = "7608218755:AAGxZXhE1K79PzQ9VJQFy6AdJ9QhRIebirE"; // Ganti dengan token bot kamu
      const chat_id = "7635071107"; // Ganti dengan chat ID kamu

      const pesan = `
📩 *Pesan Baru dari Website*
👤 Nama: ${name}
📧 Email: ${email}
📝 Pesan: ${message}
      `;

      fetch(`https://api.telegram.org/bot7608218755:AAGxZXhE1K79PzQ9VJQFy6AdJ9QhRIebirE/sendMessage`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
chat_id: '7635071107',
text: pesan,
parse_mode: 'Markdown'
})
})
      .then(res => {
        if (res.ok) {
          successMsg.textContent = "✅ Pesan berhasil dikirim!";
          errorMsg.textContent = "";
          form.reset();
        } else {
          throw new Error("Gagal mengirim pesan.");
        }
      })
      .catch(err => {
        errorMsg.textContent = "❌ Terjadi kesalahan saat mengirim.";
        successMsg.textContent = "";
      });
    });