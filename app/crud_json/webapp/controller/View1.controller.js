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

            },
            onCreate: function () {
                
                var odata  = this.getOwnerComponent().getModel('oData')

                odata.callFunction('/cre',{
                    METHOD:'GET',
                    urlParameters:{
                        FLAG:"U",
                        Data:null
                    },
                    success:function()
                    {
                        console.log('suceess')
                    },
                    err:function(e)
                    {
                        console.log(e)
                    }
                
                })
              
              
            }
        });
    });
