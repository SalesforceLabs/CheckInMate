/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
    invoke: function (component, event, helper) {
        const recordId = component.get('v.recordId');
        const navEvent = $A.get('e.force:navigateToSObject');
        navEvent.setParams({
            'recordId': recordId
        });
        navEvent.fire();
    }
})