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
 * @param  {object}   option   input plug url and token
 * @param  {Function} callback return plug list
 */
function discovery(options, callback) {
  const opt = {
    method: 'GET',
    url: `${options.xim_content.uri}/outletDiscovery`,
    headers: {
      Authorization: `Bearer ${options.xim_content.access_token}`,
    },
  };

  request(opt, (error, response, body) => {
    const result = JSON.parse(body);
    const callback_option = JSON.parse(JSON.stringify(options));
    callback_option.result = {};
    if (typeof options.xim_content === 'undefined' || typeof options.xim_content === 'undefined') {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'access token undefined';
    } else if (typeof options.xim_content.uri === 'undefined') {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'uri undefined';
    } else if (result.outlets.length === 0) {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'no plugs data';
    } else {
      callback_option.xim_content.toggle = [];
      callback_option.list = [];
      Object.keys(result.outlets).forEach((key) => {
        const plug = {};
        plug.status = {};
        plug.device_name = result.outlets[key].label;
        plug.device_id = result.outlets[key].id;
        plug.toggle_support = true;
        plug.momentum_support = false;
        plug.status.mode = 'onoff';
        const toggle = {};
        toggle.device_id = result.outlets[key].id;
        if (result.outlets[key].switch === 'on') {
          plug.status.onoff = true;
          toggle.onoff = true;
        } else {
          plug.status.onoff = false;
          toggle.onoff = false;
        }
        plug.status.connected = true;
        callback_option.xim_content.toggle.push(toggle);
        callback_option.list.push(plug);
      });
      callback_option.result.err_no = 0;
      callback_option.result.err_msg = 'ok';
    }
    callback(callback_option);
  });
}

/**
 * functions exporting
 */
module.exports = discovery;
