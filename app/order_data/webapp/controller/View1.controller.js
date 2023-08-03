sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/core/util/File"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,exportLibrary, Spreadsheet, Export, ExportTypeCSV,File) {
        "use strict";

        var that;
        var oExportType = exportLibrary.ExportType;

        return Controller.extend("orderdata.controller.View1", {
            onInit: function () {
                that = this


                if (!that.create) {

                    that.create = sap.ui.xmlfragment("orderdata.view.create", that);
                }

                if(!that.downloadTem)
                {
                    that.downloadTem = sap.ui.xmlfragment("orderdata.view.downloadtem",that)
                }



            },
            onValueHelpRequest: function (oEvent) {


                if (!this.suggestDialog) {
                    this.suggestDialog = this.loadFragment(
                        {
                            name: "orderdata.view.SelectProd"
                        }
                    )
                }

                this.suggestDialog

                    .then((dialog) => {
                        dialog.open()
                    })
                    .then(() => {
                        var oData = this.getOwnerComponent().getModel("oData")

                        var Selection_List_items = new sap.ui.model.json.JSONModel()

                        oData.read('/Options', {

                            success: async function (response) {
                                var da = response.results

                                const daa = da.filter((a) => {
                                    return da.indexOf(a) > 0
                                })
                                await Selection_List_items.setData({
                                    items: daa
                                })
                                that.byId("_IDGe").setModel(Selection_List_items)

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        })
                    })

            },
            onValueHelpRequest1: function () {

                if (!that.suggestUniq) {
                    that.suggestUniq = that.loadFragment({ name: "orderdata.view.SelectUniq" })
                }

                that.suggestUniq

                    .then((diolog) => {
                        diolog.open()
                    })

                    .then(() => {
                        if (that.create.isOpen()) {
                            var uniq_list = new sap.ui.model.json.JSONModel()

                            var oData = that.getOwnerComponent().getModel("oData")

                            var Selected1 = sap.ui.getCore().byId("Configurable_Product_1").getValue()

                            oData.read("/ORDERS", {
                                success: function (res) {
                                    var a = []
                                    res.results.forEach(element => {
                                        if (element.PRODUCT === Selected1) {
                                            a.push(element)
                                        }
                                    });

                                    uniq_list.setData({
                                        items: a
                                    })

                                    that.byId("_IDGe25bfvbfb").setModel(uniq_list)
                                },
                                error: function (err) {
                                    console.log(err)
                                }
                            })
                        }
                        else {
                            // var oModel2 =  that.getOwnerComponent().getModel("oGmodel2")

                            // that.byId("_IDGe25bfvbfb").setModel(oModel2)

                            var uniq_list1 = new sap.ui.model.json.JSONModel()

                            var oData = that.getOwnerComponent().getModel("oData")

                            var Selected = this.byId("_IDGenInput2").mProperties.value

                            oData.read("/ORDERS", {
                                success: function (res) {
                                    var a = []
                                    res.results.forEach(element => {
                                        if (element.PRODUCT === Selected) {
                                            a.push(element)
                                        }
                                    });

                                    uniq_list1.setData({
                                        items: a
                                    })

                                    that.byId("_IDGe25bfvbfb").setModel(uniq_list1)
                                },
                                error: function (err) {
                                    console.log(err)
                                }
                            })

                        }

                    })

            },
            onValueHelpDialogClose: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem");

                if (!oSelectedItem) {

                    return;

                }

                const title = oSelectedItem.getTitle();

                if (that.create.isOpen()) {
                    sap.ui.getCore().byId("Configurable_Product_1").setValue(title);

                }
                else {
                    that.byId("_IDGenInput2").setValue(title);

                }

            },
            onValueHelpDialogClose1: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem");

                if (!oSelectedItem) {

                    return;

                }
                const title = oSelectedItem.getTitle();

                if (that.create.isOpen()) {
                    sap.ui.getCore().byId("UniqueType_1").setValue(title);
                }
                else {
                    that.byId("_IDGenInput3").setValue(title);
                    //    const sValue = parseInt(title)

                    // var aFilters = []


                    //     aFilters.push(new sap.ui.model.Filter({
                    //         filters: [

                    //             new sap.ui.model.Filter("UNIQUEID", sap.ui.model.FilterOperator.EQ, sValue)

                    //         ],
                    //         and: false
                    //     }));


                    // var oTable = that.byId("table");
                    // var oBinding = oTable.getBinding("items");

                    // oBinding.filter(aFilters)
                }

            },
            Go: function () {
                var oData = that.getOwnerComponent().getModel("oData")


                var Selected = this.byId("_IDGenInput2").mProperties.value

                if(!Selected)
                {
                    alert("Please select the Product !")
                }

                let unique_id = that.byId("_IDGenInput3").getValue()


                let daterange = that.byId("dateRangeSelection")


                var oModel = new sap.ui.model.json.JSONModel()

                



                oData.read("/ORDERS", {
                    success: function (res) {


                        var data_1 = res.results.filter(element => {
                            return element.PRODUCT == Selected
                        })

                        if (unique_id) {
                            data_1 = data_1.filter(ele => {
                                return ele.UNIQUEID == unique_id
                            })
                        }
                        if (daterange.getFrom()&&daterange.getTo()) {
                            data_1 = data_1.filter(da => {
                                
                                return  new Date (da.CREADTEDDATE) >= new Date (daterange.getFrom()) &&  new Date (da.CREADTEDDATE) <= new Date(daterange.getTo())
                            })
                        }

                        oModel.setData({
                            items: data_1
                        })

                        that.byId("table").setModel(oModel)

                    },
                    error: function (err) {
                        console.log(err)
                    }
                })

            },
            onCreate: function () {
                that.create.open()

                sap.ui.getCore().byId("Configurable_Product_1").setValue("")
                sap.ui.getCore().byId("UniqueType_1").setValue("")
                sap.ui.getCore().byId("Order_quantity").setValue("")
                sap.ui.getCore().byId("Date_range_125").setValue("")
            },
            onCloseorder: function () {
                that.create.close()


            },
            onOrderSubmit: function () {


                var oData = that.getOwnerComponent().getModel("oData")

                let materialDate = sap.ui.getCore().byId("Date_range_125")

                var Today = new Date();
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "dd/MM/yyyy"
                });

                var date = dateFormat.format(Today)

                oData.read("/ORDERS", {
                    success: function (res) {
                        const response = res.results

                        const object = {
                            SEEDORDER: "SE0000" + (response.length + 1),
                            PRODUCT: sap.ui.getCore().byId("Configurable_Product_1").getValue(),
                            UNIQUEID: sap.ui.getCore().byId("UniqueType_1").getValue(),
                            ORDERQUANTITY: sap.ui.getCore().byId("Order_quantity").getValue(),
                            MATERIALAVAILDATE: materialDate.getValue(),
                            CREADTEDDATE: date
                        }
                        var array = []

                        array.push(object)

                        oData.callFunction("/seed_order", {
                            method: "GET",
                            urlParameters: {
                                FLAG: "O",
                                Data: JSON.stringify(array)
                            },
                            success: function () {
                                console.log("successfully created")
                            },
                            error: function () {
                                console.log(error)
                            }
                        })
                    }
                })

                that.create.close()
            },
            seed_search: function () {
                const sValue = that.byId("LiveSearch").getProperty("value")

                var aFilters = []


                aFilters.push(new sap.ui.model.Filter({
                    filters: [

                        new sap.ui.model.Filter("SEEDORDER", sap.ui.model.FilterOperator.Contains, sValue),
                        new sap.ui.model.Filter("SEEDORDER", sap.ui.model.FilterOperator.Contains, sValue)

                    ],
                    and: false
                }));


                var oTable = that.byId("table");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters)
            },
            reset:function()
            {
                that.byId("dateRangeSelection").setValue("")

                that.byId("_IDGenInput3").setValue("")

                this.byId("_IDGenInput2").setValue("")

                that.byId("table").setModel( new sap.ui.model.json.JSONModel({}))


            },
            open_Download_tem:function()
            {
                that.downloadTem.open()
            },
            close_Download_tem:function()
            {
                that.downloadTem.close()
            },
            download_file:function()
            {
                const from_date = sap.ui.getCore().byId("_IDGenDateRangeSelection1")

                function getMondaysBetweenDates(startDate, endDate) {
                    const result = [];
                    const currentDate = new Date(startDate);
                    const lastDate = new Date(endDate);
                  
                    while (currentDate <= lastDate) {
                      if (currentDate.getDay() === 1) { 
                        result.push(new Date(currentDate));
                      }
                      currentDate.setDate(currentDate.getDate() + 1); 
                    }
                  
                    return result;
                  }
                  const startDate = from_date.getFrom();
                  const endDate = from_date.getTo();
                  
                  const mondaysInRange = getMondaysBetweenDates(startDate, endDate);
                  console.log(mondaysInRange)

               
                  var aData = [
                    { Name: "John", Age: 30, City: "New York" },
                    { Name: "Jane", Age: 25, City: "San Francisco" },
                    { Name: "Bob", Age: 35, City: "Chicago" },
                  ];
            
                //   // Create Export instance
                //   var oExport = new Export({
                //     // Export configurations
                //     exportType: new ExportTypeCSV({
                //       separatorChar: ";", // Use ";" as separator for Excel
                //     }),
                //     rows: {
                //       path: "/",
                //     },
                //     columns: [
                //       {
                //         name: "Name",
                //         template: {
                //           content: "{Name}",
                //         },
                //       },
                //       {
                //         name: "Age",
                //         template: {
                //           content: "{Age}",
                //         },
                //       },
                //       {
                //         name: "City",
                //         template: {
                //           content: "{City}",
                //         },
                //       },
                //     ],
                //   });
            
                //   // Set the data using JSONModel
                //   var oModel = new  sap.ui.model.json.JSONModel();
                //   oModel.setData(aData);
                //   oExport.setModel(oModel);
            
                //   // Define the export type
                 
            
                //   // Perform the export
                //   oExport.saveFile("MyExcelData").catch(function (error) {
                //     console.error("Error while exporting data: ", error);
                //   });

                var sCSVContent = this.convertToCSV(aData);

                // Download the CSV file
                this.downloadCSVFile(sCSVContent, "MyCSVData.csv");

            },
            convertToCSV: function (aData) {
                var sCSV = "Name,Age,City\n"; // CSV header
          
                // Convert data to CSV rows
                aData.forEach(function (oEntry) {
                  sCSV += oEntry.Name + "," + oEntry.Age + "," + oEntry.City + "\n";
                });
          
                return sCSV;
              },
          
              downloadCSVFile: function (sContent, sFileName) {
                var blob = new Blob([sContent], { type: "text/csv;charset=utf-8;" });
                File.save(blob, sFileName);
              }

        });
    });
