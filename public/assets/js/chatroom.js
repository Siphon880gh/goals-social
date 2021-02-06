function scrollBottom() {window.scrollTo(0, 99999);}

let drone = new ScaleDrone('msKNYliGbSuotvDl');

//delete message from chatroom table
let deleteMessage = (id) => {
  const idObject = { id }
  fetch('/api/chatroom', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(idObject)
  })
  .then (res => {
    return res.json()
  })
  .then (res => {
    console.log(res)
  })
}

//Before post check length and then delete message if table length > 50
let checkDatabaseLengthAndUpdate = () => {
  fetch('/api/chatroom', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
  })
  .then(data => {
    //Add username and message object to array with addDiscussionToDatabase();

    //check if there are 50+ posts
    while (data.length > 50) {
      deleteMessage(data[0].id)
      data.shift();
      console.log('UPDATED')
    }
    //while there are 50+ posts use shift() method to remove first index of array.
  })
}

let addDiscussionToDatabase = (username, message) => {
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
};



let getRecentChat = () => {
  fetch('/api/chatroom', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
  })
  .then(data => {
    console.log(data)
    

    for (let i = 0; i < data.length; i++) {
    let div = document.createElement('div');
    div.innerHTML = '<b>' + data[i].username + '</b>: </br>' + data[i].message;
    div.classList.add('message');
    document.querySelector('.text-area').appendChild(div);
    }
    document.querySelector('#loading-text-area').setAttribute('style', 'display: none;')
    document.querySelector('.input-area').setAttribute('style', 'display: block;')
    scrollBottom();
  })
};

drone.on('open', (error) =>  {
  if (error) return console.error(error);

  let room = drone.subscribe('general-chat');
  //populate page with most recent 50 messages on start up
  getRecentChat();

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
    //update chat table
    addDiscussionToDatabase(nameEl.textContent, strippedString);
    //check if chat table is > 50 and if it is delete the oldest post
    checkDatabaseLengthAndUpdate();
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
  scrollBottom();
}