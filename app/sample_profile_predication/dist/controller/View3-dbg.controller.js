sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var that;

        return Controller.extend("sampleprofilepredication.controller.View3", {
            onInit: function () {

                that=this;

           
                var oData = that.getOwnerComponent().getModel("oData")

                var oModel = new sap.ui.model.json.JSONModel()

                oData.read("/CP_STAT_PROFILE1",{
                    success:function(res)
                    {
                        var response  = res.results

                        oModel.setData({
                            items:response
                        })
                      
                        that.getView().byId("table").setModel(oModel)

                    }
                    ,
                    error: function (err) {
                        console.log(err)
                    }
                })

            },
            nav_to_create:function()
            {
                var oRouter  = this.getOwnerComponent().getRouter()


                oRouter.navTo("View1")

            }
        });
    });
