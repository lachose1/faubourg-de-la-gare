var _ = require("underscore"),
    Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    OOS = require("../outofsight"),
    ConfirmModalView = require("./confirmModal"),
    //CategoriesView = require("./categories"),
    //ProductsView = require("./products"),
    template = require("../../dist/templates").settingsPage;

var SettingsPageView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        // categoriesPreview: "#cat-preview-table",
        // productsPreview: "#products-preview"
    },

    ui: {
        buttonSave: "#save-settings"
    },

    events: {
        "click @ui.buttonSave": "handleSaveSettings"
    },

    initialize: function(options) {
        // this.collection = options.collection;
        // this.pageType = options.pageType;
        this.validateRules = [
            {
                name: "user-name",
                type: "not-empty",
                message: "You need to set your username"
            },
            {
                name: "user-pass",
                type: "not-empty",
                message: "You need to set your password"
            }
        ];
    },

    onRender: function() {

    },

    onShow: function() {
        //console.log(this.collection);
        $("#kiosk-name").val(OOS.kioskID);
    },

    handleSaveSettings: function() {
        if(!this.validate())
            return false;

        localStorage.setItem("username", $("#user-name").val());
        localStorage.setItem("userpass", $("#user-pass").val());

        var options = {
            message: "Settings were saved",
            confirmLabel: "Ok",
            confirmCallback: _.bind(this.handleAccept, this)
        };

        OOS.modalContainer.show(new ConfirmModalView(options));
    },

    handleAccept: function() {
        location.href = window.location.hostname;
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
                if(messagePosition == "before")
                    parentEl.parentElement.insertBefore(error, parentEl);
                else
                    parentEl.appendChild(error);
                //return false; //TODO: Rewrite this, you should return false before testing all vals in the array and then show errors to user
            }
        }
        return validationPassed;
    }
});

module.exports = SettingsPageView;
