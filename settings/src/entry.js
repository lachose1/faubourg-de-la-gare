var _ = require("underscore"),
    // server = require('http').createServer(app),
    // io = require("socket.io")(server),
    Backbone = require("backbone"),
    OOS = require("./outofsight"),
    // Controllers
    OOSController = require("./controllers/oosController"),
    // Routers
    OOSRouter = require("./router/oosRouter");

OOS.addInitializer(function() {
    window.OOS = this;
});

// Controllers initializers
OOS.addInitializer(function() {
    var oosController = new OOSController();
    OOS.oosController = oosController;
    OOS.oosController.start();
});

// Router initializers
OOS.addInitializer(function() {
    var oosRouter = new OOSRouter({
        controller: OOS.oosController
    });

    OOS.oosRouter = oosRouter;
});

// Using on start ensure that history is started only after router and
// controllers are set
OOS.on("start", function() {
    if(Backbone.history) {
        Backbone.history.start();
    }
});

OOS.start();

// io.on('connection', function(){ console.log("connection"); });
// server.listen(3000);