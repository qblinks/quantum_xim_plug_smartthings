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
  } else if (options.action.onoff === false) {
    onoff = 'off';
  } else if (options.action.toggle === true) {
    Object.keys(options.xim_content.toggle).forEach((key) => {
      if (options.xim_content.toggle[key].device_id === options.device_id) {
        if (options.xim_content.toggle.onoff === true) {
          onoff = 'off';
        } else {
          onoff = 'on';
        }
      }
    });
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
    if (typeof options.xim_content === 'undefined' || typeof options.xim_content === 'undefined') {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'access token undefined';
    } else if (typeof options.xim_content.uri === 'undefined') {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'uri undefined';
    } else if (typeof options.device_id === 'undefined') {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'device id undefined';
    } else if (response.statusCode !== 204) {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'action fail';
    } else {
      Object.keys(callback_option.xim_content.toggle).forEach((key) => {
        if (callback_option.xim_content.toggle[key].device_id === options.device_id) {
          if (onoff === 'on') {
            callback_option.xim_content.toggle[key].onoff = 'true';
          } else {
            callback_option.xim_content.toggle[key].onoff = 'false';
          }
        } else {
          const toggle = {};
          toggle.device_id = options.device_id;
          toggle.onoff = options.action.onoff;
          callback_option.xim_content.toggle.push(toggle);
        }
      });
      callback_option.result.err_no = 0;
      callback_option.result.err_msg = 'ok';
    }
    console.log(callback_option.xim_content);
    delete callback_option.device_id;
    delete callback_option.action;
    callback(callback_option);
  });
}

/**
 * functions exporting
 */
module.exports = action;
