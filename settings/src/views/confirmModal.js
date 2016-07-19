var Backbone = require("backbone"),
    bbm = require("backbone.modal"),
    OOS = require("../outofsight"),
    template = require("../../dist/templates").confirm;

var ConfirmModalView = Backbone.Modal.extend({
    template: template,
    cancelEl: ".dismiss",
    submitEl: "#confirm-btn",

    initialize: function(options) {
        this.message = options.message;
        this.confirmLabel = options.confirmLabel;
        this.confirmCallback = options.confirmCallback;
    },

    submit: function() {
        this.confirmCallback.call();
    },

    serializeData: function() {
        return {
            message: this.message,
            confirmLabel: this.confirmLabel
        };
    }
});

module.exports = ConfirmModalView;
