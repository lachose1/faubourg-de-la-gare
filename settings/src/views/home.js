var _ = require("underscore"),
    Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    // jsonfile = require('jsonfile'),
    OOS = require("../outofsight"),
    HomeContentView = require("./homeContentView"),
    OOSUrl = require("../config/oosUrl").OOSUrl,
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
        this.listenTo(OOS.vent, "action:Trigger",
                      this.newActionReceived);
        this.listenTo(OOS.vent, "action:Finished",
                      this.actionFinished);
        this.listenTo(OOS.vent, "condos:FetchedAll",
                      this.condosFetched);

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
        Backbone.$.ajax({
            url: OOSUrl + "condos.php",
            type: 'GET',
            crossDomain: true,
            success : function(data){
                OOS.vent.trigger("condos:FetchedAll", data);
            },
            error : function (xhr, ajaxOptions, thrownError){  
                console.log(xhr.status);          
                console.log(thrownError);
            } 
        });
        // alert("sup");
        //   socket2.on('readersData', function (data) {
        //     console.log(data);
        //     // socket.emit('my other event', { my: 'data' });
        //   });
        // this.sidebar.show(this.mainView);
        // this.rightContainer.show(this.rightContent);
        // this.famocoPreview.show(new FamocoPreviewView({collection: this.collection, pageType: this.pageType}));
    },

    onShow: function() {
        $(".bootstrap-toggle").bootstrapSwitch({
            'onText': 'Sold',
            'onColor': 'success',
            'offText': 'Available',
            'offColor': 'danger'
        });
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

    condosFetched: function(condos) {
        condos = JSON.parse(condos);
        condos.forEach(function(condo) {
            $( "input[name='condo-" + condo.name + "']" ).bootstrapSwitch('state', (condo.sold == 1 ? true : false));
        });
        $('.bootstrap-toggle').on('switchChange.bootstrapSwitch', function(event, state) {
            var data = {};
            data.name = this.name.match(/\d+/)[0];
            data.sold = (state ? 1 : 0);
            // console.log(data);
            // console.log(state); // true | false
            Backbone.$.ajax({
                url: OOSUrl + "condos.php",
                type: 'PUT',
                dataType: 'json',
                data: JSON.stringify(data),
                crossDomain: true,
                success : function(data){
                    console.log(data);
                    // OOS.vent.trigger("condos:FetchedAll", data);
                },
                error : function (xhr, ajaxOptions, thrownError){  
                    console.log(xhr.status);          
                    console.log(thrownError);
                } 
            });
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
