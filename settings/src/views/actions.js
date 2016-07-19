var _ = require("underscore"),
    Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight"),
    HomeContentView = require("./homeContentView"),
    OOSUrl = require("../config/oosUrl"),
    template = require("../../dist/templates").actions;

var HomeView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        // mainContainer: "#main-container"
        // sidebar: "#left-sidebar",
        // rightContainer: "#right-content"
    },

    ui: {
        btnAction: ".action-item"
    },

    events: {
        "click @ui.btnAction": "handleActionClick"
    },

    initialize: function(options) {
        Backbone.emulateHTTP = true;
        // this.socket = io('http://localhost:4000');
        this.audio = new Audio('assets/sounds/beep.mp3');
        this.locked = false;

        Backbone.$.ajax({
            url: OOSUrl + "action.php?limit=25",
            type: 'GET',
            crossDomain: true,
            success : function(data){
                OOS.vent.trigger("action:FetchedAll", data);
            },
            error : function (xhr, ajaxOptions, thrownError){  
                console.log(xhr.status);          
                console.log(thrownError);
            } 
        });

        this.listenTo(OOS.vent, "action:FetchedAll",
                      this.actionsFetched);
        this.listenTo(OOS.vent, "menu:Lock",
                      this.lockMenu);
        this.listenTo(OOS.vent, "menu:Unlock",
                      this.unlockMenu);
        // this.mainView = new HomeContentView();
        // switch(this.contentType){
        //     case "home":
        //         // this.rightContent = new RightContentView();
        //         break;
        //     case "about":
        //         break;
        //     default:
        //         this.rightContent = new RightContentView();
        // }
    },

    onRender: function() {
        $("body").css("background-color", "white");
        
        // this.sidebar.show(this.mainView);
        // this.rightContainer.show(this.rightContent);
        // this.famocoPreview.show(new FamocoPreviewView({collection: this.collection, pageType: this.pageType}));
    },

    handleActionClick: function(e) {
        // console.log(e.target.innerHTML);
        e.preventDefault();
        // console.log(e.target.getAttribute("duration"));
        var dataLocal = JSON.stringify({ "action_text" : e.target.innerHTML, "duration" : e.target.getAttribute("duration"), "silent": true });
        var data = JSON.stringify({ "action_text" : e.target.innerHTML, "duration" : e.target.getAttribute("duration") });
        
        OOS.vent.trigger("menu:Lock", dataLocal);
        Backbone.$.ajax({
            url: OOSUrl + "action.php",
            type: 'POST',
            data: data,
            crossDomain: true,
            success : function(data){
                // console.log(data);
                location.reload();
            },
            error : function (xhr, ajaxOptions, thrownError){  
                console.log(xhr.status);          
                console.log(thrownError);
            } 
        });

    },

    actionsFetched: function(actions) {
        actions = JSON.parse(actions);
        actions.forEach(function(action) {
            // console.log(action.id);
            var timeRemaining =  action.duration - ((Math.floor(new Date() / 1000.0) - action.date_added));
            // console.log(timeRemaining);
           if(timeRemaining > 0) {
                OOS.vent.trigger("menu:Lock", JSON.stringify(action));
                // setTimeout(function(){ OOS.vent.trigger("action:Finished"); }, timeRemaining * 1000);
            }
        });
    },

    lockMenu: function(msg) {
        // alert("lock");
        msg = JSON.parse(msg);
        // console.log(msg.action_text);
        if(this.locked)
            return;
        var lock = "<div id='lock' class=''><h1>Action en cours...<br />" + msg.action_text + "</h1></div>";
        $("body").prepend(lock);
        if(!msg.silent)
            this.playBeep();
        this.locked = true;
    },

    unlockMenu: function() {
        // alert("lock");
        // $("#lock").removeClass("fade-in-1s");
        $("#lock").addClass("fade-out-1s");
        setTimeout(function(){ $("#lock").remove(); }, 1000);
        this.playBeep();
        this.locked = false;
    },

    playBeep: function() {
        this.audio.play();
    }
});

module.exports = HomeView;






