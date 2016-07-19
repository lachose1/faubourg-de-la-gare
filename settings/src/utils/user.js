// var Backbone = require("backbone");

// var camAPIUrl = "http://localhost/";

// Backbone.$.ajax({
//     url: camAPIUrl + "API.php?Action=POSGetData&lastupdated=" + (Date.now() / 1000).toFixed(),
//     type: 'GET',
//     crossDomain: true,
//     success : function(data){
//         console.log(data);
//     },
//     error : function (xhr, ajaxOptions, thrownError){  
//         console.log(xhr.status);          
//         console.log(thrownError);
//     } 
// });
module.exports.user = userAPI; //Equivalent au ID_POS_Seller
module.exports.vendor = vendorAPI; //Equivalent au ID_POS_Vendor