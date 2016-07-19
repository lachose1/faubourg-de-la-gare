var _ = require("underscore"),
    Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight"),
    HomeContentView = require("./homeContentView"),
    OOSUrl = require("../config/oosUrl"),
    template = require("../../dist/templates").home;

var HomeView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        // mainContainer: "#main-container"
        // sidebar: "#left-sidebar",
        // rightContainer: "#right-content"
    },

    ui: {
        // btnAction: ".action-item"
    },

    events: {
        // "click @ui.btnAction": "handleActionClick"
    },

    initialize: function(options) {
        // this.socket = io('http://localhost:4000');
        
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

        this.listenTo(OOS.vent, "action:Trigger",
                      this.newActionReceived);
        this.listenTo(OOS.vent, "action:Finished",
                      this.actionFinished);
        this.listenTo(OOS.vent, "action:FetchedAll",
                      this.actionsFetched);

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

        //   socket2.on('readersData', function (data) {
        //     console.log(data);
        //     // socket.emit('my other event', { my: 'data' });
        //   });
        // this.sidebar.show(this.mainView);
        // this.rightContainer.show(this.rightContent);
        // this.famocoPreview.show(new FamocoPreviewView({collection: this.collection, pageType: this.pageType}));
    },

    newActionReceived: function(action) {
        var action = JSON.parse(action);

        var dateReceived = new Date();
        var dateString = dateReceived.getDate() + "/" + ('0' + (dateReceived.getMonth() + 1).toString()).slice(-2) + " - " + dateReceived.toLocaleTimeString();

        $("#past-orders-list").prepend('<li class="list-group-item active-order">' + action.action_text + '<br />' + dateString + '</li>');
        setTimeout(function(){ OOS.vent.trigger("action:Finished"); }, action.duration * 1000);
    },

    actionFinished: function() {
        // $("#past-orders-list .active-order").addClass("done-order");
        $("#past-orders-list li").removeClass("active-order");
    },

    actionsFetched: function(actions) {
        actions = JSON.parse(actions);
        actions.forEach(function(action) {
            var dateReceived = new Date(action.date_added * 1000);
            var dateString = dateReceived.getDate() + "/" + ('0' + (dateReceived.getMonth() + 1).toString()).slice(-2) + " - " + dateReceived.toLocaleTimeString();

            var timeRemaining =  action.duration - ((Math.floor(new Date() / 1000.0) - action.date_added));

            var activeClass = (timeRemaining > 0) ? " active-order" : "";
            $("#past-orders-list").append('<li class="list-group-item' + activeClass + '">' + action.action_text + '<br />' + dateString + '</li>');
            if(timeRemaining > 0) {
                setTimeout(function(){ OOS.vent.trigger("action:Finished"); }, timeRemaining * 1000);
            }
        });
    }

    // handleActionClick: function(e) {
    //     // console.log(e.target.innerHTML);

    //     Backbone.$.ajax({
    //         url: OOSUrl + "action.php",
    //         type: 'POST',
    //         data: JSON.stringify({ "action_text" : e.target.innerHTML }),
    //         crossDomain: true,
    //         success : function(data){
    //             console.log(data);
    //         },
    //         error : function (xhr, ajaxOptions, thrownError){  
    //             console.log(xhr.status);          
    //             console.log(thrownError);
    //         } 
    //     });
    // }
});

module.exports = HomeView;
