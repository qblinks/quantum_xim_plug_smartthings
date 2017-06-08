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

module.exports = {
  xim_content: {
    $isOptional: true,
    $skip: true,
  },
  xim_type: {
    $in: [
      'plug',
    ],
  },
  xim_channel: {
    $notEmptyString: true,
  },
  xim_channel_set: {
    $isPositiveIntegerOrZero: true,
    $minValue: 0,
    $maxValue: 2,
  },
  list: {
    $isOptional: true,
    $: {
      device_name: {
        $notEmptyString: true,
      },
      device_id: {
        $notEmptyString: true,
      },
      is_group: {
        $in: [
          true,
          false,
        ],
      },
      toggle_support: {
        $isOptional: true,
        $in: [
          true,
          false,
        ],
      },
      momentum_support: {
        $isOptional: true,
        $in: [
          true,
          false,
        ],
      },
      status: {
        $isOptional: true,
        icon_url: {
          $isOptional: true,
          $notEmptyString: true,
        },
        mode: {
          $in: [
            'onoff',     // regular smart plug
            'momentum',  // this plug on-then-off
            'ononly',    // this plug accepts only on command, e.g. WeMo Coffee
          ],
        },
        onoff: {
          $isOptional: true,
          $in: [
            true,
            false,
          ],
        },
        connected: {
          $isOptional: true,
          $in: [
            true,
            false,
          ],
        },
        // result of 3rd party API
        aciton_result: {
          $isOptional: true,
          $in: [
            true,
            false,
          ],
        },
      },
    },
  },
  locale: {
    $minLength: 1,
    $isOptional: true,
    $: {
      $notEmptyString: true,
    },
  },
  result: {
    $isOptional: true,
    err_no: {
      $isPositiveIntegerOrZero: true,
    },
    err_msg: {
      $isOptional: true,
    },
  },
  version: {
    $isOptional: true,
    Site: {
      $notEmptyString: true,
    },
    Region: {
      $notEmptyString: true,
    },
    FunctionName: {
      $notEmptyString: true,
    },
    LastModified: {
      $notEmptyString: true,
    },
    CodeSha256: {
      $notEmptyString: true,
    },
    id: {
      $notEmptyString: true,
    },
    message: {
      $notEmptyString: true,
    },
    author: {
      $notEmptyString: true,
    },
  },
};
