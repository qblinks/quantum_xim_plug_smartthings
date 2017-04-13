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
  client_id: '0d8d7b05-340d-46f2-aca7-7b793052c046',
  client_secret: '314daace-5b81-4c07-acb8-165c84c0841d',
  site: 'https://graph.api.smartthings.com',
  authorize_path: '/oauth/authorize',
  token_path: '/oauth/token',
  callback: `http://127.0.0.1:${port}/callback`,
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
        res.send(cell);
      });
      // res.send(result);
    });
  } else {
    res.send('<a href=/auth>Login with SmartThings</a>');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
