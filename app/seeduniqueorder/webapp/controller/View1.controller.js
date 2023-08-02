sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter"


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibary, Fragment,MessageToast,Sorter) {
        "use strict";
 

        var that;
        return Controller.extend("seeduniqueorder.controller.View1", {
            onInit: function () {
                that = this;
                this.bus = this.getOwnerComponent().getEventBus();

                if (!that.Sample) {
                    that.Sample = sap.ui.xmlfragment("seeduniqueorder.view.characteroptions", that);
                }

                if (!that.create) {
                    
                    that.create =  new sap.ui.xmlfragment("seeduniqueorder.view.create", that);
                }
                if(!that.copy)
                {
                    that.copy = new sap.ui.xmlfragment("seeduniqueorder.view.copy",that)
                }
                if(!that.copy_options)
                {
                    that.copy_options = new sap.ui.xmlfragment("seeduniqueorder.view.characteristics_options",that)

                }
               

                var oData = that.getOwnerComponent().getModel("oData")

            },
            handleListPress: function () {

                var oView = this.oView.getParent().getParent();

                oView.setLayout(fioriLibary.LayoutType.TwoColumnsMidExpanded);

              
                var oTable =that.getView().byId("table")

                var selected = this.byId("_IDGenInput1").mProperties.value

            
                var combo_selected = this.byId("_IDGenComboBox1")._lastValue
               

                 var data = oTable.getSelectedItem().getBindingContext().getObject()

                var oData = this.getOwnerComponent().getModel("oData")

                var arr2 = []

                var arr3 = []

                oData.read("/Unique_ID_ITEM1", {
                    success: function (response) {


                        for (var i = 0; i < response.results.length; i++) {
                            if (data.UNIQUE_ID == response.results[i].UNIQUE_ID) {
                                arr2.push(response.results[i])
                            }
                        }
                        oData.read("/CHAR_NUMVAL1", {
                            success: function (response) {
                                var char_data = response.results;

                                for(var j =0;j<arr2.length;j++)
                                {
                                    for (var i = 0; i < char_data.length; i++) {

                                        if(!(arr2[j].NEW_VAL==null))
                                        {
                                        if ((arr2[j].CHAR_NUM == char_data[i].CHAR_NUM) && (arr2[j].CHAR_NUMVAL == char_data[i].CHAR_NUMVAL)&&(arr2[j].NEW_VAL== char_data[i].CHAR_NUMVALDESC)) 
                                        {
                                            arr3.push(char_data[i])
                                        }
                                       }
                                       else
                                       {
                                        if ((arr2[j].CHAR_NUM == char_data[i].CHAR_NUM) && (arr2[j].CHAR_NUMVAL == char_data[i].CHAR_NUMVAL)) 
                                        {
                                            arr3.push(char_data[i])
                                        }
                                       }
                                    }
                                }
        
                    var oModel_1 = that.getOwnerComponent().getModel("oGmodel1")
                    
                    var obj={
                        prod:selected,
                        uid:data.UNIQUE_ID
                    }
                   
                    const act_s =[]

                    act_s.push(obj)

                    oModel_1.setData({
                        items:act_s
                    })
                     var oGmodel = that.getOwnerComponent().getModel("oGmodel")
        
                    
                        oGmodel.setData({
                            items2: arr3
                        })
        
                        // sap.ui.getCore().setModel(oModel, "myModel");
        
                        var oSecondController = sap.ui.controller("seeduniqueorder.controller.Detail"); // Replace with the actual ID of the second controller
                        oSecondController.getDetail();
                            }
                        })
                    }
                })



          
            },
            go: function () {

                var Selection_List_items = new sap.ui.model.json.JSONModel()

                var oData = this.getOwnerComponent().getModel("oData")

                oData.read('/Options', {
                    success: function (response) {
                        var data = response.results.shift()
                        Selection_List_items.setData({
                            items: data
                        })
                    },
                    error: function (e) {
                        console.log(e)
                    }
                })

                sap.ui.getCore().byId("_IDGenSelectDialog1").setModel(Selection_List_items)
                

              

            },
            Listclick: function () {

                var oData = this.getOwnerComponent().getModel("oData")

               

                var oTable =that.getView().byId("table")

                var Unique_ID_Header1_data = new sap.ui.model.json.JSONModel()

                var selected = this.byId("_IDGenInput1").mProperties.value

            
                var combo_selected = this.byId("_IDGenComboBox1")._lastValue

                if(!(selected))
                {
                    MessageToast.show("Please select the Product_type")
                }
                else{

            
                 
                oData.read("/Unique_ID_Header1", {
                    success: function (response) {
                        var arr = []
                        for (var a = 0; a < response.results.length; a++) {

                            if ((combo_selected=="P")||(combo_selected=="U")) {

                                if ((response.results[a].PRODUCT_ID == selected) && (combo_selected)) {
                                    if (response.results[a].UID_TYPE == combo_selected) {
                                        arr.push(response.results[a])
                                    }

                                }
                            }
                            else {
                                if (response.results[a].PRODUCT_ID == selected) {

                                    arr.push(response.results[a])

                                }
                            }

                        }
                       
                        Unique_ID_Header1_data.setData({
                            items: arr
                        })
                        oTable.getItems()[0].setSelected(true)
                        that.handleListPress()
                        
                    }
                })

                this.getView().byId("table").setModel(Unique_ID_Header1_data)
                that.Table_sort()
                
            }

            },
            Selectedrowitem: function () {
                var selected_row_data = this.byId("table").getSelectedItem()

                var data = selected_row_data.getBindingContext().getObject()

                var oData = this.getOwnerComponent().getModel("oData")

                var arr2 = []

                var arr3 = []

                oData.read("/Unique_ID_ITEM1", {
                    success: function (response) {


                        for (var i = 0; i < response.results.length; i++) {
                            if (data.UNIQUE_ID == response.results[i].UNIQUE_ID) {
                                arr2.push(response.results[i])
                            }
                        }
                    }
                })

                oData.read("/CHAR_NUMVAL1", {
                    success: function (response) {
                        var char_data = response.results;

                        for (var i = 0; i < char_data.length; i++) {
                            if ((arr2[0].CHAR_NUM == char_data[i].CHAR_NUM) && (arr2[0].CHAR_NUMVAL == char_data[i].CHAR_NUMVAL)) {
                                arr3.push(char_data[i])
                            }
                        }
                    }
                })

                var oGmodel = this.getOwnerComponent().getModel("oGmodel")

                oGmodel.setData({
                    items: arr3
                })


            },
            onValueHelpRequest: function () {


                if (!this.suggestDialog) {
                    this.suggestDialog = this.loadFragment(
                        {
                            name: "seeduniqueorder.view.selection"
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
                                var da =response.results

                                const daa = da.filter((a)=>{
                                    return da.indexOf(a)>0
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

            onValueHelpDialogClose: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem");

                if (!oSelectedItem) {

                    return;

                }

                const title = oSelectedItem.getTitle();

                that.byId("_IDGenInput1").setValue(title);

            },
            Create_unique_Character:function()
            {
                

                var oTable = this.byId("table")

                var selected = this.byId("_IDGenInput1").mProperties.value

                var combo_selected = this.byId("_IDGenComboBox1")._lastValue

                if(!(oTable.getSelectedItem()&&selected&&combo_selected))
                {
                    alert("Please select the Product_type")

                }
                else{

                 var Active_state = oTable.getSelectedItem().getBindingContext().getObject()   

                sap.ui.getCore().byId("Configurable_Product").setValue(selected)

                // sap.ui.getCore().byId("UniqueType").setValue(Active_state.UID_TYPE)

                sap.ui.getCore().byId("UniqueType").setSelectedKey(Active_state.UID_TYPE)

                sap.ui.getCore().byId("ActiveStatus").setValue(Active_state.ACTIVE)

                

               

                
                       

                that.create.open()
                }

            },
            onOptions_selectDialog:function()
            {

                that.Sample.open()

          
               
                    var oData = this.getOwnerComponent().getModel("oData")

                    
               
                    // that.byId("table4").setModel(oData)
                  
                   var    options_List_items  = new sap.ui.model.json.JSONModel()

                    oData.read('/CHAR_NUMVAL1', {
                        success:  function(response) {
                             
                            var response = response.results;
                            const uniqueObjects = [];
        
                            const uniqueIdentifiers = new Set();
                          
                            for (const obj of response) {
                              
                              const identifier = obj.CHARVAL_NUM;
                          
                              if (!uniqueIdentifiers.has(identifier)) {
                                uniqueObjects.push(obj);
                                uniqueIdentifiers.add(identifier);
                              }
                            }
                           
                            var my_arr =[]
        
                            for(var i=0;i<uniqueObjects.length;i++)
                            {
                               var obj ={
                                  CHARVAL_NUM:uniqueObjects[i].CHARVAL_NUM
                               }
                               var a=0;
        
                               for(var j=0;j<response.length;j++)
                               {
                                  if(uniqueObjects[i].CHARVAL_NUM==response[j].CHARVAL_NUM)
                                  {
                                      obj["name"+a++]=response[j].CHAR_NUMVALDESC;
                                  }
                               }
                               
                               my_arr.push(obj)
                            }
                        
                            
                            var oModel3 = new sap.ui.model.json.JSONModel()
        
                            oModel3.setData({
                              items4:my_arr
                            })
        
                            sap.ui.getCore().byId("idList1").setModel(oModel3)

                        },
                        error: function (e) {
                            console.log(e)
                        }
                    })
                    var List_op = sap.ui.getCore().byId("idList1").getItems()

                    
                    if(sap.ui.getCore().byId("table3").getItems().length>0){

                   sap.ui.getCore().byId("table3").getItems().forEach(i=>{

                      List_op.forEach(j=>{
                        if(j.getContent()[0].getHeaderText()==i.getBindingContext().getObject().CHARVAL_NUM)
                        {
                            j.getContent()[0].getContent()[0].getButtons().forEach(button =>{
                                if(button.getText()==i.getBindingContext().getObject().CHAR_NUMVALDESC)
                                {
                                    button.setSelected(true)
                                    button.getParent().getParent().setExpanded(true)
                                }
                            })
                        }
                      })

                    })
                
                }
             
            },
            onOptions_select_close:function()
            {
                  that.Sample.close()

                  var List_op = sap.ui.getCore().byId("idList1").getItems()
                  List_op.forEach((obj)=>{
                     
                      obj.getContent()[0].getContent()[0].getButtons().forEach(button=>{
                          button.setSelected(false)
                              
                      })
  
                  })
            }
            ,
            onClose_create:function()
            {
                sap.ui.getCore().byId("table3").setModel(new sap.ui.model.json.JSONModel({}))
                that.create.close()
                sap.ui.getCore().byId("UniqueDescription").setValue("")

                var List_op = sap.ui.getCore().byId("idList1").getItems()
                List_op.forEach((obj)=>{
                   
                    obj.getContent()[0].getContent()[0].getButtons().forEach(button=>{
                        button.setSelected(false)
                            
                    })

                })

            },
            create_char_search:function(oEvent)
            {
                var sValue = oEvent.getParameters().newValue;

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                            
                            new sap.ui.model.Filter("CHARVAL_NUM", sap.ui.model.FilterOperator.Contains, sValue)
                           
                        ],
                        and: false
                    }));
                }

                var oTable = sap.ui.getCore().byId("idList1");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters)
            },
            chars_values_add:function()
            {
                var Selected_list = sap.ui.getCore().byId("idList1").getItems()

                

                var oModel3 = new sap.ui.model.json.JSONModel()

                var sample =[]

               Selected_list.forEach(item=>{

                 item.getContent()[0].getContent()[0].getButtons().forEach(

                    button =>{
                        if(button.getSelected())
                        {
                            var obj ={
                                
                                CHAR_NUMVALDESC:button.getText(),
                                CHARVAL_NUM:item.getContent()[0].getHeaderText()
                            }

                            sample.push(obj)
                        }
                    }
                 )
              }) 

              

                oModel3.setData({
                    items5:sample
                })

                sap.ui.getCore().byId("table3").setModel(oModel3)

                that.Sample.close()

                var List_op = sap.ui.getCore().byId("idList1").getItems()
                List_op.forEach((obj)=>{
                   
                    obj.getContent()[0].getContent()[0].getButtons().forEach(button=>{
                        button.setSelected(false)
                            
                    })

                })

               
            },
            delete_row:function(oEvent)
            {
                var table12 = sap.ui.getCore().byId("table3").getModel().getData().items5

                let index  = parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[2])

                const Act_arr =table12.filter((obj1)=>{
                    return  table12.indexOf(obj1)!==index
                })
               
                const new_model1 = new sap.ui.model.json.JSONModel()

                new_model1.setData({
                    items5:Act_arr
                })

                sap.ui.getCore().byId("table3").setModel(new_model1)
            },
            Unique_desc_search:function(oEvent)
            {
                  var sValue = oEvent.getParameters().newValue;



                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                            new sap.ui.model.Filter("UNIQUE_ID", sap.ui.model.FilterOperator.EQ, sValue),
                            new sap.ui.model.Filter("UNIQUE_DESC", sap.ui.model.FilterOperator.Contains, sValue),
                            new sap.ui.model.Filter("UID_TYPE", sap.ui.model.FilterOperator.Contains, sValue)
                        ],
                        and: false
                    }));
                }

                var oTable = this.getView().byId("table");
                var oBinding = oTable.getBinding("items");

                if(oBinding)
                {
                    oBinding.filter(aFilters)
                }
                else
                {
                    MessageToast.show("No Data in Table")
                }

                
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

                var oTable = this.getView().byId("table4");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters)
            },
            OnCreate_submit:function()
            {
                
                that.create.close()

                var List_op = sap.ui.getCore().byId("idList1").getItems()
                List_op.forEach((obj)=>{
                   
                    obj.getContent()[0].getContent()[0].getButtons().forEach(button=>{
                        button.setSelected(false)
                            
                    })

                })

                var oData = this.getOwnerComponent().getModel("oData")

                var oTable = this.byId("table")

                var table_seleceted_items= sap.ui.getCore().byId("table3").getItems()

                var oGmodel = this.getOwnerComponent().getModel("oGmodel")

                var Data_array =[]

                var char_data =[]

        
                oData.read("/Unique_ID_Header1",{
                    success:function(res)
                    {
                        var data = res.results;

                        var obj ={
                            UNIQUE_ID:data.length+1,
                            PRODUCT_ID:sap.ui.getCore().byId("Configurable_Product").getValue(),
                            UID_TYPE:sap.ui.getCore().byId("UniqueType").getSelectedKey(),
                            ACTIVE:oTable.getSelectedItem().getBindingContext().getObject().ACTIVE,
                            UNIQUE_DESC:sap.ui.getCore().byId("UniqueDescription").getValue()
                        }

                        Data_array.push(obj)


                        oData.callFunction("/seed_order",{
                            method:"GET",
                            urlParameters:
                            {
                                FLAG:"V1",
                                Data:null
                                
                            },
                            success:function(response)
                            {
                                var data_point  = JSON.parse(response.seed_order)

                               

                                for(var a=0;a<table_seleceted_items.length;a++)
                                {
                                    for(var b=0;b<data_point.length;b++)
                                    {
                                        if((table_seleceted_items[a].getBindingContext().getObject().CHARVAL_NUM==data_point[b].CHARVAL_NUM)&&(table_seleceted_items[a].getBindingContext().getObject().CHAR_NUMVALDESC==data_point[b].CHAR_NUMVALDESC))
                                        {
                                            

                                          let  obj_data ={
                                                UNIQUE_ID:Data_array[0].UNIQUE_ID,
                                                PRODUCT_ID:Data_array[0].PRODUCT_ID,
                                                CHAR_NUM:parseInt(data_point[b].CHAR_NUM),
                                                CHAR_NUMVAL:data_point[b].CHAR_NUMVAL,
                                                NEW_VAL:table_seleceted_items[a].getBindingContext().getObject().CHAR_NUMVALDESC
                                            }  
        
                                           char_data.push(obj_data)
                                          
                                        }
                                    }
                                }
                                console.log(char_data)
        
                                oData.callFunction("/seed_order",{
                                    method:"GET",
                                    urlParameters:
                                    {
                                        FLAG:"C",
                                        Data:JSON.stringify(Data_array)
                                    },
                                    success:function()
                                    {
                                        console.log("Successfully created ")
                                    },
                                    error:function(err)
                                    {
                                        console.log(err)
                                    }
                                })
        
                                oData.callFunction("/seed_order",{
                                    method:"GET",
                                    urlParameters:{
                                        FLAG:"C1",
                                        Data:JSON.stringify(char_data)
                                    },
                                    success:function()
                                    {
                                        console.log("successfully created")
                                    },
                                    error:function(err)
                                    {
                                        console.log(err)
                                    }
                                })

                                that.Listclick()
                            },
                            err:function(err)
                            {
                                console.log(err)
                            }
                        })
                   MessageToast.show("Sucessfully created")
                    }
                })

            },
            Switch_case_change:function(oEvent)
            {
                var oData = this.getOwnerComponent().getModel("oData")

                var Change  = oEvent.getSource().getState()

               
                var empty_json =[]

                var obj ={
                    UNIQUE_ID:oEvent.getSource().getBindingContext().getObject().UNIQUE_ID,
                    ACTIVE:Change
                }
              
                empty_json.push(obj)
                

                oData.callFunction('/seed_order',{
                    
                        method: "GET",
                        urlParameters:
                        {
                            FLAG: "U",
                            Data: JSON.stringify(empty_json)
                        },
                        success: function (response) {
                            console.log("successfully created")
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    
                })
            },
            Copy_fragment_open:function()
            {    
              var oTable = this.byId("table")


            var selected = this.byId("_IDGenInput1").mProperties.value

            var combo_selected = this.byId("_IDGenComboBox1")._lastValue

            if(!(oTable.getSelectedItem()&&selected&&combo_selected))
            {
                alert("Please select the options")

            }
            else{

             var Active_state = oTable.getSelectedItem().getBindingContext().getObject()   

            sap.ui.getCore().byId("Configurable_Product1").setValue(selected)

            sap.ui.getCore().byId("UniqueType1").setSelectedKey(Active_state.UID_TYPE)

            sap.ui.getCore().byId("ActiveStatus1").setValue(Active_state.ACTIVE)

            sap.ui.getCore().byId("UniqueDescription1").setValue(Active_state.UNIQUE_DESC)

            var oGmodel = that.getOwnerComponent().getModel("oGmodel")

            sap.ui.getCore().byId("table6").setModel(oGmodel)

            that.copy.open()
            }
                
            },
            Copy_fragment_close:function()
            {
                sap.ui.getCore().byId("table6").setModel(new sap.ui.model.json.JSONModel({}))
                that.copy.close()
            },
            characetristicsclose:function()
            {
                that.copy_options.close()

                var List_op = sap.ui.getCore().byId("idList").getItems()
                List_op.forEach((obj)=>{
                   
                    obj.getContent()[0].getContent()[0].getButtons().forEach(button=>{
                        button.setSelected(false)
                            
                    })

                })
                
            },
            copy_characteristics_options:function()
            {
                var oData = this.getOwnerComponent().getModel("oData") 

                oData.read("/CHAR_NUMVAL1",{
                    success:function(res)
                    {
                      var response = res.results;
                      const uniqueObjects = [];

                      const uniqueIdentifiers = new Set();
                    
                      for (const obj of response) {
                        
                        const identifier = obj.CHARVAL_NUM;
                    
                        if (!uniqueIdentifiers.has(identifier)) {
                          uniqueObjects.push(obj);
                          uniqueIdentifiers.add(identifier);
                        }
                      }
                     
                      var my_arr =[]

                      for(var i=0;i<uniqueObjects.length;i++)
                      {
                         var obj ={
                            CHARVAL_NUM:uniqueObjects[i].CHARVAL_NUM
                         }
                         var a=0;

                         for(var j=0;j<response.length;j++)
                         {
                            if(uniqueObjects[i].CHARVAL_NUM==response[j].CHARVAL_NUM)
                            {
                                obj["name"+a++]=response[j].CHAR_NUMVALDESC;
                            }
                         }
                         
                         my_arr.push(obj)
                      }
                      

                      
                      var oModel3 = new sap.ui.model.json.JSONModel()

                      oModel3.setData({
                        items4:my_arr
                      })

                      sap.ui.getCore().byId("idList").setModel(oModel3)

                      var oGmodel = that.getOwnerComponent().getModel("oGmodel")

                      var oTable12 = sap.ui.getCore().byId("idList")

                
                    var data = sap.ui.getCore().byId("table6").getItems();
                    data.forEach(obj=>{
                        oTable12.getItems().forEach(item=>{
                           if(item.getContent()[0].getHeaderText() === obj.getBindingContext().getObject().CHARVAL_NUM){
                            // sap.ui.getCore().byId("Panel_125").expanded=true

                            item.getContent()[0].getContent()[0].getButtons().forEach(
                                
                                button=>{
                                    if(button.getText()==obj.getBindingContext().getObject().CHAR_NUMVALDESC)
                                    {
                                        button.getParent().getParent().setExpanded(true)
                                        button.setSelected(true)
                                    }
                                }
                            )
                            
                           }
                        })
                    })
                    },
                    err:function(err)
                    {
                        console.log(err)
                    }
                })

               that.copy_options.open()               
            },
            on_characteristics_submit:function()
            {
                that.copy_options.close()  

                  var oTable123 = sap.ui.getCore().byId("idList")

                  var oGmodel = []

                  sap.ui.getCore().byId("table6").getItems().forEach(
                    item=>{
                         oGmodel.push(item.getBindingContext().getObject())
                    }
                  )

                  var oModel125  = new sap.ui.model.json.JSONModel()

                  var aaa=[]

                  oTable123.getItems().forEach( obj =>{
                    obj.getContent()[0].getContent()[0].getButtons().forEach(
                        button =>{
                            if(button.getSelected())
                            {
                                 var objs ={
                                    CHARVAL_NUM:obj.getContent()[0].getHeaderText(),
                                    CHAR_NUMVALDESC:button.getText()
                                 }

                                 aaa.push(objs)
                            }
                        }
                    )
                  } )
                 let act = oGmodel.concat(aaa)

                 act = act.map(obj => { return { CHARVAL_NUM: obj.CHARVAL_NUM, CHAR_NUMVALDESC: obj.CHAR_NUMVALDESC } });

                 let act1 = act.filter((value, index) => {

                    const _value = JSON.stringify(value);

                    return index === act.findIndex(obj => {

                        return JSON.stringify(obj) === _value;

                    });

                  });
                
                  oModel125.setData(
                  {
                    items2:act1
                  })

             sap.ui.getCore().byId("table6").setModel(new sap.ui.model.json.JSONModel({}))
                  
             sap.ui.getCore().byId("table6").setModel(oModel125)

             var List_op = sap.ui.getCore().byId("idList").getItems()
             List_op.forEach((obj)=>{
                
                 obj.getContent()[0].getContent()[0].getButtons().forEach(button=>{
                     button.setSelected(false)
                         
                 })

             })
            },
            copy_charac_search:function(oEvent)
            {
                var sValue = oEvent.getParameters().newValue;

                var aFilters = []

                if (sValue && sValue.length > 0) {
                    aFilters.push(new sap.ui.model.Filter({
                        filters: [
                            
                            new sap.ui.model.Filter("CHARVAL_NUM", sap.ui.model.FilterOperator.Contains, sValue)
                           
                        ],
                        and: false
                    }));
                }
            
                var oTable = sap.ui.getCore().byId("idList")

                var oBinding = oTable.getBinding("items");

                var data  =  oBinding.filter(aFilters)

                console.log(data)
            },

            delete_row_6:function(oEvent)
            {
                var Avai_data = sap.ui.getCore().byId("table6").getModel().getData().items2

                var index =parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[2])
                
                // table12.removeItem(oEvent.getSource().getParent())

            let a25 =   Avai_data.filter((obj)=>{
                    return Avai_data.indexOf(obj)!==index

                    
                })


              var  new_model = new sap.ui.model.json.JSONModel()

              new_model.setData({
                items2:a25
              })

              sap.ui.getCore().byId("table6").setModel(new_model)

            },
            on_copy_data_submit:function()
            {
             
                var oTable = this.byId("table")

                var table_seleceted_items= sap.ui.getCore().byId("table6").getItems()

             var oData = this.getOwnerComponent().getModel("oData")

             var  data_arr = []

             var char_data = []

             oData.read("/Unique_ID_Header1",{
                success:function(res)
                {
                    var data = res.results;
                    var obj ={
                        UNIQUE_ID:data.length+1,
                        PRODUCT_ID:sap.ui.getCore().byId("Configurable_Product1").getValue(),
                        UID_TYPE:sap.ui.getCore().byId("UniqueType1").getSelectedKey(),
                        ACTIVE:oTable.getSelectedItem().getBindingContext().getObject().ACTIVE,
                        UNIQUE_DESC:sap.ui.getCore().byId("UniqueDescription1").getValue()
                    }
                   
                    data_arr.push(obj)

                    oData.callFunction("/seed_order",{
                        method:"GET",
                        urlParameters:
                        {
                            FLAG:"V1",
                            Data:null
                            
                        },
                        success:function(response)
                        {
                            var data_point  = JSON.parse(response.seed_order)

                            for(var a=0;a<table_seleceted_items.length;a++)
                            {
                                for(var b=0;b<data_point.length;b++)
                                {
                                    if((table_seleceted_items[a].getBindingContext().getObject().CHARVAL_NUM==data_point[b].CHARVAL_NUM)&&(table_seleceted_items[a].getBindingContext().getObject().CHAR_NUMVALDESC==data_point[b].CHAR_NUMVALDESC))
                                    {
                                      var  obj3 ={
                                            UNIQUE_ID:data_arr[0].UNIQUE_ID,
                                            PRODUCT_ID:data_arr[0].PRODUCT_ID,
                                            CHAR_NUM:parseInt(data_point[b].CHAR_NUM),
                                            CHAR_NUMVAL:data_point[b].CHAR_NUMVAL,
                                            NEW_VAL:table_seleceted_items[a].getBindingContext().getObject().CHAR_NUMVALDESC
                                        }  
    
                                       char_data.push(obj3)
                                    }
                                }
                            }

                            oData.callFunction("/seed_order",{
                                method:"GET",
                                urlParameters:
                                {
                                    FLAG:"C",
                                    Data:JSON.stringify(data_arr)
                                },
                                success:function()
                                {
                                    console.log("Successfully created ")
                                },
                                error:function(err)
                                {
                                    console.log(err)
                                }
                            })
    
                            oData.callFunction("/seed_order",{
                                method:"GET",
                                urlParameters:{
                                    FLAG:"C1",
                                    Data:JSON.stringify(char_data)
                                },
                                success:function()
                                {
                                    console.log("successfully created")
                                },
                                error:function(err)
                                {
                                    console.log(err)
                                }
                            })
                            that.Listclick()

                        }                        
                    })                    
                },
                err:function(err)
                {
                    console.log(err)
                }
             })

             MessageToast.show("Sucessfully created")
             that.copy.close()
            },
            Sample123:function()
            {
                console.log("what is that ")
            },
            Table_sort:function()
            {
                var oTable = that.byId("table")

                var oBinding = oTable.getBinding("items");
          
                var oSorter = new Sorter("UNIQUE_ID",false);
          
                oBinding.sort(oSorter);
 
            }
        });
    });
