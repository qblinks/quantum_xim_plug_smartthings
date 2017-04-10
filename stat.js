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

 /**
  * Get the stat
  *
  * @param {object} options object created from xim_instance() with the additional
  *                 options added by xim_authenticate, refer to corresponding
  *                 documents for the details
  * @param {function} callback to be used by the XIM driver
  */
function stat(options, callback) {
  const callback_option = JSON.parse(JSON.stringify(options));
  // this is an empty function to be implemented or a place holder

  callback(callback_option);
}


/**
 * functions exporting
 */
module.exports = stat;
