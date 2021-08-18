import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'CheckIn_CMV__Visit__c.CheckIn_CMV__Check_in_Coordinates__Latitude__s',
    'CheckIn_CMV__Visit__c.CheckIn_CMV__Check_in_Coordinates__Longitude__s',
    'CheckIn_CMV__Visit__c.CheckIn_CMV__Check_out_Coordinates__Latitude__s',
    'CheckIn_CMV__Visit__c.CheckIn_CMV__Check_out_Coordinates__Longitude__s'
];

export default class VisitMap extends LightningElement {
    // Exposed to Admins
    @api markersTitle;
    @api listView;
    @api showFooter = false;
    @api zoomLevel;

    // Internal
    @api recordId;
    @track mapMarkers = [];

    isLoaded = false;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredVist({ error, data }) {
        if (data) {
            this.mapMarkers = [];
            const checkInMarker = {
                location: {
                    Latitude: parseFloat(data.fields.CheckIn_CMV__Check_in_Coordinates__Latitude__s.value),
                    Longitude: parseFloat(data.fields.CheckIn_CMV__Check_in_Coordinates__Longitude__s.value)
                },
                title: 'Check In',
                icon: 'utility:checkin'
            };
            const checkOutMarker = {
                location: {
                    Latitude: parseFloat(data.fields.CheckIn_CMV__Check_out_Coordinates__Latitude__s.value),
                    Longitude: parseFloat(data.fields.CheckIn_CMV__Check_out_Coordinates__Longitude__s.value)
                },
                title: 'Check Out',
                icon: 'custom:custom26'
            };

            this.mapMarkers.push(checkInMarker);
            this.mapMarkers.push(checkOutMarker);
        } else if (error) {
            this.error = error;
            this.mapMarkers = undefined;
        }
        this.isLoaded = true;
    }
}