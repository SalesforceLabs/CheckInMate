/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
    invoke: function (component, event, helper) {
        const coordinates = {
            fromLat: component.get('v.fromLat'),
            fromLong: component.get('v.fromLong'),
            toLat: component.get('v.toLat'),
            toLong: component.get('v.toLong')
        };

        helper.validateCoordinates(coordinates);

        const { fromLat, fromLong, toLat, toLong } = helper.replaceDecimalPoint(coordinates);

        let distance = helper.calculateDistance(fromLat, fromLong, toLat, toLong);

        component.set('v.distance', distance);
    }
})