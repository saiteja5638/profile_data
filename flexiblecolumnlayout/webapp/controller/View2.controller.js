sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
            var that;
        return Controller.extend("flexiblecolumnlayout.controller.View2", {
            onInit: function () {

                that = this;
                
                
                
                var treeModel=[
                    {
                        text:"API",
                        node:[
                            {
                                text:"Data Manual Approval"

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
                that.byId("Tree").setModel(oModel);
            },
            getDetail:function()
            {
                var oGmodel = that.getOwnerComponent().getModel("oGmodel").getData().items[0].key
                
                that.byId("TreeId").setText(oGmodel)
            }
        });
    });
