var Backbone = require("backbone"),
    _ = require("underscore"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight"),
    //CategoriesView = require("./categories"),
    //ProductsView = require("./products"),
    OOSUrl = require("../config/oosUrl"),
    template = require("../../dist/templates").contact;

var ContactView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        // categoriesPreview: "#cat-preview-table",
        // productsPreview: "#products-preview"
    },

    ui: {
        sendButton: "#send-button"
        //btnCategory: ".btn-category"
    },

    events: {
        "click @ui.sendButton": "handleSendClick"
        //"click @ui.btnCategory": "handleCategoryClick"
    },

    initialize: function(options) {
        this.listenTo(OOS.vent, "message:Sent",
                      this.handleMessageSent);

        this.validateRules = [
            {
                name: "subject",
                type: "not-empty",
                message: "Please enter a subject"
            },
            {
                name: "message",
                type: "not-empty",
                message: "Please enter a message"
            },
            {
                name: "email",
                type: "email",
                message: "Email Invalid"
            }
        ];
    },

    onRender: function() {

    },

    onShow: function() {
        //console.log(this.collection);
    },

    handleSendClick: function(event) {
        event.preventDefault();
        if(!this.validate())
            return false;

        var formData = $("#contact-form").serialize();
        Backbone.$.ajax({
            url: OOSUrl + "contactme.php",
            type: 'POST',
            data: formData,
            crossDomain: true,
            success : function(data){
                OOS.vent.trigger("message:Sent")
            },
            error : function (xhr, ajaxOptions, thrownError){
                console.log(xhr);
                console.log(thrownError);
            }
        });

        // alert("Execute Send Script");
        // console.log(JSON.stringify($("#contact-form").serializeArray()));
        // Backbone.$.ajax({
        //     url: OOSUrl + "contactme.php",
        //     type: 'POST',
        //     data: JSON.stringify($("#contact-form").serializeArray()),
        //     contentType: "application/json",
        //     crossDomain: true,
        //     // headers: { 
        //     //       "X-HTTP-Method-Override": "DELETE" },
        //     success : function(data){
        //         // console.log("deleted");
        //     },
        //     error : function (xhr, ajaxOptions, thrownError){  
        //         console.log(xhr.status);          
        //         console.log(thrownError);
        //     } 
        // });
    },

    handleMessageSent: function() {
        $("#contact-form").addClass("fade-out-2s");
        setTimeout(
        function() {
            $("#contact-form").remove();

            var html = '<div id="message-sent" class="fade-in-1s"><h2>Message Sent!</h2><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span></div>';
            $("#contact-container").append(html);

        }, 2000);
    },

    validate: function() {
        //If no validate rules, return
        if(typeof this.validateRules === 'undefined')
            return true;

        //Global variable to check if validation has passed
        var validationPassed = true;

        //First we cleanup the old errors if there are some
        var oldErrors = document.getElementsByClassName("validation-error");
        while (oldErrors[0]) {
            oldErrors[0].parentNode.removeChild(oldErrors[0]);
        }

        //Then we test the validation rules
        for(var i in this.validateRules) {
            var isValid = true;

            if(typeof this.validateRules[i].name !== 'undefined')
                var currentEl = document.getElementsByName(this.validateRules[i].name)[0];
            else if(typeof this.validateRules[i].class !== 'undefined')
                var currentEl = document.getElementsByClassName(this.validateRules[i].class);
            else
                continue;

            var parentEl = document.getElementById(this.validateRules[i].parent) || currentEl.parentElement;
            var currentVal = currentEl.value;
            var messagePosition = this.validateRules[i].messagePosition || "after";

            var error = document.createElement("div");
            error.innerHTML = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> ' + this.validateRules[i].message;
            error.setAttribute('role', 'alert');
            error.classList.add("validation-error");

            parentEl.classList.remove("has-error");
            parentEl.classList.remove("has-feedback");

            switch(this.validateRules[i].type) {
                case "not-empty":
                    isValid = (currentVal.length > 0);
                break;
                case "email":
                    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    isValid = re.test(currentVal);
                break;
                case "count":
                    if(typeof this.validateRules[i].min !== 'undefined')
                        isValid = (currentEl.length >= this.validateRules[i].min);
                    if(typeof this.validateRules[i].max !== 'undefined')
                        isValid = (currentEl.length <= this.validateRules[i].max);
                break;
                case "different":
                    var verifiedVars = [];
                    for(var j = 0; j < currentEl.length; j++) {
                        var itemValue = currentEl[j].innerHTML;
                        if(verifiedVars.indexOf(itemValue) == -1)
                            verifiedVars.push(currentEl[j].innerHTML);
                        else {
                            isValid = false;
                            break;
                        }
                    }
                break;
                case "ajax":
                    // isValid = (currentVal.length > 5);
                    // console.log("ajax validate");
                    Backbone.$.ajax({
                        url: this.validateRules[i].url,
                        type: this.validateRules[i].ajaxType || 'POST',
                        data: currentVal,
                        crossDomain: true,
                        success : function(data){
                            console.log(data);
                        },
                        error : function (xhr, ajaxOptions, thrownError){
                            console.log(xhr.status);
                            console.log(thrownError);
                        }
                    });
                    isValid = false;
                break;
                default:
                    isValid = true;
            }

            if(!isValid){
                validationPassed = false;
                parentEl.classList.add("has-error");
                parentEl.classList.add("has-feedback");
                // if(messagePosition == "before")
                //     parentEl.parentElement.insertBefore(error, parentEl);
                // else
                //     parentEl.appendChild(error);
                //return false; //TODO: Rewrite this, you should return false before testing all vals in the array and then show errors to user
            }
        }
        return validationPassed;
    }
});

module.exports = ContactView;
