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

const request = require('request');

/**
 * [authenticate description]
 * @param  {oblect}   options  options object created from xim_instance() with the additional
 *                    options to perform xim_authenticate, refer to corresponding
 *                    documents for the details
 * @param  {Function} callback callback to be used by the XIM driver
 */
function authenticate(options, callback) {
  const opt = {
    method: 'POST',
    url: 'https://graph.api.smartthings.com/oauth/token',
    form: {
      code: options.code,
      redirect_uri: options.callback,
      grant_type: 'authorization_code',
      client_id: options.client_id,
      client_secret: options.client_secret,
    },
  };

  request(opt, (error, response, body) => {
    let jsonObj = JSON.parse(body);
    const result = {};

    if (jsonObj.access_token) {
      const opt_end = {
        method: 'GET',
        url: 'https://graph.api.smartthings.com/api/smartapps/endpoints',
        headers: {
          Authorization: `Bearer ${jsonObj.access_token}`,
        },
      };

      request(opt_end, (error_end, response_end, body_end) => {
        if (error_end) {
          result.endpoints_error = 'endpoints error';
          callback(result);
        } else {
          result.api_token = jsonObj.access_token;
          jsonObj = JSON.parse(body_end);
          result.api_endpoint = jsonObj[1].uri;
          callback(result);
        }
      });
    } else {
      result.token_error = 'token error';
      callback(result);
    }
  });
}

/**
 * functions exporting
 */
module.exports = authenticate;
