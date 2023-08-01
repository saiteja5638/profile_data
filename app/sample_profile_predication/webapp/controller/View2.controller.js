sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var that;

        return Controller.extend("sampleprofilepredication.controller.View2", {
            onInit: function () {

                that=this;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("View2").attachMatched(this.getDetail, this);

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
            nav_to_create:function()
            {
                
                history.go(-1)

            },
            alogo_Select:function(data){

                let method ;
  
                if(data.length>0)
                {
                  method = data   
  
                  that.byId("options").setSelectedKey(data)
                }
                else
                {
                  method = that.byId("options").getSelectedKey();
                }
                 
                  const oModel = that.getOwnerComponent().getModel("oData");
          
                  oModel.read("/CP_STAT_METHOD_VAL1", {
          
                    success: function (data) {
          
                      const items = data.results.filter(obj=> obj.METHOD === method)
          
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
                             table2[j].setSelected(true)
                             table2[j].getCells()[4].setValue(oGmodel1.oData.items2[i].PARAM_VALUE)  
                             
                           }
                         }
                       }
                      }
                    },
                    error: function (error) {
          
                      console.log(error);
          
                    },
          
                  });
  
                },
            getDetail: function (oEvent) {

                var DataModel = this.getOwnerComponent().getModel("oData");
    
                var oArgs = oEvent.getParameter("arguments");

                DataModel.read("/CP_STAT_PROFILE_VAL1",{
                    success:function(res)
                    {
                        let vals = res.results.filter(item=> item.PROFILE==JSON.parse(oArgs.data).PROFILE)

                        
                    }
                })


    
            }
        });
    });
