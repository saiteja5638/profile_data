sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var that;
        return Controller.extend("vcconfigurable.controller.View1", {
            onInit: function () {

                that = this;
                
                var treeModel=[
                    {
                        text:"API",
                        node:[
                            {
                                text:"Manual"

                            }
                        ]
                    },
                    {
                        text:"Manual",
                    },
                    {
                        text:"External"
                    }

                ]
                var oModel=new sap.ui.model.json.JSONModel(treeModel);
                this.getView().setModel(oModel);
            }

        });
    });
