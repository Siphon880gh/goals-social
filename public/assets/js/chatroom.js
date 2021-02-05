let drone = new ScaleDrone('msKNYliGbSuotvDl');

let addDiscussion = (username, message) => {
  console.log(username, message)
 const chatroom = {
   username, message
 }

  fetch('/api/chatroom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatroom)
  })
  .then (res => {
    return res.json()
  })
  .then (res => {
    console.log(res)
  })
}
drone.on('open', (error) =>  {
  if (error) return console.error(error);

  let room = drone.subscribe('general-chat');

  room.on('open', function (error) {
    if (error) return console.error(error);
    console.log('Connected to room');
  });

  room.on('data', addMessageToScreen);
});

function onSubmitForm(event) {
  let nameEl = document.querySelector('.input.name'),
  contentEl = document.querySelector('.input.content');
  let strippedString = contentEl.value.replace(/(<([^>]+)>)/gi, "");
  strippedString = strippedString.replace(/(\r\n|\n|\r)/g,"<br />");
  if (nameEl.textContent && strippedString) {
    addDiscussion(nameEl.textContent, strippedString);
    sendMessageToScaleDrone(nameEl.textContent, strippedString);
    contentEl.value = '';
  }
}

function sendMessageToScaleDrone(name, content) {
  drone.publish({
    room: 'general-chat',
    message: {
      name: name,
      content: content
    }
  });
}

function addMessageToScreen(message) {
  let div = document.createElement('div');
  div.innerHTML = '<b>' + message.name + '</b>: </br>' + message.content;
  div.classList.add('message');
  document.querySelector('.text-area').appendChild(div);
}