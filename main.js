const mirzohidselectorBtn = document.querySelector('#mirzohid-selector');
const userselectorBtn = document.querySelector('#user-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createchatMessageElement = (message) => `
    <div class="message ${message.sender === "Mirzohid" ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createchatMessageElement(message);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

let messageSender = "Mirzohid";
const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;

    if (name === "Mirzohid") {
        mirzohidselectorBtn.classList.add('active-person');
        userselectorBtn.classList.remove('active-person');
    } else if (name === "User") {
        userselectorBtn.classList.add('active-person');
        mirzohidselectorBtn.classList.remove('active-person');
    }

    chatInput.focus();
};

mirzohidselectorBtn.onclick = () => updateMessageSender('Mirzohid');
userselectorBtn.onclick = () => updateMessageSender('User');

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };

    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    chatMessages.innerHTML += createchatMessageElement(message);
    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);
clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMessages.innerHTML = '';
});
