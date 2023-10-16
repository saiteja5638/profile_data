sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/base/Log",
    "sap/m/ColumnListItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, TextArea, Log, ColumnListItem) {
        "use strict";

        return Controller.extend("excelfileupload.controller.View2", {
            onInit: function () {

              var  oData = this.getOwnerComponent().getModel("oData")


              var oModel22 = new sap.ui.model.json.JSONModel();

              var oModel23 = new sap.ui.model.json.JSONModel();
              var new1 =[]
              oData.read('/OuterJoin',{
                success:function(response)
                {
                    var filteredData=response.results


                    const res = {};

                      for (const obj of filteredData) {


                          const objName = obj.NAME.toString();

                          const objDate = obj.DATE;

                          const objMarks = parseInt(obj.MARKS);

                          if (!(objDate in res)) {

                              res[objDate] = {};

                          }
                          res[objDate][objName] = objMarks;
                          res[objDate]["Date"] = objDate;

                      }
                  

                    for(var i=0;i<Object.keys(res).length;i++)
                    {
                        new1.push(res[Object.keys(res)[i]])
                    }

                    console.log(new1)

                    const combined = {};
                    const counts = {};
    
                    for (const obj of filteredData) {
                        const { NAME, MARKS } = obj;
                        if (combined[NAME]) {
                            combined[NAME] += MARKS;
                            counts[NAME]++;
                        } else {
                            combined[NAME] = MARKS;
                            counts[NAME] = 1;
                        }
                    }
    
                    const averages = {};
    
                    for (const NAME in combined) {
                        averages[NAME] = combined[NAME] / counts[NAME];
                    }
    
                    function floorObjectValues(obj) {
                        for (var key in obj) {
                          if (typeof obj[key] === 'number') {
                            obj[key] = Math.floor(obj[key]);
                          }
                        }
                      }
                      floorObjectValues(averages)

                      var Array_2 =[]

                      Array_2.push(averages)

                    

                      oModel22.setData({
                        items: new1
                    })

                    oModel23.setData({
                        items:Array_2
                    })

                  
                    
                }
              })

                var oVizFrame = this.getView().byId("Chart1");
                oVizFrame.setModel(oModel22);
                var oVizFrame = this.getView().byId("Chart2");
                oVizFrame.setModel(oModel23);
             
              
            },
            navtoBAck: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View1");
            },
     


        });
    });
