sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,fioriLibary,MessageToast) {
        "use strict";
        var that;
        return Controller.extend("seeduniqueorder.controller.Detail", {
            onInit: function () {
                that = this;
              
                if (!that.order) {
                    that.order = sap.ui.xmlfragment("seeduniqueorder.view.order", that);
                }

            },
            getDetail:function()
            {
                var oGmodel = that.getOwnerComponent().getModel("oGmodel")

                that.getView().byId("Table2").setModel(oGmodel)

            },
            onClose:function()
            {
                var oView = this.oView.getParent().getParent();

                oView.setLayout(fioriLibary.LayoutType.OneColumnsMidExpanded);

            },
            Characteristic_value_search:function(oEvent)
            {
                var sValue = oEvent.getParameters().newValue;

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                            
                            new sap.ui.model.Filter("CHARVAL_NUM", sap.ui.model.FilterOperator.Contains, sValue),
                            new sap.ui.model.Filter("CHAR_NUMVALDESC", sap.ui.model.FilterOperator.Contains, sValue)
                        ],
                        and: false
                    }));
                }

                var oTable = this.getView().byId("Table2");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters)
            },
            open_order_frag:function()
            {
               that.order.open()

               var oGmodel_1 = that.getOwnerComponent().getModel("oGmodel1")

               var avaii =  oGmodel_1.oData.items

               sap.ui.getCore().byId("Configurable_Product_1").setValue(avaii[0].prod)
               sap.ui.getCore().byId("UniqueType_1").setValue(avaii[0].uid)
            },
            close_order_frag:function()
            {
                that.order.close()
                sap.ui.getCore().byId("ActiveStatus_1").setValue("")
                sap.ui.getCore().byId("Date_range_1").setValue("")
            },
            Submit_order:function()
            {
                that.close_order_frag()

               var prod_name = sap.ui.getCore().byId("Configurable_Product_1").getValue()

               var Unique_id =sap.ui.getCore().byId("UniqueType_1").getValue() 

               var Order_quantity = sap.ui.getCore().byId("ActiveStatus_1").getValue()

               var Material_date = sap.ui.getCore().byId("Date_range_1").getValue()


               var Fdate = new Date();
               var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                   pattern: "dd/MM/yyyy"
               });

               var  date = dateFormat.format(Fdate)

               

               var oData = that.getOwnerComponent().getModel("oData")

               oData.read("/ORDERS",{
                success:function(response)
                {
                       var obj={
                        SEEDORDER:"SE0000"+(response.results.length+1),
                        PRODUCT:prod_name,
                        UNIQUEID:Unique_id,
                        ORDERQUANTITY:parseInt(Order_quantity),
                        MATERIALAVAILDATE:Material_date,
                        CREADTEDDATE:date
                       }
                       var sam_arr =[]

                       sam_arr.push(obj)

                    oData.callFunction("/seed_order",{
                        method:"GET",
                        urlParameters:{
                            FLAG:"O",
                            Data:JSON.stringify(sam_arr)
                        },
                        success:function()
                        {
                           console.log("Successfully Triggred")
                        },
                        err:function(e)
                        {
                            console.log(e)
                        }
                       })

                       MessageToast.show(obj.SEEDORDER+"HAS BEEN SUCCESSFULLY  CREATED")
                },
                err:function(err)
                {
                    console.log(err)
                }
               })

            },
            Search_filter:function(oEvent)
            {
                var sValue = oEvent.getParameters().newValue;

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                           
                            new sap.ui.model.Filter("CHARVAL_NUM", sap.ui.model.FilterOperator.Contains, sValue),
                            new sap.ui.model.Filter("CHAR_NUMVALDESC", sap.ui.model.FilterOperator.Contains, sValue)
                        ],
                        and: false
                    }));
                }

                var oTable = this.getView().byId("Table2");
                var oBinding = oTable.getBinding("items");

               
                    oBinding.filter(aFilters)
      
            }
        });
    });
