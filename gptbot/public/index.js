async function sendMessage() {
  const input = document.getElementById("userInput");
  const responseDiv = document.getElementById("response");
  const message = input.value;

  if (!message) return;

  responseDiv.innerText = "Pensando... 🤔";

  try {
    const res = await fetch("/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message })
});


    const data = await res.json();
    responseDiv.innerText = data.reply;
  } catch (error) {
    responseDiv.innerText = "Error al conectar con el servidor.";
    console.error(error);
  }

  input.value = "";
}
