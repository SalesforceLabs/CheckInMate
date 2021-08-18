/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { LightningElement, track, api } from "lwc";

// Import custom labels
import mapTitle from "@salesforce/label/c.MapTitle";
import markerTitle from "@salesforce/label/c.MarkerTitle";
import mapLoading from "@salesforce/label/c.MapLoading";

export default class CheckIn extends LightningElement {
    @api objectName;
    @api objectDescription;
    @api objectCity;
    @api objectCountry;
    @api objectPostalCode;
    @api objectState;
    @api objectStreet;
    @api objectIcon;

    @api userLatitude;
    @api userLongitude;

    @track mapMarkers = [];
    htmlMarkerTitle = markerTitle;
    htmlMapLoading = mapLoading;

    isLoaded = false;

    connectedCallback() {
        const locationMarker = {
            location: {
                City: this.objectCity,
                Country: this.objectCountry,
                PostalCode: this.objectPostalCode,
                State: this.objectState,
                Street: this.objectStreet
            },
            title: this.objectName,
            description: this.objectDescription,
            icon: this.objectIcon
        };
        this.mapMarkers.push(locationMarker);

        const userMarker = {
            location: {
                Latitude: this.userLatitude,
                Longitude: this.userLongitude
            },
            title: mapTitle,
            icon: 'standard:address'
        };
        this.mapMarkers.push(userMarker);

        this.isLoaded = true;
    }
}