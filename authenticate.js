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
const merge = require('merge');

/**
 * get smartthings endpoint
 * @param {string} [access_token] smartthings token
 * @param {function} callback callback
 */
function get_endpoint(access_token, callback) {
  const tokenres = {
    method: 'GET',
    url: 'https://graph.api.smartthings.com/api/smartapps/endpoints',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };
  request(tokenres, (error, response, body) => {
    if (error) throw new Error(error);
    const contact = JSON.parse(body);
    callback(contact[0]);
  });
}
/**
 * [authenticate description]
 * @param  {oblect}   options  options object created from xim_instance() with the additional
 *                    options to perform xim_authenticate, refer to corresponding
 *                    documents for the details
 * @param  {Function} callback callback to be used by the XIM driver
 */
function authenticate(options, callback) {
  const callback_options = merge({}, options);
  callback_options.result = {};

  if (callback_options.xim_content && !callback_options.xim_content.access_token) {
    callback_options.result.err_no = 113;
    callback_options.result.err_msg = 'No Access Token';
    callback(callback_options);
  } else {
    callback_options.xim_content.access_token = callback_options.xim_content.access_token;
    get_endpoint(callback_options.xim_content.access_token, (endpoint) => {
      callback_options.xim_content.uri = endpoint.uri;
      callback_options.result.err_no = 0;
      callback_options.result.err_msg = 'ok';
      callback(callback_options);
    });
  }
}

/**
 * functions exporting
 */
module.exports = authenticate;
