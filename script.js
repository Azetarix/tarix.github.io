// script.js

// HTML-dən lazımi elementləri seçirik
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// "Göndər" düyməsinə kliklənən zaman baş verən hadisə
sendBtn.addEventListener('click', () => {
  const question = userInput.value.trim();
  if (question) {
    // İstifadəçi mesajını ekranda göstəririk
    displayMessage(question, 'user');
    userInput.value = "";
    // Süni intellektə sorğu göndəririk
    callAI(question);
  }
});

// Çat sahəsinə mesaj əlavə etmək funksiyası
function displayMessage(text, sender = 'bot') {
  const messageElem = document.createElement('div');
  messageElem.classList.add('message', sender);
  messageElem.textContent = text;
  chatLog.appendChild(messageElem);

  // Çat sahəsini avtomatik alt hissəyə kaydırmaq
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Süni intellektdən cavab almaq üçün nümunə funksiya (dummy)
async function callAI(question) {
  // “Fikirləşir...” tipli köməkçi mesaj
  displayMessage("Fikirləşir...", "bot");

  try {
    // Məsələn, real API ünvanını dəyişin
    const apiUrl = "https://api.fakehuggingface.com/chat";

    // POST sorğusu göndəririk
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Əgər API açarınız varsa:
        // 'Authorization': 'Bearer SIZIN_API_ACARINIZ'
      },
      body: JSON.stringify({ prompt: question })
    });

    // “Fikirləşir...” mesajının üstünü yazmaq əvəzinə, sadəcə yeni mesaj əlavə edirik
    if (response.ok) {
      const data = await response.json();
      const botAnswer = data.answer || "Bağışlayın, bu barədə məlumatım yoxdur.";
      displayMessage(botAnswer, 'bot');
    } else {
      displayMessage("API-dən xəta cavabı gəldi.", "bot");
    }

  } catch (error) {
    displayMessage("Süni intellekt xidməti ilə əlaqə zamanı xəta baş verdi.", "bot");
    console.error(error);
  }
}