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
  * Get the stat
  *
  * @param {object} options object created from xim_instance() with the additional
  *                 options added by xim_authenticate, refer to corresponding
  *                 documents for the details
  * @param {function} callback to be used by the XIM driver
  */
function stat(options, callback) {
  const opt = {
    method: 'GET',
    url: `${options.xim_content.uri}/outletStat/${options.device_id}`,
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
    } else if (typeof options.device_id === 'undefined') {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'device id undefined';
    } else if (result.length === 0) {
      callback_option.result.err_no = 999;
      callback_option.result.err_msg = 'no plugs data';
    } else {
      callback_option.xim_content.toggle = [];
      const toggle = {};
      toggle.device_id = result.id;
      if (result.switch === 'on') {
        toggle.onoff = true;
      } else {
        toggle.onoff = false;
      }
      callback_option.list = [];
      const plug = {};
      plug.status = {};
      plug.device_name = result.label;
      plug.device_id = result.id;
      plug.is_group = false;
      plug.toggle_support = true;
      plug.momentum_support = true;
      plug.status.mode = 'onoff';
      if (result.switch === 'on') {
        plug.status.onoff = true;
      } else {
        plug.status.onoff = false;
      }
      plug.status.connected = true;
      callback_option.list.push(plug);
      callback_option.xim_content.toggle.push(toggle);
      callback_option.result.err_no = 0;
      callback_option.result.err_msg = 'ok';
    }
    delete callback_option.device_id;
    callback(callback_option);
  });
}


/**
 * functions exporting
 */
module.exports = stat;
