const express = require('express');
const path = require('path');
require('dotenv').config();
const sgMail  = require('@sendgrid/mail');
const cors = require('cors');
sgMail.setApiKey("SG." + process.env.SENDGRID_KEY);

let port = process.env.PORT || 5000;
const app = express();
app.use(cors({origin:true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// new complaint api
app.post('/api/new-complaint', (req,res) => {
  console.log(req);
  const emailData = {
    from: 'info.virtualpolicestation@gmail.com',
    to: req.body.email,
    subject: "Complaint Registered",
    // mail template
    html: `<section id="mail" style="font-family: Arial, Helvetica, sans-serif; text-align: left; width: 100%;position: relative;">
              <div id="image" style="width: 100%;">
                <img src="https://drive.google.com/file/d/1G8BS_CVj6xyO7xyRsg2TwbSRkMubzsy7/preview"style="width: 100%;">
              </div>
              <div id="content" style="width: 100%;">
                      <p>Dear ${req.body.name},</p>
                      <p>This is to confirm you that we have received your complaint and we will be reaching you out soon.</p>
                      <br>
                      <br>
                      <p>Regards,<br>Virtual Police Station Team</p>
                      <a href="https://virtualpolicestation.herokuapp.com/" style="cursor:pointer"><button style="border-radius: 5px; background-color: #3A96FF; outline: none; border: none; color: white; font-size: 16px;">Visit Virtual Police Station</button></a>
              </div>
                  <br>
                  <br>
                  <br>
                  <br>
            </section>    `,
    };
    (async () => {
      try {
        await sgMail
          .send(emailData)
          .then(() => {
            return res.send('Submitted successfully');
          })
          .catch(err => {
            console.log(err);
            return res.send(err);
          })
      }
      catch(error) {
        console.log(error);
        return res.send(err);
      }
    })();
});

// character certificate api
app.post('/api/character-certificate', (req,res) => {
  console.log(req);
  const emailData = {
    from: 'info.virtualpolicestation@gmail.com',
    to: req.body.email,
    subject: "Character Certificate",
    // mail template
    html: `<section id="mail" style="font-family: Arial, Helvetica, sans-serif; text-align: left; width: 100%;position: relative;">
              <div id="image" style="width: 100%;">
                <img src="https://drive.google.com/file/d/1G8BS_CVj6xyO7xyRsg2TwbSRkMubzsy7/preview"style="width: 100%;">
              </div>
              <div id="content" style="width: 100%;">
                      <p>Dear ${req.body.name},</p>
                      <p>This is to confirm you that we have received your request for Character certificate and we will be informing you soon upon verification.</p>
                      <br>
                      <br>
                      <p>Regards,<br>Virtual Police Station Team</p>
                      <a href="https://virtualpolicestation.herokuapp.com/" style="cursor:pointer"><button style="border-radius: 5px; background-color: #3A96FF; outline: none; border: none; color: white; font-size: 16px;">Visit Virtual Police Station</button></a>
              </div>
                  <br>
                  <br>
                  <br>
                  <br>
            </section>    `,
    };
    (async () => {
      try {
        await sgMail
          .send(emailData)
          .then(() => {
            return res.send('Submitted successfully');
          })
          .catch(err => {
            console.log(err);
            return res.send(err);
          })
      }
      catch(error) {
        console.log(error);
        return res.send(err);
      }
    })();
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log('server running on port: ', port));