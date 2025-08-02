function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputField = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = inputField.value.trim();

  if (!message) return;

  chatBox.innerHTML += `<div class="user-msg"><strong>You:</strong> ${escapeHTML(message)}</div>`;
  inputField.value = "";

  // Show typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.textContent = "Mindify is typing...";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    typingDiv.remove();

    if (res.ok) {
      chatBox.innerHTML += `<div class="bot-msg"><strong>Mindify:</strong> ${escapeHTML(data.reply)}</div>`;
    } else {
      chatBox.innerHTML += `<div class="bot-msg error"><strong>Mindify:</strong> ${escapeHTML(data.reply || "Error connecting to the server.")}</div>`;
    }
  } catch (error) {
    typingDiv.remove();
    chatBox.innerHTML += `<div class="bot-msg error"><strong>Mindify:</strong> Error connecting to the server.</div>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});