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
            datasource_call:function()
            {

                alert("ad")
                // var oData = that.getOwnerComponent().getModel()
                // oData.read("/INTERFACE_TABLE",{
                //     success:function(res)
                //     {
                //         res.results.forEach(item=>{
                //             if(item.SERVICE_NAME==that.getOwnerComponent().getModel("oGmodel").getData().items[0].key)
                //             {
                                 
                //                 return item.SERVICE_ID

                //             }
                //         })
                //     },
                //     error:function(error)
                //     {
                        
                //     }
                // })
            },
            dataCall:function(oEvent)
            {
                var oData = that.getOwnerComponent().getModel()

                var clickEvent = oEvent.mParameters.listItem.getTitle() 
                
                that.datasource_call()

               
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
                    oData.update("/CONFIG_INT_TAB/"+obj.SERVICE_ID+"/"+obj.INTERFACE_TYPE+"/"+da,obj,{
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

                // oData.create("/CONFIG_INT_TAB",obj,{
                //     success:function(response)
                //     {
                //         console.log(response)
                //     },
                //     error:function(error)
                //     {
                //         console.log(error)
                //     }
                // })
            }
        });
    });
