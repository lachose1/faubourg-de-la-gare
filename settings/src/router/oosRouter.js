var Marionette = require("backbone.marionette");

var OOSRouter = Marionette.AppRouter.extend({
    appRoutes: {
    	"": "showHomePage",
    	"menu": "showActionsPage",
    	"chart": "showChartPage",
    	"settings/:password": "showSettingsPage"
    }
});

module.exports = OOSRouter;
