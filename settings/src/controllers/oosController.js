var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight.js"),
    OOSHomepageUrl = require("../config/oosUrl").OOSHomepageUrl,
    // Collections
    ProjectsCollection = require("../collections/projects"),
    // Views
    NavbarView = require("../views/navbar"),
    HomeView = require("../views/home"),
    ProjectsView = require("../views/projects"),
    ContactView = require("../views/contact"),
    ActionsView = require("../views/actions"),
    ChartView = require("../views/chart"),
    SettingsPageView = require("../views/settingsPage");
    // Models
    // ProjectModel = require("../models/project");
    // Utils
    

var OOSController = Marionette.Controller.extend({
    initialize: function() {
        OOS.username = localStorage.getItem('username');
        OOS.userpass = localStorage.getItem('userpass');

        //EmulateHTTP to ensure it's going to work with the API
    },

    start: function() {
        if(OOS.username != "faubourgbourg") {
            // alert("Settings incorrect, please contact an administrator.")
            return;
        }
        if(OOS.userpass != "-thisisnotasecurepassword*") {
            // alert("Settings incorrect, please contact an administrator.")
            return;
        }
        this.showNavbar();

        // Initialize current user
        // this.currentUser = new UserModel({"user": User.user});
        // this.currentUser.fetch({
        //     success: function(model) { // the fetched model!
        //         OOS.vent.trigger("user:Fetched", model);
        //     }
        // });
    },

    showNavbar: function() {
        OOS.navbarContainer.show(new NavbarView({

        }));
    },

    showHomePage: function() {
        if(OOS.username != "faubourgbourg") {
            alert("Settings incorrect, please contact an administrator.")
            return;
        }
        if(OOS.userpass != "-thisisnotasecurepassword*") {
            alert("Settings incorrect, please contact an administrator.")
            return;
        }
        // this.categories = new CategoriesCollection([], { "user": User.user });

        // POSMenu.vent.trigger("menu:FocusCategories", this.model);
        OOS.mainContainer.show(new HomeView({
            contentType: "home"
        }));

        // this.categories.fetch({
        //     success: function(collection) { // the fetched collection!
        //         if (collection.length == 4) {
        //             POSMenu.vent.trigger("category:MaxReached");
        //         }
        //     }
        // });
    },

    showActionsPage: function() {
        if(OOS.secretKey != "secondsecretlivestream") {
            alert("Settings incorrect, please contact an administrator.")
            return;
        }
        // alert("MENU");
        OOS.mainContainer.show(new ActionsView({
            
        }));
    },

    showLogoutPage: function() {
        localStorage.clear();
        location.href = OOSHomepageUrl;
    },

    showChartPage: function() {
        if(OOS.secretKey != "secondsecretlivestream") {
            alert("Settings incorrect, please contact an administrator.")
            return;
        }
        // alert("MENU");
        OOS.mainContainer.show(new ChartView({
            
        }));
    },

    showSettingsPage: function(password) {
        if(password != "systemlogin")
            return;
        else {
            OOS.mainContainer.show(new SettingsPageView({
            }));
        }
    },

    showAboutPage: function() {
        OOS.mainContainer.show(new HomeView({
            contentType: "home"
        }));
    },

    showContactPage: function() {
        // OOS.mainContainer.$el.addClass("fade-out-2s");
        OOS.mainContainer.show(new ContactView({
            
        }));
    },

    showProjectsPage: function() {
        this.projects = new ProjectsCollection([], {});
        // OOS.mainContainer.$el.addClass("fade-out-2s");
        OOS.mainContainer.show(new ProjectsView({
            collection: this.projects
            // contentType: "home"
        }));

        this.projects.fetch({
            success: function(collection) { // the fetched collection!
                // if (collection.length == 4) {
                //     POSMenu.vent.trigger("category:MaxReached");
                // }
            }
        });
    }
});

module.exports = OOSController;
