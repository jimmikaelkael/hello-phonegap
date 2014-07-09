
var app = {
    // denotes whether we are within a mobile device (otherwise we're in a browser)
    iAmPhoneGap: false,
    // how long should we wait for PhoneGap to say the device is ready.
    howPatientAreWe: 3500,
    // id of the 'too_impatient' timeout
    timeoutID: null,
    // id of the 'impatience_remaining' interval reporting.
    impatienceProgressIntervalID: null,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // after 10 seconds, if we still think we're NOT phonegap, give up.
        app.timeoutID = window.setTimeout(function(appReference) {
            if (!app.iAmPhoneGap) // jeepers, this has taken too long.
                // manually trigger (fudge) the receivedEvent() method.
                appReference.receivedEvent('deviceready');
        }, this.howPatientAreWe, this);
        // keep us updated on the console about how much longer to wait.
        app.impatienceProgressIntervalID = window.setInterval(function areWeThereYet() {
                if (typeof areWeThereYet.howLongLeft == "undefined") {
                    areWeThereYet.howLongLeft = app.howPatientAreWe; // create a static variable
                }
                areWeThereYet.howLongLeft -= 1000; // not so much longer to wait.

                //console.log("areWeThereYet: Will give PhoneGap another " + areWeThereYet.howLongLeft + "ms");
            }, 1000);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.iAmPhoneGap = true; // We have a device.

        app.receivedEvent('deviceready');

        // clear the 'too_impatient' timeout .
        window.clearTimeout(app.timeoutID);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        $("#" + id).removeClass("glyphicon-refresh-animate");
        $("#" + id).remove();
        $("#btn-test").text("Tester");

        // clear the "areWeThereYet" reporting.
        window.clearInterval(app.impatienceProgressIntervalID);

        //console.log('Received Event: ' + id);
    }
};
