sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,fioriLibary) {
        "use strict";
            var that;
        return Controller.extend("flexiblecolumnlayout.controller.View2", {
            onInit: function () {

                that = this;
                                
                var treeModel=[
                    {
                        text:"API",
                        selected:false,
                        node:[
                            {
                                text:"Data Manual Approval",
                                selected:false

                            }
                        ]
                    },
                    {
                        text:"Manual",
                        selected:false
                    },
                    {
                        text:"External",
                        selected:false
                    }

                ]
                var oModel=new sap.ui.model.json.JSONModel(treeModel);
                that.byId("Tree").setModel(oModel);
              
            },
            bindServ:function()
            {
                if(!that.busy){
                    that.busy = new sap.m.BusyDialog({
                        text:"Loading..."
                    })

                }

                that.busy.open()

                var oGmodel = that.getOwnerComponent().getModel("oGmodel").getData().items[0].key

                var oData = that.getOwnerComponent().getModel()

                that.byId("Tree").getItems().forEach(element => {
                    element.setSelected(false)

                });
                that.byId("Tree").expandToLevel(1);

                oData.read("/CONFIG_INT_TAB", {

                    success: function (res) {
                        var response = res.results

                        for(let i=0;i<response.length;i++)
                        {
                            if(that.getOwnerComponent().getModel("oGmodel").getData().items[0].info==response[i].SERVICE_ID)
                            {
                                if(response[i].INTERFACE_TYPE=="API")
                                {
                                    if(response[i].VALUE =="true")
                                    {
                                        that.byId("Tree").getItems()[0].setSelected(true)
                                        that.byId("Tree").expandToLevel(1);
                                        that.byId("Tree").getItems()[1].setSelected(true)
                                       
                                    }
                                    else{
                                        that.byId("Tree").getItems()[0].setSelected(true)
                                    }
                                }
                                if(response[i].INTERFACE_TYPE=="Manual") 
                                {
                                    that.byId("Tree").getItems()[2].setSelected(true)
                                }
                                if(response[i].INTERFACE_TYPE=="External")
                                {
                                    that.byId("Tree").getItems()[3].setSelected(true)
                                }
                            }
                            
                        }
                        that.busy.close()
                    }, error: function (error) {
                        console.log(error)
                    }
                })
                
            },
            handleClose:function()
            {
                var oView = this.oView.getParent().getParent();

                oView.setLayout(fioriLibary.LayoutType.OneColumn);
            },
            dataCall:function(oEvent)
            {
                
                var clickEvent = oEvent.mParameters.listItem.getTitle() 

                let obj ={
                    "SERVICE_ID": parseInt(that.getOwnerComponent().getModel("oGmodel").getData().items[0].info),
                    "INTERFACE_TYPE": clickEvent,
                    "PARAMETER":"false",
                    "VALUE":"fals"
                 }

                if(clickEvent=="Data Manual Approval" && oEvent.mParameters.listItem.getSelected())
                {
                    obj.INTERFACE_TYPE="API"
                    obj.PARAMETER ="Data Manual Approval"
                    obj.VALUE="true"
                    var da = "false"
                    that.getOwnerComponent().getModel().update("/CONFIG_INT_TAB/"+obj.SERVICE_ID+"/"+obj.INTERFACE_TYPE+"/"+da,obj,{
                        success:function(response)
                        {
                            console.log(response)

                            oData.remove("/CONFIG_INT_TAB/"+obj.SERVICE_ID+"/"+obj.INTERFACE_TYPE+"/"+da,{
                                success:function(){},
                                error:function(){}
                            })
                        },
                        error:function(error)
                        {
                            console.log(error)
                        }
                    })
                }
           
                that.getOwnerComponent().getModel().create("/CONFIG_INT_TAB",obj,{success:function(){},error:function(){}})
            }
        });
    });
