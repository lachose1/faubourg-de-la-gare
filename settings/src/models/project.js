var _ = require("underscore"),
    Backbone = require("backbone"),
    OOSUrl = require("../config/oosUrl");

var ProjectModel = Backbone.Model.extend({
    idAttribute: "id",
    url: OOSUrl + "projects.php",

    initialize: function(options) {
        this.url = OOSUrl + "projects.php";
	},
    
    destroy: function (options) {
        // return Backbone.Model.prototype.destroy.call(this, _.extend({
        //                                                         url: POSMenuUrl + 'menuCategories&id=' + this.id
        //                                                     }, options));
    }
});

module.exports = ProjectModel;