/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
    invoke: function (component, event, helper) {
        const message = component.get("v.message");
        const type = component.get("v.type");
        const duration = component.get("v.duration");
        const mode = component.get("v.mode");
        helper.showToast(type, message, duration, mode);
    }
})