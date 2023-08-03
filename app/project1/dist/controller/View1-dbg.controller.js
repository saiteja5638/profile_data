sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, TextArea, Log) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {

                if (!this.Create) {
                    this.Create = sap.ui.xmlfragment("project1.view.create", this);
                }
                if (!this.Create1) {
                    this.Create1 = sap.ui.xmlfragment("project1.view.multiple", this);
                }
                this.onAfterRendering()
            },
            onAfterRendering: function () {

                var oData = this.getOwnerComponent().getModel("oData");

                var oModel = new sap.ui.model.json.JSONModel()

                //oData Read method
                oData.read('/Interactions_Student', {
                    success: function (data) {

                        oModel.setData({
                            items: data.results
                        })
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })

                //Backend-using node-js

                //       oData.callFunction('/crud',{
                //         method:"GET",
                //         urlParameters:{
                //             FLAG:"V",
                //             ID:null,
                //             NAME:null,
                //             DATEOFBIRTH:null,
                //             CONTACT:null,
                //             EMAIL:null,
                //             ADDRESS:null
                //         },
                //         success:function(response)
                //         {

                //             oModel.setData({
                //                 items:JSON.parse(response.crud)
                //             })
                //         }
                //       },
                //    )

                this.getView().setModel(oModel);
            },
            onCreate: function () {
                this.Create1.open()

            },
            onCloseCreate: function () {

                this.Create1.close()
            },
            FragmentCreateSub: function () {
                var c = 0
                var oData = this.getOwnerComponent().getModel("oData");

                var id = sap.ui.getCore().byId("EmpId").getValue()
                var name = sap.ui.getCore().byId("EmpName").getValue()
                var dateofbirth = sap.ui.getCore().byId("EmpJdate").getValue()
                var contact = sap.ui.getCore().byId("EmpContact").getValue()
                var email = sap.ui.getCore().byId("EmpEmail").getValue()
                var location = sap.ui.getCore().byId("EmpRole").getValue()


                var table = this.byId("Table").getSelectedItem()

                var table_length = this.byId("Table").getItems().length


                for (var i = 0; i < table_length; i++) {

                    if (parseInt(id) == parseInt(this.byId("Table").getItems()[i].getCells()[0].getText())) {
                        c = c + 1
                    }
                }

                if (c >= 1) {
                    var selectedKey = table.getCells()[0].getProperty("text")

                    // oData.update('/Interactions_Student('+selectedKey+')',obj,{
                    //     success:function(data){

                    //         console.log(data)


                    //     },
                    //     error:function(err)
                    //     {
                    //         console.log(err)
                    //     }
                    // })

                    oData.callFunction('/crud', {
                        method: "GET",
                        urlParameters:
                        {
                            FLAG: "U",
                            ID: selectedKey,
                            NAME: name,
                            DATEOFBIRTH: dateofbirth,
                            CONTACT: contact,
                            EMAIL: email,
                            ADDRESS: location
                        },
                        success: function (response) {
                            console.log("success")
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })


                }
                else {
                    // oData.create('/Interactions_Student',obj,{
                    //     success:function(data){

                    //         console.log(data)


                    //     },
                    //     error:function(err)
                    //     {
                    //         console.log(err)
                    //     }
                    // })

                    oData.callFunction('/crud', {
                        method: "GET",
                        urlParameters: {
                            FLAG: "C",
                            ID: id,
                            NAME: name,
                            DATEOFBIRTH: dateofbirth,
                            CONTACT: contact,
                            EMAIL: email,
                            ADDRESS: location
                        },
                        success: function (response) {
                            console.log(response)

                        }
                        ,
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }

                this.Create.close()

                var iD = sap.ui.getCore().byId("EmpId").setValue("")
                var name = sap.ui.getCore().byId("EmpName").setValue("")
                var dateofbirth = sap.ui.getCore().byId("EmpJdate").setValue("")
                var contact = sap.ui.getCore().byId("EmpContact").setValue("")
                var email = sap.ui.getCore().byId("EmpEmail").setValue("")
                var location = sap.ui.getCore().byId("EmpRole").setValue("")

                window.location.reload()

            },
            onDeleteDataEmploye: function () {
                // var id = this.byId("Table").getSelectedItem()


                var empty = []

                var checkbox = this.byId("Table")


                // var table_length = this.byId("Table").getItems()



                var oData = this.getOwnerComponent().getModel("oData");


                for (var a = 0; a < checkbox.getSelectedItems().length; a++) {
                    if (checkbox.getSelectedItems()[a].getProperty("selected") === true) {
                        // var selectedKey = checkbox.getItems()[a].getCells()[1].getProperty("text")

                        var selectedKey = checkbox.getSelectedItems()[a].getCells()[0].getProperty("text")

                        var obj = {
                            ID: selectedKey
                        }

                        empty.push(obj)

                        //       oData.remove('/Interactions_Student('+selectedKey+")",{
                        //        success:function(data){

                        //            console.log(data)
                        //        },
                        //        error:function(err)
                        //        {
                        //            console.log(err)
                        //        }
                        //    })

                    }
                }



                oData.callFunction("/crud", {
                    method: "GET",
                    urlParameters: {
                        FLAG: "D",
                        Data: JSON.stringify(empty)
                    },
                    success: function () {

                        console.log("successfully deleted")

                    },
                    error: function (e) {
                        console.log(e)
                    }
                })
                oData.refresh(true);
                window.location.reload()
            },
            onUpdateDataEmployee: function () {


                var id = this.byId("Table").getSelectedItem()

                if (id) {
                    this.Create.open()

                    var ID = id.getCells()[0].getProperty("text")

                    var NAME = id.getCells()[1].getProperty("text")

                    var DATEOFBIRTH = id.getCells()[2].getProperty("text")

                    var CONTACT = id.getCells()[3].getProperty("text")

                    var EMAIL = id.getCells()[4].getProperty("text")

                    var ADDRESS = id.getCells()[5].getProperty("text")

                    sap.ui.getCore().byId("EmpId").setValue(ID)
                    sap.ui.getCore().byId("EmpName").setValue(NAME)
                    sap.ui.getCore().byId("EmpJdate").setValue(DATEOFBIRTH)
                    sap.ui.getCore().byId("EmpContact").setValue(CONTACT)
                    sap.ui.getCore().byId("EmpEmail").setValue(EMAIL)
                    sap.ui.getCore().byId("EmpRole").setValue(ADDRESS)

                }
                else {
                    alert("Please Select the row")
                }
            },
            onSearch: function (oEvent) {
                var sValue = oEvent.getParameters().newValue;

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, sValue),
                            new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.Contains, sValue),
                            new sap.ui.model.Filter("ADDRESS", sap.ui.model.FilterOperator.Contains, sValue)
                        ],
                        and: false
                    }));
                }

                var oTable = this.getView().byId("Table");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters)
            },
            Change_view: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View2");
            },
            multi_update: function () {

                var arr = []

                var id = this.byId("Table")


                for (var i = 0; i < id.getSelectedItems().length; i++) {
                    if (id.getSelectedItems()[i].getProperty("selected") === true) {
                        var obj = {
                            ID: id.getSelectedItems()[i].getCells()[0].getProperty("text"),
                            NAME: id.getSelectedItems()[i].getCells()[1].getProperty("text"),
                            DATEOFBIRTH: id.getSelectedItems()[i].getCells()[2].getProperty("text"),
                            CONTACT: id.getSelectedItems()[i].getCells()[3].getProperty("text"),
                            EMAIL: id.getSelectedItems()[i].getCells()[4].getProperty("text"),
                            ADDRESS: id.getSelectedItems()[i].getCells()[5].getProperty("text")
                        }

                        arr.push(obj)
                    }



                }

                var oGmodel = this.getOwnerComponent().getModel("ogmodel")

                oGmodel.setData({
                    items: arr
                })


                var oModel_length = oGmodel.getData().items.length
                var ogModel_item = oGmodel.getData().items

                for (var b = 0; b < oModel_length; b++) {
                    var oLabelA = new sap.m.Input({ placeholder: "input1", value: ogModel_item[b].ID });


                    var oLabelB = new sap.m.Input({ placeholder: "input2", value: ogModel_item[b].NAME });


                    //  var oLabelC = new sap.m.Input({placeholder:"input3",value:ogModel_item[b].DATEOFBIRTH});

                    var oLabelC = new sap.m.DatePicker({ value: ogModel_item[b].DATEOFBIRTH })



                    var oLabelD = new sap.m.Input({ placeholder: "input4", value: ogModel_item[b].CONTACT });


                    var oLabelE = new sap.m.Input({ placeholder: "input5", value: ogModel_item[b].EMAIL });


                    var oLabelF = new sap.m.Input({ placeholder: "input6", value: ogModel_item[b].ADDRESS });

                    var oLabelJ = new sap.m.Button({ text: "Remove", press: [this.onRemoveItem, this], type: "Reject" });
                    // var oItem = new sap.m.ColumnListItem({
                    //     cells: [oLabelA,oLabelB,oLabelC,oLabelD,oLabelE]

                    // });

                    //  var oTable = this.getView().byId("Table");
                    var oTable = sap.ui.getCore().byId("Table")
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

                this.Create1.open()
            },
            save_FragmentData: function () {
                var count = 0;
                var oData = this.getOwnerComponent().getModel("oData");

                var oGmodel = this.getOwnerComponent().getModel("ogmodel")

                var table = sap.ui.getCore().byId("Table")

                var table_length = table.getItems().length

                var total_table = Object.keys(oData.oData).length

                for (var i = 0; i < total_table; i++) {
                    for (var j = 0; j < table_length; j++) {
                        if (this.getView().byId("Table").getItems()[i].getCells()[0].getProperty("text") === table.getItems()[j].getCells()[0].getProperty("value")) {
                            count = count + 1
                        }
                    }
                }

                if (count > 0) {
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
                    }

                    oData.callFunction('/crud', {
                        method: "GET",
                        urlParameters:
                        {
                            FLAG: "U",
                            Data: JSON.stringify(empty)
                        },
                        success: function (response) {
                            console.log("successfully updated")
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
                window.location.reload()
                this.Create1.close()

            },
            addRow: function () {

                var oLabelA = new sap.m.Input({ placeholder: "ID" });


                var oLabelB = new sap.m.Input({ placeholder: "Name" });


                // var oLabelC = new sap.m.Input({placeholder:"DateOfJoining"});

                var oLabelC = new sap.m.DatePicker({})


                var oLabelD = new sap.m.Input({ placeholder: "Contact" });


                var oLabelE = new sap.m.Input({ placeholder: "Email" });


                var oLabelF = new sap.m.Input({ placeholder: "Address" });

                var oLabelJ = new sap.m.Button({ text: "Remove", press: [this.onRemoveItem, this], type: "Reject" });
                // var oItem = new sap.m.ColumnListItem({
                //     cells: [oLabelA,oLabelB,oLabelC,oLabelD,oLabelE]

                // });

                var oTable = sap.ui.getCore().byId("Table");
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
            onRemoveItem: function (oEvent) {

                var oTable = sap.ui.getCore().byId("Table")

                oTable.removeItem(oEvent.getSource().getParent());
            }

        });
    });
