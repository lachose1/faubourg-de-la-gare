var _ = require("underscore"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight"),
    //CategoriesView = require("./categories"),
    //ProductsView = require("./products"),
    template = require("../../dist/templates").homeContentView;

var HomeContentView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        categoriesPreview: "#cat-preview-table",
        productsPreview: "#products-preview"
    },

    ui: {
        //btnCategory: ".btn-category"
    },

    events: {
        //"click @ui.btnCategory": "handleCategoryClick"
    },

    initialize: function(options) {
        // this.collection = options.collection;
        // this.pageType = options.pageType;
    },

    onRender: function() {

    },

    onShow: function() {
        //console.log(this.collection);
    }
});

module.exports = HomeContentView;
