sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var that;

        return Controller.extend("treeapp.controller.View1", {
            onInit: function () {

                that =this
                 let oData = this.getOwnerComponent().getModel()

                 oData.callFunction('/tree', {
                    METHOD: 'GET',
                    urlParameters: {
                        FLAG: "R",
                        Data: null
                    },
                    success: function (response) {
                       let tree_strc1  =  JSON.parse(response.tree)


                       let oModel = new sap.ui.model.json.JSONModel()

                       oModel.setData({
                          items:tree_strc1
                       })
                       that.byId("tree").setModel(oModel) 
                    },
                    err: function (e) {
                        console.log(e)
                    }

                })
                 
            }
        });
    });
