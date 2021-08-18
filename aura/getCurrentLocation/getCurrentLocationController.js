/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
    invoke: function (component, event, helper) {
        const cancelToken = event.getParam('arguments').cancelToken;

        return new Promise(function (resolve, reject) {
            if (!navigator || !navigator.geolocation) {
                reject(new Error($A.get("$Label.c.ErrorBrowserSupport"))); //"Geolocation is not supported by your browser"
            }

            const geolocation = () => {
                return new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 30000,
                        maximumAge: 0
                    });
                });
            };

            geolocation()
                .then((position) => {
                    component.set('v.latitude', position.coords.latitude);
                    component.set('v.longitude', position.coords.longitude);
                    resolve();
                })
                .catch((error) => {
                    let message;

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = $A.get("$Label.c.ErrorUserDenied"); //"User denied the request for Geolocation."
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = $A.get("$Label.c.ErrorPositionUnavailable"); //"Location information is unavailable."
                            break;
                        case error.TIMEOUT:
                            message = $A.get("$Label.c.ErrorTimeout"); //"The request to get user location timed out."
                            break;
                        default:
                            message = $A.get("$Label.c.ErrorUnknown"); //"An unknown error occurred."
                    }

                    reject(new Error(message));
                });

            // Gracefully abort the Promise if it times out
            cancelToken.promise.then(function (error) {
                reject(error);
            });
        });
    }
})