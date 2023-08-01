sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        var that;

        return Controller.extend("profileinformation.controller.View1", {
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


                oRouter.navTo("create",{
                    data:"CREATE"
                })

                var oGmodel = that.getOwnerComponent().getModel("oGmodel")

                oGmodel.setData({
                    items:"NONE"
                })
            },
            Search_profile:function(oEvent)
            {
                var sValue = oEvent.getParameters().newValue;

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                            
                            new sap.ui.model.Filter("PROFILE", sap.ui.model.FilterOperator.Contains, sValue),
                            new sap.ui.model.Filter("PRF_DESC", sap.ui.model.FilterOperator.Contains, sValue),
                            new sap.ui.model.Filter("METHOD", sap.ui.model.FilterOperator.Contains, sValue)
                           
                        ],
                        and: false
                    }));
                }

                var oTable = that.byId("table");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters)

            },
            copy_Profile:function(oEvent)
            {
                if(!that.byId("table").getSelectedItem())
                {
                    MessageToast.show("Please select the row?")
                }
                else
                {
                    const selected = that.byId("table").getSelectedItem().getBindingContext().getObject()

                    var oRouter  = this.getOwnerComponent().getRouter()
    
                    oRouter.navTo("create",{
                        data:"COPY"
                    })
    
                    var oGmodel = that.getOwnerComponent().getModel("oGmodel")
    
                    oGmodel.setData({
                        items:selected
                    })
    
                    that.select_()
                }

            },
            select_:function()
            {
                const selected = that.byId("table").getSelectedItem().getBindingContext().getObject().PROFILE

                let oData  = that.getOwnerComponent().getModel("oData")

                oData.read("/CP_STAT_PROFILE_VAL1",{
                    success:function(res)
                    {
                        let data1  = res.results.filter(item=>item.PROFILE==selected) 

                        var oGmodel1 = that.getOwnerComponent().getModel("oGmodel1")

                        oGmodel1.setData({
                            items2:data1
                        })
                    }
                })

            },
            onDelete_profile:function()
            {
                const selected_prof = that.byId("table").getSelectedItem().getBindingContext().getObject().PROFILE

                var oData = that.getOwnerComponent().getModel("oData")

                oData.callFunction("/profile",{
                    METHOD:"GET",
                    urlParameters:{
                        FLAG:"D",
                        Data:selected_prof
                           
                    },
                    success:function()
                    {
                        console.log("Deleted")
                    },
                    err:function(err)
                    {
                        console.log(err)
                    }
                })

                oData.callFunction("/profile",{
                    METHOD:"GET",
                    urlParameters:{
                        FLAG:"D1",
                        Data:selected_prof
                    },
                    success:function()
                    {
                        console.log("deleted")
                    },
                    err:function(err)
                    {
                        console.log(err)
                    }
                })

                that.onInit()
            },
            on_edit:function()
            {

                if(!that.byId("table").getSelectedItem())
                {
                    MessageToast.show("Please select the row?")
                }
                else
                {

                that.select_()

                const selected_prof1 = that.byId("table").getSelectedItem().getBindingContext().getObject()

                var oRouter  = this.getOwnerComponent().getRouter()

                oRouter.navTo("create",{
                    data:"EDIT"
                })

                let oGmodel1 = that.getOwnerComponent().getModel("oGmodel")

                oGmodel1.setData({
                    items:selected_prof1
                })
            }
            }
        });
    });
