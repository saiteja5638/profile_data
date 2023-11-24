sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,fioriLibary) {
        "use strict";
        var that;
        return Controller.extend("flexiblecolumnlayout.controller.View1", {
            onInit: function () {
                that =this;    
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

     

            },
            handleListPress: function () {

                var oView = this.oView.getParent().getParent();

                oView.setLayout(fioriLibary.LayoutType.TwoColumnsMidExpanded);

                that.byId("Hi").setText("hih")
          
            }
        });
    });
