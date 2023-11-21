sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
            var that;
        return Controller.extend("configtable.controller.View1", {
            onInit: function () {

                that = this;

                var oData = that.getOwnerComponent().getModel()

                oData.read("/INTERFACE_TABLE",{
                    success:function(res)
                    {
                        var oModel1 = new sap.ui.model.json.JSONModel()
                        console.log(res.results)

                        oModel1.setData({
                            items:res.results
                        })

                        that.byId("_IDGenList1").setModel(oModel1)
                    },
                    error:function(err)
                    {
                        console.log(err)
                    }
                })
                
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
            }
        });
    });
