var Backbone = require("backbone"),
    ProjectModel = require("../models/project"),
    OOSUrl = require("../config/oosUrl");

var ProjectsCollection = Backbone.Collection.extend({
    model: ProjectModel,
    url: OOSUrl + "projects.php",

    initialize: function(models, options) {
		this.url =  OOSUrl + "projects.php";
	}
});

module.exports = ProjectsCollection;