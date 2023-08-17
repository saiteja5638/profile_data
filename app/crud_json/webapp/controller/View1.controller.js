sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("crudjson.controller.View1", {
            onInit: function () {

                // var oModel = new sap.ui.model.json.JSONModel();
                // this.getView().setModel(oModel, "data");
                
               
                // oModel.loadData("model/data.json");

                // console.log(oModel)

            },
            onCreate: function () {
                
                var odata  = this.getOwnerComponent().getModel('oData')

                // var oModel = this.getView().getModel("data");
                // var oData = oModel.getData();
                
                // let a = {
                //     "PAGEID": 3200,
                //     "DESCRIPTION": "IBP Import",
                //     "PARENTNODEID": 30,
                //     "HEIRARCHYLEVEL": 3
                //   }
              
                // oData.push(a); 
                
              
                // oModel.setData(oData) 

                // fetch("model/data.json")
                // .then(response => response.json())
                // .then(data => {
                   
                //     console.log(data);
                // })
                // .catch(error => {
                //     console.error("Error fetching JSON:", error);
                // });


                odata.callFunction('/cre',{
                    METHOD:'GET',
                    urlParameters:{
                        FLAG:"C1",
                        Data:null
                    },
                    success:function(response)
                    {
                        console.log(response.cre)
                    },
                    err:function(e)
                    {
                        console.log(e)
                    }
                
                })
              
              
            }
        });
    });
