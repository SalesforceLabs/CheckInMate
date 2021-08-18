/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
    invoke: function (component, event, helper) {
        const fromLat = parseFloat(component.get('v.fromLat'));
        const fromLong = parseFloat(component.get('v.fromLong'));
        const toLat = parseFloat(component.get('v.toLat'));
        const toLong = parseFloat(component.get('v.toLong'));

        if (!(fromLat && fromLong && toLat && toLong)) throw 'One or more coordinates are null. Make sure the records geolocation or address fields are not empty and the setup has been done';

        let distance = helper.calculateDistance(fromLat, fromLong, toLat, toLong);
        distance = distance.toString();
        component.set('v.distance', distance);
    }
})