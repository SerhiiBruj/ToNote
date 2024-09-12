const jwt = require("jsonwebtoken");
const { APIKEY } = require("./keys.js");
const express = require("express");

const app =express();
const user = { id: 1, username: 'john.doe' };


const token = jwt.sign(user, APIKEY, { expiresIn: '1h' });

console.log(token);
jwt.verify(token, APIKEY, (err, decoded) => {
    if (err) {
      console.log('Токен недійсний або закінчився.');
    } else {
      console.log('Токен валідний:', decoded);
    }
  });

  app('/',(req,res)=>{
    jwt.verify(token, APIKEY, (err, decoded) => {
      if (err) {
        console.log('Токен недійсний або закінчився.');
      } else {
        console.log('Токен валідний:', decoded);
      }
    });
  
    return res.json({message:"Токен недійсний або закінчився."});
  })


  app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
  });
  