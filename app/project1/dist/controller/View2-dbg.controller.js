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

        return Controller.extend("project1.controller.View2", {
            onInit: function () {

                var oGmodel = this.getOwnerComponent().getModel("ogmodel")

                console.log(oGmodel)


                if (oGmodel.getData().items) {
                    var oModel_length = oGmodel.getData().items.length
                    var ogModel_item = oGmodel.getData().items

                    for (var b = 0; b < oModel_length; b++) {
                        var oLabelA = new sap.m.Input({ placeholder: "input1", value: ogModel_item[b].ID });


                        var oLabelB = new sap.m.Input({ placeholder: "input2", value: ogModel_item[b].NAME });


                        var oLabelC = new sap.m.Input({ placeholder: "input3", value: ogModel_item[b].DATEOFBIRTH });


                        var oLabelD = new sap.m.Input({ placeholder: "input4", value: ogModel_item[b].CONTACT });


                        var oLabelE = new sap.m.Input({ placeholder: "input5", value: ogModel_item[b].EMAIL });


                        var oLabelF = new sap.m.Input({ placeholder: "input6", value: ogModel_item[b].ADDRESS });

                        var oLabelJ = new sap.m.Button({ text: "Remove", press: [this.onRemoveItem, this], type: "Reject" });
                        // var oItem = new sap.m.ColumnListItem({
                        //     cells: [oLabelA,oLabelB,oLabelC,oLabelD,oLabelE]

                        // });

                        var oTable = this.getView().byId("Table");
                        // oTable.addItem(oItem);

                        var oNewListItem = new sap.m.ColumnListItem()

                        // Create a new input control


                        // Add the input control to the column list item
                        oNewListItem.addCell(oLabelA);
                        oNewListItem.addCell(oLabelB);
                        oNewListItem.addCell(oLabelC);
                        oNewListItem.addCell(oLabelD);
                        oNewListItem.addCell(oLabelE);
                        oNewListItem.addCell(oLabelF);
                        oNewListItem.addCell(oLabelJ);
                        // Add the column list item to the table
                        oTable.addItem(oNewListItem);
                    }

                }
            },
            navtoBAck: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View1");
            },
            addRow: function () {




                var oLabelA = new sap.m.Input({ placeholder: "input1" });


                var oLabelB = new sap.m.Input({ placeholder: "input2" });


                var oLabelC = new sap.m.Input({ placeholder: "input3" });


                var oLabelD = new sap.m.Input({ placeholder: "input4" });


                var oLabelE = new sap.m.Input({ placeholder: "input5" });


                var oLabelF = new sap.m.Input({ placeholder: "input6" });

                var oLabelJ = new sap.m.Button({ text: "Remove", press: [this.onRemoveItem, this], type: "Reject" });
                // var oItem = new sap.m.ColumnListItem({
                //     cells: [oLabelA,oLabelB,oLabelC,oLabelD,oLabelE]

                // });

                var oTable = this.getView().byId("Table");
                // oTable.addItem(oItem);

                var oNewListItem = new sap.m.ColumnListItem()

                // Create a new input control


                // Add the input control to the column list item
                oNewListItem.addCell(oLabelA);
                oNewListItem.addCell(oLabelB);
                oNewListItem.addCell(oLabelC);
                oNewListItem.addCell(oLabelD);
                oNewListItem.addCell(oLabelE);
                oNewListItem.addCell(oLabelF);
                oNewListItem.addCell(oLabelJ);
                // Add the column list item to the table
                oTable.addItem(oNewListItem);

            },
            onSubmit: function () {



                var oData = this.getOwnerComponent().getModel("oData");

                var oGmodel = this.getOwnerComponent().getModel("ogmodel")

                var table = this.getView().byId("Table")

                var table_length = table.getItems().length






                if (oGmodel.getData().items) {
                    var empty = []

                    for (var i = 0; i < table_length; i++) {
                        var obj = {
                            ID: table.getItems()[i].getCells()[0].getProperty("value"),
                            NAME: table.getItems()[i].getCells()[1].getProperty("value"),
                            DATEOFBIRTH: table.getItems()[i].getCells()[2].getProperty("value"),
                            CONTACT: table.getItems()[i].getCells()[3].getProperty("value"),
                            EMAIL: table.getItems()[i].getCells()[4].getProperty("value"),
                            ADDRESS: table.getItems()[i].getCells()[5].getProperty("value")

                        }

                        empty.push(obj)


                        // oData.callFunction('/crud',{
                        //     method:"GET",
                        //     urlParameters:
                        //     {
                        //         FLAG:"U",
                        //       ID:table.getItems()[j].getCells()[0].getProperty("value"),
                        //       NAME:table.getItems()[j].getCells()[1].getProperty("value"),
                        //       DATEOFBIRTH:table.getItems()[j].getCells()[2].getProperty("value"),
                        //       CONTACT:table.getItems()[j].getCells()[3].getProperty("value"),
                        //       EMAIL:table.getItems()[j].getCells()[4].getProperty("value"),
                        //       ADDRESS:table.getItems()[j].getCells()[5].getProperty("value")
                        //     },
                        //     success:function(response)
                        //     {
                        //         console.log("successfully updated")
                        //     },
                        //     error:function(error)
                        //     {
                        //         console.log(error)
                        //     }
                        //  })
                    }

                    oData.callFunction('/crud', {
                        method: "GET",
                        urlParameters:
                        {
                            FLAG: "U",
                            Data: JSON.stringify(empty)
                        },
                        success: function (response) {
                            console.log("successfully created")
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })

                }
                else {
                    var empty = []

                    for (var i = 0; i < table_length; i++) {
                        var obj = {
                            ID: table.getItems()[i].getCells()[0].getProperty("value"),
                            NAME: table.getItems()[i].getCells()[1].getProperty("value"),
                            DATEOFBIRTH: table.getItems()[i].getCells()[2].getProperty("value"),
                            CONTACT: table.getItems()[i].getCells()[3].getProperty("value"),
                            EMAIL: table.getItems()[i].getCells()[4].getProperty("value"),
                            ADDRESS: table.getItems()[i].getCells()[5].getProperty("value")

                        }

                        empty.push(obj)
                        //   oData.create('/Interactions_Student',obj,{
                        //     success:function(data){

                        //         console.log(data)


                        //     },
                        //     error:function(err)
                        //     {
                        //         console.log(err)
                        //     }
                        // })

                        //  oData.callFunction('/crud',{
                        //      method:"GET",
                        //      urlParameters:
                        //      {
                        //          FLAG:"C",
                        //        ID:table.getItems()[i].getCells()[0].getProperty("value"),
                        //        NAME:table.getItems()[i].getCells()[1].getProperty("value"),
                        //        DATEOFBIRTH:table.getItems()[i].getCells()[2].getProperty("value"),
                        //        CONTACT:table.getItems()[i].getCells()[3].getProperty("value"),
                        //        EMAIL:table.getItems()[i].getCells()[4].getProperty("value"),
                        //        ADDRESS:table.getItems()[i].getCells()[5].getProperty("value")
                        //      },
                        //      success:function(response)
                        //      {
                        //          console.log("successfully created")
                        //      },
                        //      error:function(error)
                        //      {
                        //          console.log(error)
                        //      }
                        //   })
                    }

                    oData.callFunction('/crud', {
                        method: "GET",
                        urlParameters:
                        {
                            FLAG: "C",
                            Data: JSON.stringify(empty)
                        },
                        success: function (response) {
                            console.log("successfully created")
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })

                }


            },
            onRemoveItem: function (oEvent) {

                var oTable = this.getView().byId("Table")

                oTable.removeItem(oEvent.getSource().getParent());
            }


        });
    });
