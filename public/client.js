let name;
const textArea = document.querySelector("#textarea");
const messageBox = document.querySelector("#messageBox");
const socket = io();

do{
    name = prompt("Enter your name : ");
}while(!name);


textArea.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        const msg = {
            name,
            message:e.target.value.trim()
        }
        socket.emit("message", msg);
        appendChat(msg, "outgoing");
        e.target.value = "";
        messageBox.scrollTop = messageBox.scrollHeight;
    }
});

const appendChat = (msg, type) => {
    let elem = document.createElement("div");
    elem.classList.add(type);
    elem.classList.add("message");
    const str = `<p class="name">${msg.name}</p>
    <p class="messageText">${msg.message}</p>`
    elem.innerHTML = str;
    messageBox.appendChild(elem);
}

//socket
socket.on("send", (msg)=>{
    appendChat(msg, "incoming");
    messageBox.scrollTop = messageBox.scrollHeight;
})
