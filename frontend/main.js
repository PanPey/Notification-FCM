firebase.initializeApp({
    // Replace with your Firebase project's configuration
    apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    authDomain: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    projectId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    messagingSenderId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  });
  
  // Function to get device registration token
  function getDeviceRegistrationToken() {
    const messaging = firebase.messaging();
  
    messaging.requestPermission()
      .then(() => {
        console.log('Permission granted.');
  
        return messaging.getToken();
      })
      .then((token) => {
        console.log('Device registration token:', token);
  
        sendTokenToServer(token);
      })
      .catch((error) => {
        console.log('Error getting registration token:', error);
      });
  }
  
  const getTokenButton = document.getElementById('getTokenButton');
  getTokenButton.addEventListener('click', getDeviceRegistrationToken);
  
  function sendTokenToServer(token) {
    fetch('http://localhost:3000/registerToken', {
      method: 'POST',
      body: JSON.stringify({ token: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Token sent to server successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending token to server:', error);
      });
  }
  
  function sendPushNotification() {
    const notificationTitle = document.getElementById('notificationTitle').value;
    const notificationBody = document.getElementById('notificationBody').value;
  
    fetch('http://localhost:3000/sendNotification', {
      method: 'POST',
      body: JSON.stringify({ title: notificationTitle, body: notificationBody }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Push notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending push notification:', error);
      });
  }
  
  const sendNotificationButton = document.getElementById('sendNotificationButton');
  sendNotificationButton.addEventListener('click', sendPushNotification);
  