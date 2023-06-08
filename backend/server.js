const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const FCM = require('fcm-node');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
})

// Insert your FCM server key
const serverKey = 'XXXXXXXXXXXXXXXX'; 
const fcm = new FCM(serverKey);

app.post('/registerToken', (req, res) => {
  const token = req.body.token;

  console.log('Received device registration token:', token);

  res.status(200).send('Device token registered successfully');
});

app.post('/sendNotification', (req, res) => {
  const notificationTitle = req.body.title;
  const notificationBody = req.body.body;

  const message = {
    notification: {
      title: notificationTitle,
      body: notificationBody,
    },
  };

// FCM function to send push notification
  fcm.send(message, function(err, response) {
    if (err) {
      console.error('Error sending push notification:', err);
      res.status(500).send('Error sending push notification');
    } else {
      console.log('Push notification sent successfully:', response);
      res.send('Push notification sent successfully');
    }
  });
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
