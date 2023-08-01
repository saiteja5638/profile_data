sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var that;

        return Controller.extend("sampleprofilepredication.controller.View1", {
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

                const selected = that.byId("table").getSelectedItem().getBindingContext().getObject()

                var obj ={
                    PROFILE:selected.PROFILE,
                    METHOD:selected.METHOD,

                }
                
                oRouter.navTo("View2",{
                    data:JSON.stringify(obj)
                   

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
                const selected = that.byId("table").getSelectedItem().getBindingContext().getObject()

                var oRouter  = this.getOwnerComponent().getRouter()

                oRouter.navTo("create")

                var oGmodel = that.getOwnerComponent().getModel("oGmodel")

                oGmodel.setData({
                    items:selected
                })

                var oSecondCont = sap.ui.controller("profileinformation.controller.View2")
            

                oSecondCont.alogo_Select(selected.METHOD)


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

                        console.log(data1)
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
                var oRouter  = this.getOwnerComponent().getRouter()

                oRouter.navTo("create")

                let oGmodel1 = that.getOwnerComponent().getModel("oGmodel")

                const selected_prof1 = that.byId("table").getSelectedItem().getBindingContext().getObject()

                oGmodel1.setData({
                    items:selected_prof1
                })
              
                let View2Cont = sap.ui.controller("profileinformation.controller.View2")

                View2Cont.alogo_Select(selected_prof1.METHOD)

                View2Cont.on_Edit_profile()

            }
        });
    });
