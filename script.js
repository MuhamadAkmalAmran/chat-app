const chatData = {
  "room": {
      "name": "Product A",
      "id": 12456,
      "image_url": "https://picsum.photos/id/237/200/300",
      "participant": [
          {"id": "admin@mail.com", "name": "Admin", "role": 0},
          {"id": "agent@mail.com", "name": "Agent A", "role": 1},
          {"id": "customer@mail.com", "name": "king customer", "role": 2}
      ]
  },
  "comments": [
      {"id": 885512, "type": "text", "message": "Selamat malam", "sender": "customer@mail.com"},
      {"id": 885513, "type": "text", "message": "Malam", "sender": "agent@mail.com"},
      {"id": 885514, "type": "text", "message": "Ada yang bisa saya bantu?", "sender": "agent@mail.com"},
      {"id": 885515, "type": "text", "message": "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal", "sender": "customer@mail.com"},
      {"id": 885516, "type": "text", "message": "Baik, silahkan kirimkan lampiran bukti pembayarannya", "sender": "agent@mail.com"},
      {"id": 885517, "type": "image", "message": "https://picsum.photos/id/1015/200/300", "sender": "customer@mail.com"},
      {"id": 885518, "type": "text", "message": "Ini foto bukti pembayarannya", "sender": "customer@mail.com"},
      {"id": 885519, "type": "video", "message": "https://www.w3schools.com/html/mov_bbb.mp4", "sender": "customer@mail.com"},
      {"id": 885520, "type": "text", "message": "Saya juga punya video transaksinya", "sender": "customer@mail.com"},
      {"id": 885521, "type": "pdf", "message": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "sender": "customer@mail.com"},
      {"id": 885522, "type": "text", "message": "Dan ini PDF laporan transaksinya", "sender": "customer@mail.com"}
  ]
};

function displayParticipants() {
  const participantList = document.getElementById('participantList');
  const participants = chatData.room.participant.map(p => p.name).join(', ');
  participantList.textContent = `Participants: ${participants}`;
}

function getSenderName(senderId) {
  const participant = chatData.room.participant.find(p => p.id === senderId);
  return participant ? participant.name : senderId;
}

function displayMessages() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = '';
  chatData.comments.forEach(comment => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(comment.sender === 'customer@mail.com' ? 'sent' : 'received');
      
      const senderDiv = document.createElement('div');
      senderDiv.classList.add('sender');
      senderDiv.textContent = getSenderName(comment.sender);
      messageDiv.appendChild(senderDiv);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('media-message');

      switch(comment.type) {
          case 'text':
              contentDiv.textContent = comment.message;
              break;
          case 'image':
              const img = document.createElement('img');
              img.src = comment.message;
              img.alt = 'Sent image';
              contentDiv.appendChild(img);
              break;
          case 'video':
              const video = document.createElement('video');
              video.src = comment.message;
              video.controls = true;
              contentDiv.appendChild(video);
              break;
          case 'pdf':
              const pdfLink = document.createElement('a');
              pdfLink.href = `${comment.message}`; // Placeholder URL
              pdfLink.target = '_blank';
              pdfLink.classList.add('pdf-container');

              const pdfIcon = document.createElement('div');
              pdfIcon.classList.add('pdf-icon');
              pdfIcon.textContent = 'PDF';
              pdfLink.appendChild(pdfIcon);

              // const pdfName = document.createElement('span');
              // pdfName.classList.add('pdf-name');
              // pdfName.textContent = comment.message;
              // pdfLink.appendChild(pdfName);

              contentDiv.appendChild(pdfLink);
              break;
      }

      messageDiv.appendChild(contentDiv);
      chatMessages.appendChild(messageDiv);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message) {
      chatData.comments.push({
          id: Date.now(),
          type: "text",
          message: message,
          sender: "customer@mail.com"
      });
      displayMessages();
      messageInput.value = '';
  }
}

displayParticipants();
displayMessages();