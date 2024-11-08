const Pushover = require('pushover-notifications');

// Initialize Pushover with your User Key and API Token
const push = new Pushover({
  user: 'ucamosrvd9o17xhoxd9mzkoncmsct5',      // Replace with your User Key
  token: 'ayx1xdqprf5wqjyfdk1a7u8ep3xdp1'     // Replace with your Application API Token
});

/**
 * Sends a notification using Pushover.
 * 
 * @param {string} message - The main message content.
 * @param {string} [title] - Optional title for the notification.
 * @param {string} [url] - Optional URL to include in the notification.
 * @param {string} [urlTitle] - Optional text for the URL link.
 */

function sendNotification(
  message = 'Posible caso de crimen detectado', 
  title = 'ALERTA', 
  url = 'https://www.google.com/maps/@-16.3948183,-71.5414069,16z', 
  urlTitle = 'Location') 

{
  const msg = {
    message: message,
    title: title,
    url: url,
    url_title: urlTitle,
    sound: 'magic',   // Optional sound
    priority: 1       // Optional priority
  };

  push.send(msg, (err, result) => {
    if (err) {
      console.error('Error sending notification:', err);
    } else {
      console.log('Notification sent successfully:', result);
    }
  });
}

module.exports = sendNotification;
