function sendNotification(
  message = 'Posible caso de crimen detectado', 
  title = 'ALERTA', 
  url = 'https://www.google.com/maps/@-16.3948183,-71.5414069,16z', 
  urlTitle = 'Location') {

  const data = new FormData();
  data.append('user', 'ucamosrvd9o17xhoxd9mzkoncmsct5');      // Replace with your User Key
  data.append('token', 'ayx1xdqprf5wqjyfdk1a7u8ep3xdp1');     // Replace with your Application API Token
  data.append('message', message);
  data.append('title', title);
  data.append('url', url);
  data.append('url_title', urlTitle);
  data.append('sound', 'magic');
  data.append('priority', 1);

  // Send the request to the Pushover API
  fetch('https://api.pushover.net:443/1/messages.json', {
    method: 'POST',
    body: data,
  })
    .then(response => response.json())
    .then(result => {
      console.log('Notification sent successfully:', result);
    })
    .catch(error => {
      console.error('Error sending notification:', error);
    });
}

export default sendNotification;
