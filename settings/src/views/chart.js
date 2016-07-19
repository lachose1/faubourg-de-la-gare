var _ = require("underscore"),
    Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    Chart = require("chart.js"),
    OOS = require("../outofsight"),
    // ConfirmModalView = require("./confirmModal"),
    //CategoriesView = require("./categories"),
    //ProductsView = require("./products"),
    template = require("../../dist/templates").chart;

var ChartView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        // categoriesPreview: "#cat-preview-table",
        // productsPreview: "#products-preview"
    },

    ui: {
        // buttonSave: "#save-settings"
    },

    events: {
        // "click @ui.buttonSave": "handleSaveSettings"
    },

    initialize: function(options) {
        this.listenTo(OOS.vent, "chart:create",
                      this.createChart);
        // this.collection = options.collection;
        // this.pageType = options.pageType;
        Backbone.$.ajax({
            url: OOSUrl + "action.php?chart=1",
            type: 'GET',
            crossDomain: true,
            success : function(data){
                OOS.vent.trigger("chart:create", data);
            },
            error : function (xhr, ajaxOptions, thrownError){  
                console.log(xhr.status);          
                console.log(thrownError);
            } 
        });
    },

    onRender: function() {

    },

    onShow: function() {
        $("body").css("background-color", "white");
        //console.log(this.collection);
        // $("#kiosk-name").val(OOS.kioskID);
    },

    createChart: function(data) {
        var labels = [];
        var dataCount = [];
        var bgColor = [];
        var borderColor = [];
        data = JSON.parse(data);
        for(i = 0; i < data.length; i++) {
            // console.log(data[i]);
            labels.push(data[i].action_text);
            dataCount.push(parseInt(data[i].Count));
            bgColor.push('rgba(0, 0, 0, 0.9)');
            borderColor.push('rgba(0, 0, 0, 1)');
        }
        this.ctx = $("#myChart");
        var myChart = new Chart(this.ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: "Nombre d'éxécutions",
                    data: dataCount,
                    // barWidth: 10,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes: [{
                        // categorySpacing: 0
                        // barPercentage: 0.5
                    }]
                }
            }
        });
    }
});

module.exports = ChartView;
