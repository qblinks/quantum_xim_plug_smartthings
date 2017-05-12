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
 * [action description]
 * @param  {object} option Plug action properties
 * @return {bool}        seccess or fail
 */
function action(options, callback) {
  let onoff = '';
  if (options.action.onoff === true) {
    onoff = 'on';
  } else {
    onoff = 'off';
  }

  const opt = {
    method: 'PUT',
    url: `${options.xim_content.uri}/outletAction/${options.device_id}/${onoff}`,
    headers: {
      Authorization: `Bearer ${options.xim_content.access_token}`,
    },
  };
  request(opt, (error, response) => {
    const callback_option = JSON.parse(JSON.stringify(options));
    callback_option.result = {};
    if (response.statusCode === 204) {
      callback_option.result.err_no = 0;
      callback_option.result.err_msg = 'ok';
    } else {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'action fail';
    }
    callback(callback_option);
  });
}

/**
 * functions exporting
 */
module.exports = action;
