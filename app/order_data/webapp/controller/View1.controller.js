sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/core/util/File",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,exportLibrary, Spreadsheet, Export, ExportTypeCSV,File,MessageToast,DateFormat,MessageBox) {
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
                                    return da.indexOf(a) < 4
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
                    result.unshift("UNIQUE_ID")
                    result.unshift("PRODUCT_ID")
                  

                    var oDateFormat = DateFormat.getDateInstance({
                        pattern: "dd/MM/yyyy"
                      });

               

                    const currentDate = new Date(startDate);
                    const lastDate = new Date(endDate);
                  
                    while (currentDate <= lastDate) {
                      if (currentDate.getDay() === 1) { 
                        result.push( oDateFormat.format(new Date(currentDate)));     oDateFormat.format
                      }
                      currentDate.setDate(currentDate.getDate() + 1); 
                    }
                  
                    return result;
                  }
                  const startDate = from_date.getFrom();
                  const endDate = from_date.getTo();
                  
                  let mondaysInRange = getMondaysBetweenDates(startDate, endDate);

                  var aCols, oSettings, oSheet;

                  aCols = that.createColumnConfig(mondaysInRange);
          
                  oSettings = {
          
                    workbook: {
          
                      columns: aCols,
          
                    },
          
                    dataSource: [],
          
                    fileName: "templete.xlsx",
          
                    worker: true,
          
                  };
          
                  oSheet = new Spreadsheet(oSettings);
          
                  oSheet.build().finally(function () {
          
                    oSheet.destroy();
          
                    })

            },
            createColumnConfig: function (list) {

                var aCols = [];

                var noOfColumn = list.length;

                for (let i = 0; i < noOfColumn; i++) {

                    aCols.push({

                        property: list[i],

                    });

                }

                return aCols;

            }, //EXCEL CONVERTION FROM UPLOAD TO JSON DATA  --LIBRARYS ARE IN INDEX.HTML
            onFileSelect: function(oEvent) {
                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];
          
                if (oFile && window.FileReader) {
                  var reader = new FileReader();
          
                  reader.onload = function(e) {
                    var sData = e.target.result;
                    var oWorkbook = XLSX.read(sData, { type: "binary" });
                    var oFirstSheet = oWorkbook.SheetNames[0];
                    var oSheetData = XLSX.utils.sheet_to_json(oWorkbook.Sheets[oFirstSheet]);
          
                  function separateObjectByDate(originalObj) {
                    const result = [];
                  
                    const { PRODUCT_ID, UNIQUE_ID, ...dateMarks } = originalObj;
                  
                    for (const [date, Quantity] of Object.entries(dateMarks)) {
                      const newObj = {
                        PRODUCT_ID,
                        UNIQUE_ID,
                        date,
                        Quantity,
                      };
                      result.push(newObj);
                    }
                  
                    return result;
                  }
                 
                   let result25=[]
                   
                     oSheetData.forEach(obj=>{

                        const separatedObjects = separateObjectByDate(obj);

                        separatedObjects.forEach(a=>{
                            result25.push(a)
                        })

                     })


                    var oData = that.getOwnerComponent().getModel("oData")

    
                    var Today = new Date();
                    var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern: "dd/MM/yyyy"
                    });

                    if(!(result25.length>0))
                    {
                        MessageBox.show("Invaild File !")
                        that.byId("fileUploader").setValue("")
                    }
                    else
                    {
                        var date1 = dateFormat.format(Today)
    
                        oData.read("/ORDERS", {
                            success: function (res) {
                                const response = res.results
    
                                let data_25 =[]
        
                                for(let i=0;i<result25.length;i++)
                                {
                                    let obj={
                                        SEEDORDER:"SE000" + (response.length + i+1),
                                        PRODUCT: result25[i].PRODUCT_ID,
                                        UNIQUEID: result25[i].UNIQUE_ID,
                                        ORDERQUANTITY:result25[i].Quantity,
                                        MATERIALAVAILDATE: result25[i].date,
                                        CREADTEDDATE: date1
    
                                    }
    
                                       data_25.push(obj)  
    
                                }
                                oData.callFunction("/seed_order", {
                                    method: "GET",
                                    urlParameters: {
                                        FLAG: "O1",
                                        Data: JSON.stringify(data_25)
                                    },
                                    success: function (response) {
                                        let oModel  = new sap.ui.model.json.JSONModel()

                                        oModel.setData({
                                            items:JSON.parse(response.seed_order)
                                        })

                                        that.byId("table").setModel(oModel)
                                    },
                                    error: function (e) {
                                        MessageBox.error("Invaild file")
                                        that.byId("fileUploader").setValue("")
                                        that.byId("table").setModel(new sap.ui.model.json.JSONModel({}))
                                        console.log(e)
                                    }
                                })
                            }
                        })
                    }
                  };
          
                  reader.onerror = function() {
                    MessageToast.show("Error reading the file");
                  };
          
                  reader.readAsBinaryString(oFile);
                }
              }
        });
    });
