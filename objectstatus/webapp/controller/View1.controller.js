sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("objectstatus.controller.View1", {
            onInit: function () {
                var jsonData = {
                    status: "Success",
                    text: "Object Status Text"
                };
    
     
    
                // Create a JSON model and set the data
                var oModel = new sap.ui.model.json.JSONModel({
                    statuses: jsonData
                });
                this.getView().setModel(oModel, "yourModelName");
            
            }
        });
    });
