sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        
        var that;
        return Controller.extend("crudjson.controller.View1", {
            onInit: function () {
                that =this;
                that.onView()
            },
            onView: function () {


                fetch("model/data.json")
                .then(response => response.json())
                .then(data => {
                   
                let oModel1 = new sap.ui.model.json.JSONModel()
                
                oModel1.setData({
                    items:data
                })
                        //sorting the table
                    that.byId("table").setModel(oModel1)
                    var oTable = that.byId("table")
                    var oBinding = oTable.getBinding("items")
                    oTable.getColumns()[0];
                    var oSorter = new sap.ui.model.Sorter("PAGEID", false)
                    oBinding.sort(oSorter);
                  
                })
                .catch(error => {
                    console.error("Error fetching JSON:", error);
                });
            },
            onCreate:function()
            {
                that.byId("_IDGenPanel1").setExpanded(true)

                that.byId("_IDGenButton5").setText("Create")

                that.byId("PAGEID").setValue("")
                that.byId("DESCRIPTION").setValue("")
               that.byId("PARENTNODEID").setValue("")
               that.byId("HEIRARCHYLEVEL").setValue("")
            },
            submit:function()
            {
                let data_array = []

                let but = that.byId("_IDGenButton5").getText()

                var odata  = this.getOwnerComponent().getModel('oData')

                   let a = {
                    "PAGEID": parseInt(that.byId("PAGEID").getValue()),
                    "DESCRIPTION": that.byId("DESCRIPTION").getValue(),
                    "PARENTNODEID": parseInt(that.byId("PARENTNODEID").getValue()),
                    "HEIRARCHYLEVEL": parseInt(that.byId("HEIRARCHYLEVEL").getValue())
                  }
                  
                  if(but=="Update")
                  {

                    let table = that.byId("table").getSelectedItems()[0].getBindingContext().getObject()


                    let data_array = []

                    data_array.push(a)  //new data 

                    data_array.push(table)  // prev data 



                    odata.callFunction('/cre', {
                        METHOD: 'GET',
                        urlParameters: {
                            FLAG: "U",
                            Data: JSON.stringify(data_array)
                        },
                        success: function (response) {
                            console.log(response.cre)
                        },
                        err: function (e) {
                            console.log(e)
                        }

                    })
                  }
                  else
                  {
                    if(a.DESCRIPTION==""||a.HEIRARCHYLEVEL==""||a.PAGEID==""||a.PARENTNODEID=="")
                    {
                      alert("Please fill the avail data")
                    }
                    else
                    {
                      data_array.push(a)
  
                        odata.callFunction('/cre', {
                            METHOD: 'GET',
                            urlParameters: {
                                FLAG: "C1",
                                Data: JSON.stringify(data_array)
                            },
                            success: function (response) {
                                console.log(response.cre)
                            },
                            err: function (e) {
                                console.log(e)
                            }
  
                        })
  
                    }
                  }
               
            },
            oNclose:function()
            {
                that.byId("_IDGenPanel1").setExpanded(false)   

                
                that.byId("PAGEID").setValue("")
                that.byId("DESCRIPTION").setValue("")
               that.byId("PARENTNODEID").setValue("")
               that.byId("HEIRARCHYLEVEL").setValue("")
            },
            onUpdate:function()
            {
                that.byId("_IDGenButton5").setText("Update")

                let table = that.byId("table")

                if(table.getSelectedItems().length == 0)
                {
                    that.byId("_IDGenPanel1").setExpanded(false) 

                    alert("Select the row ?")
                }
                else
                {
                    let selectedData =  table.getSelectedItems()[0].getBindingContext().getObject()

                    that.byId("_IDGenPanel1").setExpanded(true) 
                    that.byId("PAGEID").setValue(selectedData.PAGEID)
                    that.byId("DESCRIPTION").setValue(selectedData.DESCRIPTION)
                   that.byId("PARENTNODEID").setValue(selectedData.PARENTNODEID)
                   that.byId("HEIRARCHYLEVEL").setValue(selectedData.HEIRARCHYLEVEL)
                }
            },
            onDelete:function()
            {
                let table = that.byId("table")

                if(table.getSelectedItems().length==0)
                {
                   alert("Please select a row ?")   
                }
                else
                {
                    let selectedData =  table.getSelectedItems()[0].getBindingContext().getObject()

                    var odata  = this.getOwnerComponent().getModel('oData')

                    let data_array = []

                        data_array.push(selectedData)

                    odata.callFunction("/cre",{
                        METHOD:"GET",
                        urlParameters:{
                            FLAG:"D",
                            Data:JSON.stringify(data_array)
                        },
                        success:function()
                        {
                            console.log("deleted")
                        },
                        error:function(err)
                        {
                            console.log(err)
                        }
                    })
                }
            }
        });
    });
