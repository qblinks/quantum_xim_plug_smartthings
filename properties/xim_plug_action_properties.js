/*
 * Copyright (c) 2017
 * Qblinks Incorporated ('Qblinks').
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
  device_id: {
    $notEmptyString: true,
  },
  action: {
    onoff: {
      $isOptional: true,
      $in: [
        true,   // for the moemtum type plug, only true can trigger it
        false,
      ],
    },
    toggle: {
      $isOptional: true,
      $in: [
        true,  // for the moemtum type plug, this always triggers it
      ],
    },
    momentum: {
      $isOptional: true,
      $in: [
        true,  // for the moemtum type plug, this always triggers it
      ],
    },
  },
  locale: {
    $minLength: 1,
    $isOptional: true,
    $: {
      $notEmptyString: true,
    },
  },
};
