/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
    validateCoordinates: function (coordinates) {
        for (let key of Object.keys(coordinates)) {
            if (coordinates[key] === null ||
                coordinates[key] === undefined ||
                coordinates[key] === '') {
                throw 'One or more coordinates are invalid. Make sure the records geolocation or address fields are not empty and the setup has been done';
            }
        }
    },
    replaceDecimalPoint: function (coordinates) {
        // standardize decimal point to a dot if it comes as comma

        const cleanedCoordinates = {
            fromLat: parseFloat(coordinates.fromLat.toString().replace(',', '.')),
            fromLong: parseFloat(coordinates.fromLong.toString().replace(',', '.')),
            toLat: parseFloat(coordinates.toLat.toString().replace(',', '.')),
            toLong: parseFloat(coordinates.toLong.toString().replace(',', '.'))
        }

        return cleanedCoordinates;
    },
    calculateDistance: function (lat1, lon1, lat2, lon2) {
        //Haversine Formula to calculate distance in kilometers between two coordinates on a sphere 'as the crow flies'

        function toRad(value) {
            return value * Math.PI / 180;
        }

        var R = 6371; // Radius of the earth in km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
})