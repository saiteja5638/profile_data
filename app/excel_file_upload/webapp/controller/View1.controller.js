sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/util/File",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/SpreadsheetExport",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/library",
    "sap/m/List",
    "sap/ui/core/Item",
    "sap/m/DisplayListItem",
    "sap/m/Button",
    "sap/ui/Device",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/base/Log",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Spreadsheet, SpreadsheetExport, File, MessageBox, MessageToast, Dialog, mobileLibrary, List, DisplayListItem,
        Button, Device, Text, Item, JSONModel, FileUtil, Filter,
        FilterOperator, Log) {
        "use strict";

        return Controller.extend("excelfileupload.controller.View1", {
            onInit: function () {

                var oDateRangeSelection = this.getView().byId("dateRangeSelection");
                var oFromDate = new Date(2023, 0, 1); 
                var oToDate = new Date(2023, 0, 15); 
                oDateRangeSelection.setDateValue(oFromDate);
                oDateRangeSelection.setSecondDateValue(oToDate);

                this.DataCall()



            },
            onSelectionFinish: function(oEvent) {
                var oTable = this.getView().byId("table")

                if(!(oTable.getBinding("items")))
                {

                   alert("Please select the above dates")
                }
                else{
                
                var selectedItems =   oEvent.getSource().getSelectedItems();

                

                var oData = this.getOwnerComponent().getModel("oData")

                var SelectedModel =  this.getOwnerComponent().getModel("oModel2")

               

                // var selectedvalues =[]

                // for(var i=0;i<selectedItems.length;i++)
                // {
                //       selectedvalues.push(selectedItems[i].getText())
                // }

                var options = this.getOwnerComponent().getModel("oModel1")
                
                // var selectedOption = options.getData().op
               
                var oTable = this.getView().byId("table");

               

                var aFilters = []
          

                for(var i=0;i<selectedItems.length;i++)
                {
                    

                    var sValue = selectedItems[i].getText();

                    if (sValue && sValue.length > 0) {
                        
                
                        var aFil= new Filter("ID", sap.ui.model.FilterOperator.EQ,sValue)
                             
                                
                       aFilters.push(aFil);
                    }
    
                    
    
                    oTable.getBinding("items").filter(aFilters);
                    
                }

            }
             


                // oData.read("/InnerJoin",{
                //     success:function(response)
                //     {
                //          var arr=  response.results

                //         const matchedData = []

                //       for(var i=0;i<arr.length;i++)
                //       {
                //         for(var j=0;j<selectedItems.length;j++)
                //         {
                //             if(arr[i].ID==selectedvalues[j])
                //             {
                //                 matchedData.push(arr[i])
                                
                //             }
                //         }
                //       }
                //       const result = [];

                //       for (const obj of matchedData) {


                //         var dateString = obj.DATE; // Assuming the date string is in the format dd/MM/yyyy

                //         var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                //             pattern: "dd/MM/yyyy"
                //         });

                //         var oDate = oDateFormat.parse(dateString);


                //             var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                //                 pattern: "dd-MM-yyyy"
                //             });
            
                //             var oParsedDate = new Date(oDate);
            
                        
                //             var oConvertedDate = oDateFormat.format(oParsedDate);

                //         const objId = obj.ID;
                //         const objiD = obj.ID;
                //         const objDate = oConvertedDate;
                //         const objMarks = obj.MARKS;
                //         const objName = obj.NAME;
                //         const objDOB =obj.DATEOFBIRTH;
                //         const objNUM = obj.CONTACT;

                //         if (!(objId in result)) {
                //           result[objId] = {};
                //         }
                //         result[objId][objDate] = objMarks;
                //         result[objId]["NAME"]=objName
                //         result[objId]["DATEOFBIRTH"]=objDOB
                //         result[objId]["CONTACT"]=objNUM;
                //         result[objId]["ID"]=objiD;
                //       }  

                    

                //     var arrrr =[]

                //     for(var a=1;a<result.length;a++)
                //     {


                //          if(result[a].ID)
                //          {
                //             var da= {
                //                 ID : result[a].ID,
                //                 NAME:result[a].NAME,
                //                 DATEOFBIRTH:result[a].DATEOFBIRTH,
                //                 CONTACT:result[a].CONTACT
                      
                //             }

                //           arrrr.push(da)

                //          }
                //          else
                //          {
                //             console.log("un vaildated")
                //          }
                //     }
                        
                //     var actual_table_data =[]

                //     for(var i=0;i<arrrr.length;i++)
                //     {
                //        const merged = Object.assign({},arrrr[i],result[i+1]);

                //       actual_table_data.push(merged)

                //     }

                //         var oModel1 = new sap.ui.model.json.JSONModel()

                //         oModel1.setProperty("/", actual_table_data);
                //         oModel1.refresh(true);
                               
                //        if(oModel1.getData()[0]) 
                //        {
                //         var objectKeys = Object.keys(oModel1.getData()[0]);

                //         var numKeys = objectKeys.length;
                //        }
                //        else
                //        {
                //         oTable.removeAllColumns();
                //        }
                   

                       

                //         if (oTable.getColumns()[0]) {

                //             oTable.removeAllColumns();

                
                //         }

                //         for (var i = 0; i < numKeys; i++) {
                //             var oColumn = new sap.m.Column("col" + Math.floor(Math.random() * 1236), {
                //                 width: "1em",
                //                 header: new sap.m.Label({
                //                     text: objectKeys[i]
                //                 })
                //             });
                //             oTable.addColumn(oColumn);
                           
                //         }

                //         var oCell = [];

                //         for (var i = 0; i < numKeys; i++) {
                //             var char = '{' + Object.keys(actual_table_data[0])[i] + '}'
                //             var cell1 = new sap.m.Text({
                //                 text: char

                //             });

                //             oCell.push(cell1);
                //         }


                //         var aColList = new sap.m.ColumnListItem("aCol" + Math.floor(Math.random() * 1236), {
                //             cells: oCell
                //         });


                //         oTable.setModel(oModel1)
                //         oTable.bindItems("/", aColList);
                //     }
                // })
              },
              OnSearch1: function (oEvent) {
                var options = this.getOwnerComponent().getModel("oModel1")
                
                var selectedOption = options.getData().op
               
                var oTable = this.getView().byId("table");

                var sValue = oEvent.getSource().getValue();

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new Filter({
                        filters: [
                            new Filter("ID", sap.ui.model.FilterOperator.EQ, sValue),
                            new Filter("NAME", sap.ui.model.FilterOperator.Contains, sValue)
                            
                        ],
                        and: false
                    }));
                }

                var first = oTable.getBinding("items").oList[0]

               
                oTable.getBinding("items").filter(aFilters);

            
            
            },
            navtoBAck: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View2");
            },

            DataCall: function () {

                var array5 = []
                var oData = this.getOwnerComponent().getModel("oData")


                var optios = new sap.ui.model.json.JSONModel()

                var oModel = this.getOwnerComponent().getModel("oModel")

                var oComboBox = this.getView().byId("_IDGenMultiComboBox1");

                oData.read('/Interactions_Student_data', {
                    success: function (response) {

                        var items = response.results
                         
                        optios.setData({
                            items:items
                        })
                        

                        for (var a = 0; a < items.length; a++) {
                            array5.push(items[a])
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
                
               
               this.getView().byId("_IDGenMultiComboBox1").setModel(optios)
               
                oModel.setData({ a: array5 })


            },

            onUpload: function (e) {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);

                // this.onDownload(e.getParameter("files") && e.getParameter("files")[0])

                // var data = e.getParameter("files") && e.getParameter("files")[0]

                // this.UploadedFile = data

            },



            onCreateColumn: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ns.BPSH_126_FILEUPLODER.view.CreateCol"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                })
            },
            onCreate: function () {
                var oTable = this.byId("table");

                var columnname = this.byId("colname").getValue()

                var columnData = this.byId("data").getValue()

                // console.log(columnData + "" + columnname)

                var oColumn1 = new sap.m.Column("col" + Math.floor(Math.random() * 1236), {
                    width: "1em",
                    header: new sap.m.Label({
                        text: columnname
                    })
                });

                oTable.addColumn(oColumn1);
                this.byId("helloDialog").close();

                // that.bindModel(aData);

                this._import(aData)

            },
            onDateRangeSelectionChange: function (oEvent) {
                var oDateRangeSelection = oEvent.getSource();


                var oStartDate = oDateRangeSelection.getFrom();
                var oEndDate = oDateRangeSelection.getTo()

                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "dd/MM/yyyy"
                });

                var oParsedDate = new Date(oStartDate);

                var oParsedDate1 = new Date(oEndDate);

                var oConvertedDate = oDateFormat.format(oParsedDate);
                var oConvertedDate1 = oDateFormat.format(oParsedDate1);

                var oModel = this.getOwnerComponent().getModel("oModel")

                var oTable = this.getView().byId("table")

                var oComboBox = this.getView().byId("mySelect");

                var oData = this.getOwnerComponent().getModel("oData")



                oData.read('/Interactions_Student_marks', {
                    success: function (response) {

                        var Results = response.results

                        var res = []

                        for (var i = 0; i < Results.length; i++) {

                            var dateString = Results[i].DATE; // Assuming the date string is in the format dd/MM/yyyy

                            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                                pattern: "dd/MM/yyyy"
                            });

                            var oDate = oDateFormat.parse(dateString);

                            

                            var obj8 = {
                                MARKS: Results[i].MARKS,
                                ID: Results[i].ID,
                                m_Date: oDate
                            }
                            res.push(obj8)
                        }

                           var filteredData = res.filter(function(item) {
                            var itemDate = item.m_Date;
                            return itemDate >=  oStartDate&& itemDate <= oEndDate;
                          });

         
                          var data_record =[]      

                          const result = {};

                          for (const obj of filteredData) {

                            var dateString = obj.m_Date; // Assuming the date string is in the format dd/MM/yyyy


                            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                                pattern: "dd-MM-yyyy"
                            });
            
                            var oParsedDate = new Date(dateString);
            
                        
                            var oConvertedDate = oDateFormat.format(oParsedDate);

                            
                            const objId = obj.ID;
                            const objDate = oConvertedDate;
                            const objMarks = parseInt(obj.MARKS);

                            if (!(objId in result)) {
                              result[objId] = {};
                            }

                            result[objId][objDate] = objMarks;
                          }     
                         var student_data = oModel.oData.a


                         for(var i=0;i<student_data.length;i++)
                         {
                            const merged = Object.assign({},student_data[i],result[i+1]);

                            data_record.push(merged)

                         }

                         var Actual_arr =[]

                         function removeMetadataFromArray(data_record) {
                            return data_record.map(obj => {
                             
                                delete obj.__metadata;
                              
                              return obj;
                            });
                          }
                          // Remove metadata from objects in the array
                          const cleanedArr = removeMetadataFromArray(data_record);
                          
                          
                        var oModel1 = new sap.ui.model.json.JSONModel()

                        oModel1.setProperty("/", cleanedArr);
                        oModel1.refresh(true);

                        var objectKeys = Object.keys(oModel1.getData()[0]);

                       var numKeys = objectKeys.length;

                        if (oTable.getColumns()[0]) {

                            oTable.removeAllColumns();

                
                        }

                        for (var i = 0; i < numKeys; i++) {
                            var oColumn = new sap.m.Column("col" + Math.floor(Math.random() * 1236), {
                                width: "1em",
                                header: new sap.m.Label({
                                    text: objectKeys[i]
                                })
                            });
                            oTable.addColumn(oColumn);
                           
                        }

                        var oCell = [];

                        for (var i = 0; i < numKeys; i++) {
                            var char = '{' + Object.keys(cleanedArr[0])[i] + '}'
                            var cell1 = new sap.m.Text({
                                text: char

                            });

                            oCell.push(cell1);
                        }


                        var aColList = new sap.m.ColumnListItem("aCol" + Math.floor(Math.random() * 1236), {
                            cells: oCell
                        });


                        oTable.setModel(oModel1)
                        oTable.bindItems("/", aColList);



                    },
                    error: function (e) {
                        console.log(e)
                    }
                })

            },
            onCloseDialog: function () {
                this.byId("helloDialog").close();
            },
            _import: function (file) {
                var that = this;

                var records = []

                var filteredRecords = {};

                var empty1 = []
                // var oModel = this.getOwnerComponent().getModel("oGModel")

                var oModel1 = new sap.ui.model.json.JSONModel()

                var oData = this.getOwnerComponent().getModel("oData");

                var oComboBox = this.getView().byId("mySelect");

                var oModel = new sap.ui.model.json.JSONModel();
                var oTable = this.getView().byId("table")
                var excelData = {};

                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(function (sheetName) {
                            // Here is your object for every sheet in workbook
                            excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);


                            // var date = XLSX.SSF.format('m/d/yyyy', excelData[0].DATE);

                        });


                        oModel.setProperty("/", excelData);
                        oModel.refresh(true);

                        var inputArr = oModel.getData()




                        // for(var i=0;i<excelData.length;i++)
                        // {
                        //     var obj={
                        //         ID:excelData[i].ID,
                        //         NAME:excelData[i].NAME,
                        //         DATEOFBIRTH:excelData[i].DATEOFBIRTH

                        //     }

                        //     empty.push(obj)




                        // }
                        // console.log(empty)

                        var objectKeys = Object.keys(oModel.getData()[0]);

                        // oData.callFunction('/stud',{

                        // method: "GET",
                        // urlParameters:
                        // {
                        //     FLAG: "C",
                        //     Data:empty
                        // },
                        // success: function (response) {
                        //     console.log("success")
                        // },
                        // error: function (error) {
                        //     console.log(error)
                        // }
                        //    })
                        for (var i = 0; i < excelData.length; i++) {
                            var obj = {
                                ID: excelData[i].ID,
                                NAME: excelData[i].NAME,
                                DATEOFBIRTH: XLSX.SSF.format('m/d/yyyy', excelData[i].DATEOFBIRTH),
                                CONTACT: excelData[i].CONTACT,
                                DATE: XLSX.SSF.format('m/d/yyyy', excelData[i].Dates)
                            }

                            records.push(obj)
                        }

                        for (var j = 0; j < excelData.length; j++) {
                            var obj2 = {
                                ID: excelData[j].ID,
                                DATE: XLSX.SSF.format('m/d/yyyy', excelData[j].Dates),
                                MARKS: excelData[j].MARKS
                            }

                            empty1.push(obj2)
                        }

                        console.log(empty1)

                        function compareObjects(obj1, obj2) {
                            // Compare the properties you want to check for equality
                            return obj1.NAME === obj2.NAME;
                        }

                        // Filter records with the same object data
                        const filteredRecord = records.filter((record, index, self) => {
                            // Find the first occurrence of the current record in the array
                            const firstOccurrence = self.findIndex(obj => compareObjects(obj, record));

                            // Return true only if the current record is the first occurrence
                            return index === firstOccurrence;
                        });






                        //   oData.callFunction("/stud_data", {
                        //     method: "GET",
                        //     urlParameters: {
                        //         FLAG: "C",
                        //         Data: JSON.stringify(empty1)
                        //     },
                        //     success: function () {

                        //         console.log("successfully Submitted")

                        //     },
                        //     error: function (e) {
                        //         console.log(e)
                        //     }
                        // })




                        // var numKeys = objectKeys.length;

                        // if (oTable.getColumns()[0]) {

                        //     oTable.removeAllColumns();

                        //     oTable.removeAllCustomData();

                        //     oComboBox.removeAllItems();

                        // }

                        // for (var i = 0; i < numKeys; i++) {
                        //     var oColumn = new sap.m.Column("col" + Math.floor(Math.random() * 1236), {
                        //         width: "1em",
                        //         header: new sap.m.Label({
                        //             text: objectKeys[i]
                        //         })
                        //     });

                        //     var oItem = new sap.ui.core.Item({
                        //         text: objectKeys[i]
                        //     })
                        //     oTable.addColumn(oColumn);
                        //     oComboBox.addItem(oItem);
                        // }

                        // var oCell = [];

                        // for (var i = 0; i < numKeys; i++) {
                        //     var char = '{' + Object.keys(excelData[0])[i] + '}'
                        //     var cell1 = new sap.m.Text({
                        //         text: char

                        //     });

                        //     oCell.push(cell1);
                        // }


                        // var aColList = new sap.m.ColumnListItem("aCol" + Math.floor(Math.random() * 1236), {
                        //     cells: oCell
                        // });
                        // oTable.setModel(oModel)
                        // oTable.bindItems("/", aColList);
                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }

                console.log(filteredRecords);

                //  oData.callFunction("/stud_data",{
                //     method: "GET",
                //     urlParameters: {
                //         FLAG: "C",
                //         Data: JSON.stringify(filteredRecords.items)
                //     },
                //     success: function () {

                //         console.log("successfully Submitted")

                //     },
                //     error: function (e) {
                //         console.log(e)
                //     }
                // })

            },

            onSelectoption: function (oevt) {

                // this.onDownloadPDF()

                var a = []
                var Optionmodel = this.getOwnerComponent().getModel("oGModel")

                var value = oevt.getParameters().selectedItem.getProperty("text")

                console.log(value)

                Optionmodel.setData({
                    items: value
                })

            },
            onDownloadPDF: function () {

                var data = sap.ui.getCore().byId("Filename1").getValue()
                var oTable = this.getView().byId("table");
                var oColumns = oTable.getColumns();
                var oItems = oTable.getItems();

                var pdfContent = "Table Content:\n\n";

                // Add table headers
                oColumns.forEach(function (oColumn) {
                    pdfContent += oColumn.mAggregations.header.getProperty("text") + "\t";
                });
                pdfContent += "\n";

                // Add table rows
                oItems.forEach(function (oItem) {
                    var oCells = oItem.getCells();
                    oCells.forEach(function (oCell) {
                        pdfContent += oCell.getText() + "\t";
                    });
                    pdfContent += "\n";
                });

                oItems.forEach(function (oItem) {
                    var oCells = oItem.getCells();
                    oCells.forEach(function (oCell) {
                        pdfContent += oCell.getText() + "\t";
                    });
                    pdfContent += "\n";
                });

                var fileName = data;
                var blob = new Blob([pdfContent], {
                    type: "application/pdf;charset=utf-8"
                });
                sap.ui.core.util.File.save(blob, fileName, "pdf", "utf-8");
                MessageToast.show("File Downloaded Successfully!");

                // var blob = new Blob([pdfContent], {
                // 	type: "application/pdf"
                // });
                // var fileName = data + ".pdf";

                // sap.ui.core.util.File.save(blob, fileName);
                // MessageToast.show("PDF Downloaded Successfully!");
                this.Filename.close()
            },

            downloadText: function () {

                var data = this.byId("Filename1").getValue()
                var oTable = this.getView().byId("table");
                var oColumns = oTable.getColumns();
                var oItems = oTable.getItems();

                var pdfContent = "Table Content:\n\n";

                // Add table headers
                oColumns.forEach(function (oColumn) {
                    pdfContent += oColumn.mAggregations.header.getProperty("text") + "\t";
                });
                pdfContent += "\n";

                // Add table rows
                oItems.forEach(function (oItem) {
                    var oCells = oItem.getCells();
                    oCells.forEach(function (oCell) {
                        pdfContent += oCell.getText() + "\t";
                    });
                    pdfContent += "\n";
                });

                oItems.forEach(function (oItem) {
                    var oCells = oItem.getCells();
                    oCells.forEach(function (oCell) {
                        pdfContent += oCell.getText() + "\t";
                    });
                    pdfContent += "\n";
                });

                var fileName = data;
                var blob = new Blob([pdfContent], {
                    type: "text/plain;charset=utf-8"
                });
                sap.ui.core.util.File.save(blob, fileName, "txt", "utf-8");
                MessageToast.show("File Downloaded Successfully!");
                this.byId("Filename").close()
            },

            OnSearch: function (oEvent) {

                var optionmodel1 = this.getOwnerComponent().getModel("oGModel")

                console.log(optionmodel1)
                var oTable = this.getView().byId("table");
                var sValue = oEvent.getSource().getValue();

                var first = oTable.getBinding("items").oList[0]

                var objectKeys1 = optionmodel1.getData().items;



                var oFilters = [
                    new sap.ui.model.Filter(objectKeys1, sap.ui.model.FilterOperator.Contains, sValue)
                ];

                oTable.getBinding("items").filter(oFilters);

            },
            createColumnConfig: function (list) {
                var Ocols = []
                var nOofCols = Object.keys(list[0]).length
                for (var i = 0; i < nOofCols; i++) {
                    Ocols.push({
                        property: Object.keys(list[0])[i]
                    })
                }
                return Ocols
            },

            oncreateFilename: function () {
                // this.Filename.open()

                if (!this.Filename) {
                    this.Filename = this.loadFragment({
                        name: "ns.BPSH_126_FILEUPLODER.view.Download"
                    });
                }
                this.Filename.then(function (oDialog) {
                    oDialog.open();
                })

            },

            onDownload: function () {

                // this.Filename.open()

                var data = sap.ui.getCore().byId("Filename1").getValue()

                var Ocols, oRowBinding, oSettings, oSheet, oTable;

                if (!this._oTable) {
                    this._oTable = this.byId('table');
                }

                oTable = this._oTable;
                oRowBinding = oTable.getBinding('items');
                var list = oRowBinding.oList
                Ocols = this.createColumnConfig(list)
                oSettings = {
                    workbook: {
                        columns: Ocols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: data + ".xlsx",
                    worker: false
                };
                var oSpreadsheet = new sap.ui.export.Spreadsheet(oSettings);
                oSpreadsheet.build();

                this.byId("Filename").close()

            },
            onclose: function () {
                // this.Filename.close()

                this.byId("Filename").close()
            },
            NavToView2: function () {
                // var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // loRouter.navTo("View2");

                this.getOwnerComponent().getRouter().navTo("View2")
            }
        });
    });
