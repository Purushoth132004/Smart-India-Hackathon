
// Chatbot Toggle
const chatBtn = document.getElementById("chat-btn");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

chatBtn.addEventListener("click", () => {
  chatbot.style.display = "flex";
  chatBtn.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatbot.style.display = "none";
  chatBtn.style.display = "flex";
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  let message = userInput.value.trim();
  if (message === "") return;

  // Show user message
  let userMsgDiv = document.createElement("div");
  userMsgDiv.classList.add("user-message");
  userMsgDiv.textContent = message;
  chatBody.appendChild(userMsgDiv);

  userInput.value = "";

  // Fake bot reply
  setTimeout(() => {
    let botMsgDiv = document.createElement("div");
    botMsgDiv.classList.add("bot-message");
    botMsgDiv.textContent = "🤖 Thanks for asking! We’ll guide you on " + message;
    chatBody.appendChild(botMsgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}
