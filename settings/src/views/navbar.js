var _ = require("underscore"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight"),
    OOSUrl = require("../config/oosUrl"),
    ConfirmModalView = require("./confirmModal"),
    template = require("../../dist/templates").navbar;

var NavbarView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        "projects": "#projects-navbar"
        // "importCSV": "#btn-menu-importcsv"
    },

    events: {        
        "mouseover #projects-navbar": "handleProductsHover",
        "mouseout #projects-navbar": "handleProductsOut"
        // "click #btn-menu-importcsv": "handleImportCSVClick",
        // "click #vendor-name": "handleVendorNameClick"
    },

    initialize: function(options) {
        this.vendorName = "";
    },

    onRender: function() {
        //this.clockContainer.show(new ClockView());
    },

    handleProductsHover: function() {
        this.showProjectsList();
    },

    handleProductsOut: function() {
        this.hideProjectsList();
    },

    showProjectsList: function() {
        // $("#projects-list").show();
        $("#projects-list").css("opacity", 1);
    },

    hideProjectsList: function() {
        setTimeout(function() { $("#projects-list").css("opacity", 0); }, 1500);
    }
});

module.exports = NavbarView;
