/*
 * Copyright (c) 2017
 * Qblinks Incorporated ("Qblinks").
 * All rights reserved.
 *
 * The information contained herein is confidential and proprietary to
 * Qblinks. Use of this information by anyone other than authorized employees
 * of Qblinks is granted only under a written non-disclosure agreement,
 * expressly prescribing the scope and manner of such use.
 */

'use strict';

const express = require('express');
const authenticate = require('./authenticate.js');
const discovery = require('./discovery.js');

const port = process.env.PORT || 8080;

const config = {
  client_id: '3843b082-0e09-4720-856f-b6ff3059ff2d',
  client_secret: '64d237a4-f54b-4ec1-9d66-3f55bdb75de4',
  site: 'https://graph.api.smartthings.com',
  authorize_path: '/oauth/authorize',
  token_path: '/oauth/token',
  callback: `http://127.0.0.1:${port}/callback`,
  discovery: `http://127.0.0.1:${port}/discovery`,
  code: '',
};

const app = express();

app.get('/', (req, res) => {
  res.send('<a href=/auth>Login with SmartThings</a>');
});

app.get('/auth', (req, res) => {
  const authorizationUri = `${config.site}${config.authorize_path}?redirect_uri=${config.callback}&scope=app&response_type=code&client_id=${config.client_id}`;

  res.redirect(authorizationUri);
});

app.get('/callback', (req, res) => {
  if (req.query.code) {
    config.code = req.query.code;
    authenticate(config, (result) => {
      discovery(result, (cell) => {
        console.log(cell);

        let html = '<select class="select" name="select" >';
        for (let i = 0; i < cell.switches.length; i += 1) {
          html += `<option value=${i}> ${cell.switches[i].label}`;
        }

        res.send(html);
      });
    });
  } else {
    res.send('<a href=/auth>Login with SmartThings</a>');
  }
});
/*
app.get('/discovery', (req, res) => {
  authenticate(config, (result) => {
    discovery(result, (cell) => {
      console.log(cell);

      let html = '<select class="select" name="select" >';
      for (let i = 0; i < cell.switches.length; i += 1) {
        html += `<option value=${i}> ${cell.switches[i].label}`;
      }

      res.send(html);
    });
  });
});
*/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
