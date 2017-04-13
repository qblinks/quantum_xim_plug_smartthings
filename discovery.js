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
 * for xim interface
 * @param  {object}   option   input xim_content
 * @param  {Function} callback return light list
 */
function discovery(options, callback) {
  console.log(options);
  const opt = {
    method: 'GET',
    url: `${options.api_endpoint}/switches`,
    headers: {
      Authorization: `Bearer ${options.api_token}`,
    },
  };

  request(opt, (error, response, body) => {
    const jsonObj = JSON.parse(body);
    if (error) {
      throw new Error(error);
    } else {
      callback(jsonObj);
    }
  });
}

/**
 * functions exporting
 */
module.exports = discovery;
