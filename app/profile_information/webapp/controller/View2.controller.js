sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Sorter,MessageToast) {
        "use strict";

        var that;

        return Controller.extend("profileinformation.controller.View2", {
            onInit: function () {
                   
                that=this;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                oRouter.getRoute("create").attachMatched(that.alogo_Select, that);

                let oGmodel1 = that.getOwnerComponent().getModel("oGmodel")
             
                var oData = that.getOwnerComponent().getModel("oData")

                let oModel1 = new sap.ui.model.json.JSONModel()

                oData.read("/CP_STAT_METHOD1",{
                    success:function(res)
                    {
                        let response3 = res.results;
                        response3.unshift({
                            METHOD:"NONE"
                        })
                        oModel1.setData({
                            items3:response3
                        })
                        that.getView().byId("options").setModel(oModel1)
                    }
                })
            },
            back_home:function()
            {
                history.go(-1)

                that.byId("_IDGenText6").setText("Create")
   
                that.byId("_IDGenInput1").setValue("")
  
                that.byId("_IDGenInput2").setValue("")
  
                that.byId("options").setSelectedKey("")

                that.byId("_IDGenInput1").setEditable(true)

                that.byId("table2").setModel(new sap.ui.model.json.JSONModel({}))

            },
            alogo_Select:function(oEvent){


              var oGmodel = that.getOwnerComponent().getModel("oGmodel")
              
              var oArgs = oEvent.getParameter("arguments");

             
              if(oArgs.data=="CREATE")
              {
                that.alogo_Selection(false)
              }
            
              if(oArgs.data=="COPY")
              {
              
                that.byId("options").setSelectedKey(oGmodel.oData.items.METHOD)
                that.alogo_Selection(oGmodel.oData.items.METHOD)
              }
              if(oArgs.data=="EDIT")
              {
                that.on_Edit_profile()
                that.alogo_Selection(oGmodel.oData.items.METHOD )
                that.byId("options").setSelectedKey(oGmodel.oData.items.METHOD)
              }

              },
              alogo_Selection:function(data1)
              {
                let method  ;

                if(data1.length>0)
                {
                  method=data1
                }
                else
                {
                  method=that.byId("options").getSelectedKey()
                }

                const oModel = that.getOwnerComponent().getModel("oData");
        
                oModel.read("/CP_STAT_METHOD_VAL1", {
        
                  success: function (data) {
        
                    let items = data.results.filter(obj=> obj.METHOD === method)

                    items.map(obj=>{
                      return obj['DEFAULTVALUE1'] =obj.DEFAULTVALUE
                    })
           
                    const table = that.byId("table2");
        
                    const model = new sap.ui.model.json.JSONModel();
        
                    model.setData({
                        items:items
                    })

                    table.setModel(model);

                    var oGmodel1 = that.getOwnerComponent().getModel("oGmodel1")

                    if(oGmodel1.oData.items2.length>0)
                    {
       
                      var table2 = that.byId("table2").getItems()
 
 
                     for(let i=0;i<oGmodel1.oData.items2.length;i++)
                     {
                       for(let j=0;j<table2.length;j++)
                       {
                         if(oGmodel1.oData.items2[i].PARAM==table2[j].getBindingContext().getObject().PARAM)
                         {
                           table2[j].getCells()[4].setValue(oGmodel1.oData.items2[i].PARAM_VALUE)
                         }
                       }
                     }
                    }
                  },
                  error: function (error) {
        
                    console.log(error);
        
                  },
        
                })
              },
              onSave_profile:function()
              {
                  let oData  = that.getOwnerComponent().getModel("oData") 


                  if(that.byId("_IDGenText6").getText()=="EDIT")
                  {
                    alert("Edit mode")
                  }
                  
                  else{

                  oData.read("/CP_STAT_PROFILE1",{
                    success:function(res)
                    {
                        let alert_1 =0
                       for(let a=0;a<res.results.length;a++)
                       {
                         if(res.results[a].PROFILE==that.byId("_IDGenInput1").getValue())
                         {
                            alert_1=alert_1+1
                         }
                       }
                       if(alert_1>0)
                       {
                        MessageToast.show("Profile already Exists")

                       }
                       else
                       {
                        let oModel_3 = new sap.ui.model.json.JSONModel()

                        let selected_inputs = that.byId("table2").getItems()
      
                         let add2 =[]
                        let date = new Date()
                        
                        let obj={
                          PROFILE:that.byId("_IDGenInput1").getValue(),
                          PRF_DESC:that.byId("_IDGenInput2").getValue(),
                          METHOD:that.byId("options").getSelectedKey(),
                          CREATED_DATE:date
                        }
                        
                        selected_inputs.forEach(item=>{
                          let obj4 ={
                            PROFILE:that.byId("_IDGenInput1").getValue(),
                            PARAM:item.getBindingContext().getObject().PARAM,
                            PARAM_VALUE:item.getCells()[4].getValue()
                          
                          }
                        add2.push(obj4)
                      })
                       
                        if(!obj.PROFILE)
                        {
                          alert("Please enter the above details")
                        }
                        else{
                        let add =[]
      
                        add.push(obj)
      
                        console.log(add2)
      
                        oData.callFunction("/profile",{
                         METHOD:"GET",
                         urlParameters:{
                                  FLAG:"C",
                                  Data:JSON.stringify(add)
                              },
                           success:function(res)
                           {
                              MessageToast.show("Created Successfully")
                           },
                           error:function(err)
                           {
                              console.log(err)
                           }   
      
                        })
                        oData.callFunction("/profile",{
                          METHOD:"GET",
                          urlParameters:{
                              FLAG:"C1",
                              Data:JSON.stringify(add2)
                          },
                          success:function()
                          {
                              console.log("successfully created")
      
                              
                          },
                          err:function(err)
                          {
                              console.log(err)
                          }
                        })
                        window.location.reload()
                    }
                       }
                    }
                  })
                }
            },
            on_Edit_profile:function()
            {
              
              let oData = that.getOwnerComponent().getModel("oData")

               oData.read("/CP_STAT_PROFILE_VAL1",{
                success:function(response)
                {
                  let oGmodel1 = that.getOwnerComponent().getModel("oGmodel")

                  that.byId("_IDGenText6").setText("EDIT")
   
                  that.byId("_IDGenInput1").setValue(oGmodel1.oData.items.PROFILE)
                  that.byId("_IDGenInput1").setEditable(false)
    
                  that.byId("_IDGenInput2").setValue(oGmodel1.oData.items.PRF_DESC)
    
                  that.byId("options").setSelectedKey(oGmodel1.oData.items.METHOD)
    
                },
                error:function(err)
                {
                  console.log(err)
                }
               })

            }
        });
    });
