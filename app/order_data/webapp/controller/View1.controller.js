sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/core/util/File",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,exportLibrary, Spreadsheet, Export, ExportTypeCSV,File,MessageToast,DateFormat,Filter,FilterOperator,MessageBox) {
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

                if(!that.uploadstatus)
                {
                    that.uploadstatus = sap.ui.xmlfragment("orderdata.view.uploadstatus",that)
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

                            oData.read("/Unique_ID_Header1", {
                                success: function (res) {
                                    var a = []
                                    res.results.forEach(element => {
                                        if (element.PRODUCT_ID === Selected1) {                                           
                                            a.push(element)
                                        }
                                    })
                                    uniq_list.setData({
                                        items:a
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

                            oData.read("/Unique_ID_Header1", {
                                success: function (res) {
                                    var a = []
                                    res.results.forEach(element => {
                                        if (element.PRODUCT_ID === Selected) {
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

                let unique_id = that.byId("_IDGenInput3").getValue()


                let daterange = that.byId("dateRangeSelection")


                var oModel = new sap.ui.model.json.JSONModel()

                if(!(Selected && unique_id))
                {
                    alert("Please select the Product !")
                }
                else
                {
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
                }



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

                let materialDate = sap.ui.getCore().byId("Date_range_125").getValue()

                let order_qun = sap.ui.getCore().byId("Order_quantity").getValue()

                let prod = sap.ui.getCore().byId("Configurable_Product_1").getValue()
                
                let unid = sap.ui.getCore().byId("UniqueType_1").getValue()

                if((materialDate==""||order_qun==""||prod==""||unid==""))
                {
                    alert("Please fill the inputs !")
                }
                else

                {
                    

                    var Today =new Date().toLocaleDateString();
                
    
                    oData.read("/ORDERS", {
                        success: function (res) {
                            const response = res.results
    
                            const object = {
                                SEEDORDER: "SE000" + (response.length + 1),
                                PRODUCT: sap.ui.getCore().byId("Configurable_Product_1").getValue(),
                                UNIQUEID: sap.ui.getCore().byId("UniqueType_1").getValue(),
                                ORDERQUANTITY: sap.ui.getCore().byId("Order_quantity").getValue(),
                                MATERIALAVAILDATE: materialDate,
                                CREADTEDDATE: Today
                            }
                            var array = []
    
                            array.push(object)
    
                            oData.callFunction("/seed_order", {
                                method: "GET",
                                urlParameters: {
                                    FLAG: "O",
                                    Data: JSON.stringify(array)
                                },
                                success: function (response) {
                                    MessageToast.show(response.seed_order)
                                },
                                error: function (error) {
                                    console.log(error)
    
                                    MessageToast.show( "PRODUCT:"+ object.PRODUCT +"   UNIQUEID"+ object.UNIQUEID +"is not available ")
                                }
                            })
                        }
                    })
    
                    that.create.close()
                }
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

                that.byId("fileUploader").setValue("")


            },
            open_Download_tem:function()
            {
                that.downloadTem.open()
            },
            close_Download_tem:function()
            {
                that.downloadTem.close()

                sap.ui.getCore().byId("_IDGenDateRangeSelection1").setValue("")
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

                  if(startDate && endDate)
                  {
                    oSheet.build().finally(function () {
          
                        oSheet.destroy();
              
                        })
                        that.downloadTem.close()
                  }
                  else
                  {
                    MessageToast.show("Please set the date range !")
                  }
            },
            createColumnConfig: function (list) {

                var aCols = [];

                var noOfColumn = list.length;

                for (let i = 0; i < noOfColumn; i++) {

                   if(list[i]=='PRODUCT_ID')
                   {
                    aCols.push({

                        property: list[i],

                    });
                   }
                   else
                   {
                    aCols.push({

                        property: list[i],
                        type:"number"  
                    });
                   }
                }

                return aCols;

            }, //EXCEL CONVERTION FROM UPLOAD TO JSON DATA  --LIBRARYS ARE IN INDEX.HTML
            onFileSelect: function(oEvent) {
                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];
          
                if (oFile && window.FileReader && (oFile.name).split(".")[1]=="xlsx") {
                  var reader = new FileReader();
          
                  reader.onload = function(e) {
                    var sData = e.target.result;
                    var oWorkbook = XLSX.read(sData, { type: "binary" });
                    var oFirstSheet = oWorkbook.SheetNames[0];
                    var oSheetData = XLSX.utils.sheet_to_json(oWorkbook.Sheets[oFirstSheet]);

                    var alldata = XLSX.utils.sheet_to_json(oWorkbook.Sheets[oFirstSheet],{header:1})[0]

                    oSheetData.forEach(sheet=>{
                        if(Object.keys(sheet).length == alldata.length)
                        {
                                          
                        }
                        else
                        {
                            alldata.forEach(date=>{
                                if(!Object.keys(sheet).includes(date))
                                {
                                    sheet[date] = "null" 
                                }
                            })
                        }
                    }) 
                      const data = [];

                      let dub =[]

                      oSheetData.forEach(obj => {

                          if (!(dub.includes(obj.UNIQUE_ID))) {

                              data.push(obj)

                          }
                          dub.push(obj.UNIQUE_ID);
                      })

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

                   data.forEach(obj=>{

                        const separatedObjects = separateObjectByDate(obj);

                        separatedObjects.forEach(a=>{
 
                                    result25.push(a)

                         })
                        })
                    var oData = that.getOwnerComponent().getModel("oData")

    
                    var Today = new Date().toLocaleDateString();
               
                    if(!(result25.length>0))
                    {
                        MessageBox.show("There is no Data in File")
                        that.byId("fileUploader").setValue("")
                    }
                    else
                    {
                                let data_25 =[]
        
                                for(let i=0;i<result25.length;i++)
                                {
                                    
                                        let obj={
                                            PRODUCT: (result25[i].PRODUCT_ID).trim(),
                                            UNIQUEID: result25[i].UNIQUE_ID,
                                            ORDERQUANTITY:result25[i].Quantity,
                                            MATERIALAVAILDATE: result25[i].date,
                                            CREADTEDDATE: Today
        
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
                                        if(JSON.parse(response.seed_order).length>0)
                                        {
                                           that.err_display_frag(JSON.parse(response.seed_order))
                                        }
                                        else
                                        {
                                            MessageToast.show("Successfully Uploaded ")
                                            that.byId("fileUploader").setValue("")
                                        }
                                         
                                    },
                                    error: function (e) {
                                        MessageBox.error("Invaild file")
                                        that.byId("fileUploader").setValue("")
                                        that.byId("table").setModel(new sap.ui.model.json.JSONModel({}))
                                        console.log(e)
                                    }
                                })
                        
                    }
                  };
          
                  reader.onerror = function() {
                    MessageToast.show("Error reading the file");
                  };
          
                  reader.readAsBinaryString(oFile);
                }
                else
                {
                    MessageBox.error("Upload a vaild document")
                    that.byId("fileUploader").setValue("")
                }
              },
              open_upstatus:function()
              {
                 that.uploadstatus.open()
              },
              close_upstatus:function()
              {
                that.uploadstatus.close()
              },
              err_display_frag:function(data)
              {
                that.uploadstatus.open()
             var oTable = sap.ui.getCore().byId("_IDGenTable1")

                var oModel1 = new sap.ui.model.json.JSONModel()

                oModel1.setProperty("/", data);
                oModel1.refresh(true);

                var objectKeys = (Object.keys(oModel1.getData()[0])).sort();

                  for(let i=0;i<4;i++)
                  {
                    objectKeys.pop()
                  }
                  
                 objectKeys.unshift("UNIQUEID") 

                 objectKeys.unshift('PRODUCT')

                 objectKeys.push("vaild_type")

                 objectKeys.push('err_type')

               var numKeys = objectKeys.length;

                 if (oTable.getColumns()[0]) {

                    oTable.removeAllColumns();

                 }

                 for (var i = 0; i < numKeys; i++) {
                     var oColumn = new sap.m.Column("col" + Math.floor(Math.random() * 123696856), {
                         width: "1em",
                         hAlign:"Center",
                         header: new sap.m.Label({
                             text: objectKeys[i],
                             
                       })
                     });
                    oTable.addColumn(oColumn);
                   
                }
                var oCell = [];

                 for (var i = 0; i < numKeys; i++) {
                    
                    let data25 = objectKeys[i];
                    var char = '{' + data25 + '}'
                    var cell1 = new sap.m.Text({
                        text: char
                     });

                    oCell.push(cell1);
                }
                 var aColList = new sap.m.ColumnListItem("aCol" + Math.floor(Math.random() * 123696857554), {
                     cells: oCell
               });

                oTable.setModel(oModel1)
                 oTable.bindItems("/", aColList);

                  that.err_targ_pointer()     
              },
              applySearchFilter: function () {

                that.err_targ_pointer_rem()
                let sSearchTerm =  sap.ui.getCore().byId("_IDGenComboBox1m").getSelectedKey()
                
                var oTable = sap.ui.getCore().byId("_IDGenTable1")
                var oBinding = oTable.getBinding("items");

                if(sSearchTerm == "vaild")
                {
                    sap.ui.getCore().byId("_IDGenComboBox1mv").setVisible(false)
                }
                else
                {
                    sap.ui.getCore().byId("_IDGenComboBox1mv").setVisible(true)
                }

                if(sSearchTerm=="All")
                {
                    let aFilters =  new sap.ui.model.Filter("vaild_type",  sap.ui.model.FilterOperator.Contains, "")  
                    oBinding.filter(aFilters);  
                }
                else
                {
                    let aFilters =  new sap.ui.model.Filter("vaild_type",  sap.ui.model.FilterOperator.EQ, sSearchTerm)  
                    oBinding.filter(aFilters);
                }
               
                that.err_targ_pointer()  
              },
              err_reason_filter:function()
              {
                
                that.err_targ_pointer_rem()
                
                let sSearchTerm =  sap.ui.getCore().byId("_IDGenComboBox1mv").getSelectedKey()
                var oTable = sap.ui.getCore().byId("_IDGenTable1")
                var oBinding = oTable.getBinding("items");

                if(sSearchTerm=="All")
                {
                    let aFilters =  new sap.ui.model.Filter("err_type",  sap.ui.model.FilterOperator.Contains, "")  
                    oBinding.filter(aFilters);  
                }
                else
                {
                    let aFilters =  new sap.ui.model.Filter("err_type",  sap.ui.model.FilterOperator.Contains, sSearchTerm)  
                    oBinding.filter(aFilters);
                }
                
                that.err_targ_pointer()  

              },
              err_targ_pointer:function()
              {
                var oTable = sap.ui.getCore().byId("_IDGenTable1")

                oTable.getItems().forEach(item=>{
                    item.getCells().forEach(cell=>{
                        if(cell.getText() == "null" || cell.getText() == "invaild" )
                        {
                            cell.addStyleClass("highlight-null");
                        }
                        if(cell.getText() == "vaild")
                        {
                            cell.addStyleClass("success");
                        }
                        if(cell.getText()=="Product not recognised")
                        {
                            item.getCells()[0].addStyleClass("highlight-null") 
                            
                        }
                        if(cell.getText()=="UniqueID  not recognised")
                        {
                            item.getCells()[1].addStyleClass("highlight-null") 
                        }
                        if(cell.getText() == "order data already exists")
                        {   
                            item.getCells().forEach(cp=>{
                                cp.addStyleClass("highlight-null")
                            })
        
                        }
                        if(cell.getText() == "ID/Product is not regonised")
                        {
                            item.getCells()[0].addStyleClass('highlight-null')

                            item.getCells()[1].addStyleClass('highlight-null')
                        }
                    })
                 }) 

              },
              err_targ_pointer_rem :function()
              {
                var oTable = sap.ui.getCore().byId("_IDGenTable1")

                oTable.getItems().forEach(item=>{
                    item.getCells().forEach(cell=>{
                        if(cell.getText() == "null" || cell.getText() == "invaild" )
                        {
                            cell.removeStyleClass("highlight-null");
                        }
                        if(cell.getText() == "vaild")
                        {
                            cell.removeStyleClass("success");
                        }
                        if(cell.getText()=="Product not recognised")
                        {
                            item.getCells()[0].removeStyleClass("highlight-null") 
                            
                        }
                        if(cell.getText()=="UniqueID  not recognised")
                        {
                            item.getCells()[1].removeStyleClass("highlight-null") 
                        }
                        if(cell.getText() == "order data already exists")
                        {   
                            item.getCells().forEach(cp=>{
                                cp.removeStyleClass("highlight-null")
                            })
        
                        }
                        if(cell.getText() == "ID/Product is not regonised")
                        {
                            item.getCells()[0].removeStyleClass('highlight-null')

                            item.getCells()[1].removeStyleClass('highlight-null')
                        }
                    })
                 }) 
              }
  
        });
    })
