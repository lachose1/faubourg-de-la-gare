var //$ = require("jquery"),
    Backbone = require("backbone");
// Must be set before requiring Marionette
//Backbone.$ = $;
var Marionette = require("backbone.marionette");

var oos = new Marionette.Application({
    logEvents: function(log) {
        if(log) {
            if(!this.loggingEvents) {
                oos.vent.on("all", this.logEvent);
                this.loggingEvents = true;
            }
        } else {
            oos.vent.off("all", this.logEvent);
            this.loggingEvents = false;
        }
    },

    logEvent: function(event, payload) {
        console.log(event, payload);
    }
});

oos.addRegions({
    mainContainer: "#main-container",
    modalContainer: "#modal-container",
    navbarContainer: "#navbar"
});

module.exports = oos;