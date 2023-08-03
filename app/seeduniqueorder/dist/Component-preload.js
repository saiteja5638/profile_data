//@ui5-bundle seeduniqueorder/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"seeduniqueorder/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","seeduniqueorder/model/models"],function(e,i,t){"use strict";return e.extend("seeduniqueorder.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);var i=this.getRouter();if(i){i.initialize()}this.setModel(t.createDeviceModel(),"device")}})});
},
	"seeduniqueorder/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("seeduniqueorder.controller.App",{onInit(){}})});
},
	"seeduniqueorder/controller/Detail.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/library","sap/m/MessageToast"],function(e,t,r){"use strict";var a;return e.extend("seeduniqueorder.controller.Detail",{onInit:function(){a=this;if(!a.order){a.order=sap.ui.xmlfragment("seeduniqueorder.view.order",a)}},getDetail:function(){var e=a.getOwnerComponent().getModel("oGmodel");a.getView().byId("Table2").setModel(e)},onClose:function(){var e=this.oView.getParent().getParent();e.setLayout(t.LayoutType.OneColumnsMidExpanded)},Characteristic_value_search:function(e){var t=e.getParameters().newValue;var r=[];if(t&&t.length>0){r.push(new sap.ui.model.Filter({filters:[new sap.ui.model.Filter("CHARVAL_NUM",sap.ui.model.FilterOperator.Contains,t),new sap.ui.model.Filter("CHAR_NUMVALDESC",sap.ui.model.FilterOperator.Contains,t)],and:false}))}var a=this.getView().byId("Table2");var o=a.getBinding("items");o.filter(r)},open_order_frag:function(){a.order.open();var e=a.getOwnerComponent().getModel("oGmodel1");var t=e.oData.items;sap.ui.getCore().byId("Configurable_Product_1").setValue(t[0].prod);sap.ui.getCore().byId("UniqueType_1").setValue(t[0].uid)},close_order_frag:function(){a.order.close();sap.ui.getCore().byId("ActiveStatus_1").setValue("");sap.ui.getCore().byId("Date_range_1").setValue("")},Submit_order:function(){a.close_order_frag();var e=sap.ui.getCore().byId("Configurable_Product_1").getValue();var t=sap.ui.getCore().byId("UniqueType_1").getValue();var o=sap.ui.getCore().byId("ActiveStatus_1").getValue();var i=sap.ui.getCore().byId("Date_range_1").getValue();var n=new Date;var s=sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd/MM/yyyy"});var l=s.format(n);var u=a.getOwnerComponent().getModel("oData");u.read("/ORDERS",{success:function(a){var n={SEEDORDER:"SE0000"+(a.results.length+1),PRODUCT:e,UNIQUEID:t,ORDERQUANTITY:parseInt(o),MATERIALAVAILDATE:i,CREADTEDDATE:l};var s=[];s.push(n);u.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"O",Data:JSON.stringify(s)},success:function(){console.log("Successfully Triggred")},err:function(e){console.log(e)}});r.show(n.SEEDORDER+"HAS BEEN SUCCESSFULLY  CREATED")},err:function(e){console.log(e)}})},Search_filter:function(e){var t=e.getParameters().newValue;var r=[];if(t&&t.length>0){r.push(new sap.ui.model.Filter({filters:[new sap.ui.model.Filter("CHARVAL_NUM",sap.ui.model.FilterOperator.Contains,t),new sap.ui.model.Filter("CHAR_NUMVALDESC",sap.ui.model.FilterOperator.Contains,t)],and:false}))}var a=this.getView().byId("Table2");var o=a.getBinding("items");o.filter(r)}})});
},
	"seeduniqueorder/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/library","sap/ui/core/Fragment","sap/m/MessageToast","sap/ui/model/Sorter"],function(e,t,o,n,s){"use strict";var a;return e.extend("seeduniqueorder.controller.View1",{onInit:function(){a=this;this.bus=this.getOwnerComponent().getEventBus();if(!a.Sample){a.Sample=sap.ui.xmlfragment("seeduniqueorder.view.characteroptions",a)}if(!a.create){a.create=new sap.ui.xmlfragment("seeduniqueorder.view.create",a)}if(!a.copy){a.copy=new sap.ui.xmlfragment("seeduniqueorder.view.copy",a)}if(!a.copy_options){a.copy_options=new sap.ui.xmlfragment("seeduniqueorder.view.characteristics_options",a)}var e=a.getOwnerComponent().getModel("oData")},handleListPress:function(){var e=this.oView.getParent().getParent();e.setLayout(t.LayoutType.TwoColumnsMidExpanded);var o=a.getView().byId("table");var n=this.byId("_IDGenInput1").mProperties.value;var s=this.byId("_IDGenComboBox1")._lastValue;var r=o.getSelectedItem().getBindingContext().getObject();var i=this.getOwnerComponent().getModel("oData");var l=[];var g=[];i.read("/Unique_ID_ITEM1",{success:function(e){for(var t=0;t<e.results.length;t++){if(r.UNIQUE_ID==e.results[t].UNIQUE_ID){l.push(e.results[t])}}i.read("/CHAR_NUMVAL1",{success:function(e){var t=e.results;for(var o=0;o<l.length;o++){for(var s=0;s<t.length;s++){if(!(l[o].NEW_VAL==null)){if(l[o].CHAR_NUM==t[s].CHAR_NUM&&l[o].CHAR_NUMVAL==t[s].CHAR_NUMVAL&&l[o].NEW_VAL==t[s].CHAR_NUMVALDESC){g.push(t[s])}}else{if(l[o].CHAR_NUM==t[s].CHAR_NUM&&l[o].CHAR_NUMVAL==t[s].CHAR_NUMVAL){g.push(t[s])}}}}var i=a.getOwnerComponent().getModel("oGmodel1");var u={prod:n,uid:r.UNIQUE_ID};const c=[];c.push(u);i.setData({items:c});var d=a.getOwnerComponent().getModel("oGmodel");d.setData({items2:g});var C=sap.ui.controller("seeduniqueorder.controller.Detail");C.getDetail()}})}})},go:function(){var e=new sap.ui.model.json.JSONModel;var t=this.getOwnerComponent().getModel("oData");t.read("/Options",{success:function(t){var o=t.results.shift();e.setData({items:o})},error:function(e){console.log(e)}});sap.ui.getCore().byId("_IDGenSelectDialog1").setModel(e)},Listclick:function(){var e=this.getOwnerComponent().getModel("oData");var t=a.getView().byId("table");var o=new sap.ui.model.json.JSONModel;var s=this.byId("_IDGenInput1").mProperties.value;var r=this.byId("_IDGenComboBox1")._lastValue;if(!s){n.show("Please select the Product_type")}else{e.read("/Unique_ID_Header1",{success:function(e){var n=[];for(var i=0;i<e.results.length;i++){if(r=="P"||r=="U"){if(e.results[i].PRODUCT_ID==s&&r){if(e.results[i].UID_TYPE==r){n.push(e.results[i])}}}else{if(e.results[i].PRODUCT_ID==s){n.push(e.results[i])}}}o.setData({items:n});t.getItems()[0].setSelected(true);a.handleListPress()}});this.getView().byId("table").setModel(o);a.Table_sort()}},Selectedrowitem:function(){var e=this.byId("table").getSelectedItem();var t=e.getBindingContext().getObject();var o=this.getOwnerComponent().getModel("oData");var n=[];var s=[];o.read("/Unique_ID_ITEM1",{success:function(e){for(var o=0;o<e.results.length;o++){if(t.UNIQUE_ID==e.results[o].UNIQUE_ID){n.push(e.results[o])}}}});o.read("/CHAR_NUMVAL1",{success:function(e){var t=e.results;for(var o=0;o<t.length;o++){if(n[0].CHAR_NUM==t[o].CHAR_NUM&&n[0].CHAR_NUMVAL==t[o].CHAR_NUMVAL){s.push(t[o])}}}});var a=this.getOwnerComponent().getModel("oGmodel");a.setData({items:s})},onValueHelpRequest:function(){if(!this.suggestDialog){this.suggestDialog=this.loadFragment({name:"seeduniqueorder.view.selection"})}this.suggestDialog.then(e=>{e.open()}).then(()=>{var e=this.getOwnerComponent().getModel("oData");var t=new sap.ui.model.json.JSONModel;e.read("/Options",{success:async function(e){var o=e.results;const n=o.filter(e=>o.indexOf(e)>0);await t.setData({items:n});a.byId("_IDGe").setModel(t)},error:function(e){console.log(e)}})})},onValueHelpDialogClose:function(e){var t=e.getParameter("selectedItem");if(!t){return}const o=t.getTitle();a.byId("_IDGenInput1").setValue(o)},Create_unique_Character:function(){var e=this.byId("table");var t=this.byId("_IDGenInput1").mProperties.value;var o=this.byId("_IDGenComboBox1")._lastValue;if(!(e.getSelectedItem()&&t&&o)){alert("Please select the Product_type")}else{var n=e.getSelectedItem().getBindingContext().getObject();sap.ui.getCore().byId("Configurable_Product").setValue(t);sap.ui.getCore().byId("UniqueType").setSelectedKey(n.UID_TYPE);sap.ui.getCore().byId("ActiveStatus").setValue(n.ACTIVE);a.create.open()}},onOptions_selectDialog:function(){a.Sample.open();var e=this.getOwnerComponent().getModel("oData");var t=new sap.ui.model.json.JSONModel;e.read("/CHAR_NUMVAL1",{success:function(e){var e=e.results;const t=[];const o=new Set;for(const n of e){const e=n.CHARVAL_NUM;if(!o.has(e)){t.push(n);o.add(e)}}var n=[];for(var s=0;s<t.length;s++){var a={CHARVAL_NUM:t[s].CHARVAL_NUM};var r=0;for(var i=0;i<e.length;i++){if(t[s].CHARVAL_NUM==e[i].CHARVAL_NUM){a["name"+r++]=e[i].CHAR_NUMVALDESC}}n.push(a)}var l=new sap.ui.model.json.JSONModel;l.setData({items4:n});sap.ui.getCore().byId("idList1").setModel(l)},error:function(e){console.log(e)}});var o=sap.ui.getCore().byId("idList1").getItems();if(sap.ui.getCore().byId("table3").getItems().length>0){sap.ui.getCore().byId("table3").getItems().forEach(e=>{o.forEach(t=>{if(t.getContent()[0].getHeaderText()==e.getBindingContext().getObject().CHARVAL_NUM){t.getContent()[0].getContent()[0].getButtons().forEach(t=>{if(t.getText()==e.getBindingContext().getObject().CHAR_NUMVALDESC){t.setSelected(true);t.getParent().getParent().setExpanded(true)}})}})})}},onOptions_select_close:function(){a.Sample.close();var e=sap.ui.getCore().byId("idList1").getItems();e.forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})})},onClose_create:function(){sap.ui.getCore().byId("table3").setModel(new sap.ui.model.json.JSONModel({}));a.create.close();sap.ui.getCore().byId("UniqueDescription").setValue("");var e=sap.ui.getCore().byId("idList1").getItems();e.forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})})},create_char_search:function(e){var t=e.getParameters().newValue;var o=sap.ui.getCore().byId("idList1");var n=o.getBinding("items");var s=[];if(t&&t.length>0){s.push(new sap.ui.model.Filter({filters:[new sap.ui.model.Filter("CHARVAL_NUM",sap.ui.model.FilterOperator.Contains,t)],and:false}));o.getItems().forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})})}n.filter(s);if(t.length<1){var a=sap.ui.getCore().byId("idList1").getItems();if(sap.ui.getCore().byId("table3").getItems().length>0){sap.ui.getCore().byId("table3").getItems().forEach(e=>{a.forEach(t=>{if(t.getContent()[0].getHeaderText()==e.getBindingContext().getObject().CHARVAL_NUM){t.getContent()[0].getContent()[0].getButtons().forEach(t=>{if(t.getText()==e.getBindingContext().getObject().CHAR_NUMVALDESC){t.setSelected(true);t.getParent().getParent().setExpanded(true)}})}})})}}},chars_values_add:function(e){let t=[];sap.ui.getCore().byId("table3").getItems().forEach(e=>{t.push(e.getBindingContext().getObject())});console.log(t);var o=a.getOwnerComponent().getModel("oModel2");var n=[];e.getSource().getButtons().forEach(e=>{if(e.getSelected()){var t={CHAR_NUMVALDESC:e.getText(),CHARVAL_NUM:e.getParent().getParent().getHeaderText()};n.push(t)}});let s=t.concat(n);o.setData({items5:s});sap.ui.getCore().byId("table3").setModel(o)},delete_row:function(e){var t=sap.ui.getCore().byId("table3").getModel().getData().items5;let o=parseInt(e.getSource().getBindingContext().getPath().split("/")[2]);const n=t.filter(e=>t.indexOf(e)!==o);const s=new sap.ui.model.json.JSONModel;s.setData({items5:n});sap.ui.getCore().byId("table3").setModel(s)},Unique_desc_search:function(e){var t=e.getParameters().newValue;var o=[];if(t&&t.length>0){o.push(new sap.ui.model.Filter({filters:[new sap.ui.model.Filter("UNIQUE_ID",sap.ui.model.FilterOperator.EQ,t),new sap.ui.model.Filter("UNIQUE_DESC",sap.ui.model.FilterOperator.Contains,t),new sap.ui.model.Filter("UID_TYPE",sap.ui.model.FilterOperator.Contains,t)],and:false}))}var s=this.getView().byId("table");var a=s.getBinding("items");if(a){a.filter(o)}else{n.show("No Data in Table")}},Characteristic_value_search:function(e){var t=e.getParameters().newValue;var o=this.getView().byId("table4");var n=o.getBinding("items");var s=[];if(t&&t.length>0){s.push(new sap.ui.model.Filter({filters:[new sap.ui.model.Filter("CHARVAL_NUM",sap.ui.model.FilterOperator.Contains,t),new sap.ui.model.Filter("CHAR_NUMVALDESC",sap.ui.model.FilterOperator.Contains,t)],and:false}))}if(t.length<1){}n.filter(s)},OnCreate_submit:function(){a.create.close();var e=sap.ui.getCore().byId("idList1").getItems();e.forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})});var t=this.getOwnerComponent().getModel("oData");var o=this.byId("table");var s=sap.ui.getCore().byId("table3").getItems();var r=this.getOwnerComponent().getModel("oGmodel");var i=[];var l=[];t.read("/Unique_ID_Header1",{success:function(e){var r=e.results;var g={UNIQUE_ID:r.length+1,PRODUCT_ID:sap.ui.getCore().byId("Configurable_Product").getValue(),UID_TYPE:sap.ui.getCore().byId("UniqueType").getSelectedKey(),ACTIVE:o.getSelectedItem().getBindingContext().getObject().ACTIVE,UNIQUE_DESC:sap.ui.getCore().byId("UniqueDescription").getValue()};i.push(g);t.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"V1",Data:null},success:function(e){var o=JSON.parse(e.seed_order);for(var n=0;n<s.length;n++){for(var r=0;r<o.length;r++){if(s[n].getBindingContext().getObject().CHARVAL_NUM==o[r].CHARVAL_NUM&&s[n].getBindingContext().getObject().CHAR_NUMVALDESC==o[r].CHAR_NUMVALDESC){let e={UNIQUE_ID:i[0].UNIQUE_ID,PRODUCT_ID:i[0].PRODUCT_ID,CHAR_NUM:parseInt(o[r].CHAR_NUM),CHAR_NUMVAL:o[r].CHAR_NUMVAL,NEW_VAL:s[n].getBindingContext().getObject().CHAR_NUMVALDESC};l.push(e)}}}console.log(l);t.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"C",Data:JSON.stringify(i)},success:function(){console.log("Successfully created ")},error:function(e){console.log(e)}});t.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"C1",Data:JSON.stringify(l)},success:function(){console.log("successfully created")},error:function(e){console.log(e)}});a.Listclick()},err:function(e){console.log(e)}});n.show("Sucessfully created")}})},Switch_case_change:function(e){var t=this.getOwnerComponent().getModel("oData");var o=e.getSource().getState();var n=[];var s={UNIQUE_ID:e.getSource().getBindingContext().getObject().UNIQUE_ID,ACTIVE:o};n.push(s);t.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"U",Data:JSON.stringify(n)},success:function(e){console.log("successfully created")},error:function(e){console.log(e)}})},Copy_fragment_open:function(){var e=this.byId("table");var t=this.byId("_IDGenInput1").mProperties.value;var o=this.byId("_IDGenComboBox1")._lastValue;if(!(e.getSelectedItem()&&t&&o)){alert("Please select the options")}else{var n=e.getSelectedItem().getBindingContext().getObject();sap.ui.getCore().byId("Configurable_Product1").setValue(t);sap.ui.getCore().byId("UniqueType1").setSelectedKey(n.UID_TYPE);sap.ui.getCore().byId("ActiveStatus1").setValue(n.ACTIVE);sap.ui.getCore().byId("UniqueDescription1").setValue(n.UNIQUE_DESC);var s=a.getOwnerComponent().getModel("oGmodel");sap.ui.getCore().byId("table6").setModel(s);a.copy.open()}},Copy_fragment_close:function(){sap.ui.getCore().byId("table6").setModel(new sap.ui.model.json.JSONModel({}));a.copy.close()},characetristicsclose:function(){a.copy_options.close();var e=sap.ui.getCore().byId("idList").getItems();e.forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})})},copy_characteristics_options:function(){var e=this.getOwnerComponent().getModel("oData");e.read("/CHAR_NUMVAL1",{success:function(e){var t=e.results;const o=[];const n=new Set;for(const e of t){const t=e.CHARVAL_NUM;if(!n.has(t)){o.push(e);n.add(t)}}var s=[];for(var r=0;r<o.length;r++){var i={CHARVAL_NUM:o[r].CHARVAL_NUM};var l=0;for(var g=0;g<t.length;g++){if(o[r].CHARVAL_NUM==t[g].CHARVAL_NUM){i["name"+l++]=t[g].CHAR_NUMVALDESC}}s.push(i)}var u=new sap.ui.model.json.JSONModel;u.setData({items4:s});sap.ui.getCore().byId("idList").setModel(u);var c=a.getOwnerComponent().getModel("oGmodel");var d=sap.ui.getCore().byId("idList");var C=sap.ui.getCore().byId("table6").getItems();C.forEach(e=>{d.getItems().forEach(t=>{if(t.getContent()[0].getHeaderText()===e.getBindingContext().getObject().CHARVAL_NUM){t.getContent()[0].getContent()[0].getButtons().forEach(t=>{if(t.getText()==e.getBindingContext().getObject().CHAR_NUMVALDESC){t.getParent().getParent().setExpanded(true);t.setSelected(true)}})}})})},err:function(e){console.log(e)}});a.copy_options.open()},on_characteristics_submit:function(){a.copy_options.close();var e=sap.ui.getCore().byId("idList");var t=[];sap.ui.getCore().byId("table6").getItems().forEach(e=>{t.push(e.getBindingContext().getObject())});var o=new sap.ui.model.json.JSONModel;var n=[];e.getItems().forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(t=>{if(t.getSelected()){var o={CHARVAL_NUM:e.getContent()[0].getHeaderText(),CHAR_NUMVALDESC:t.getText()};n.push(o)}})});let s=t.concat(n);s=s.map(e=>({CHARVAL_NUM:e.CHARVAL_NUM,CHAR_NUMVALDESC:e.CHAR_NUMVALDESC}));let r=s.filter((e,t)=>{const o=JSON.stringify(e);return t===s.findIndex(e=>JSON.stringify(e)===o)});o.setData({items2:r});sap.ui.getCore().byId("table6").setModel(new sap.ui.model.json.JSONModel({}));sap.ui.getCore().byId("table6").setModel(o);var i=sap.ui.getCore().byId("idList").getItems();i.forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})})},copy_charac_search:function(e){var t=e.getParameters().newValue;var o=sap.ui.getCore().byId("idList");var n=o.getBinding("items");var s=[];if(t&&t.length>0){s.push(new sap.ui.model.Filter({filters:[new sap.ui.model.Filter("CHARVAL_NUM",sap.ui.model.FilterOperator.Contains,t)],and:false}));var a=sap.ui.getCore().byId("idList").getItems();a.forEach(e=>{e.getContent()[0].getContent()[0].getButtons().forEach(e=>{e.setSelected(false)})})}if(t.length<1){var r=sap.ui.getCore().byId("idList");var i=sap.ui.getCore().byId("table6").getItems();i.forEach(e=>{r.getItems().forEach(t=>{if(t.getContent()[0].getHeaderText()===e.getBindingContext().getObject().CHARVAL_NUM){t.getContent()[0].getContent()[0].getButtons().forEach(t=>{if(t.getText()==e.getBindingContext().getObject().CHAR_NUMVALDESC){t.getParent().getParent().setExpanded(true);t.setSelected(true)}})}})})}var i=n.filter(s)},delete_row_6:function(e){var t=sap.ui.getCore().byId("table6").getModel().getData().items2;var o=parseInt(e.getSource().getBindingContext().getPath().split("/")[2]);let n=t.filter(e=>t.indexOf(e)!==o);var s=new sap.ui.model.json.JSONModel;s.setData({items2:n});sap.ui.getCore().byId("table6").setModel(s)},on_copy_data_submit:function(){var e=this.byId("table");var t=sap.ui.getCore().byId("table6").getItems();var o=this.getOwnerComponent().getModel("oData");var s=[];var r=[];o.read("/Unique_ID_Header1",{success:function(n){var i=n.results;var l={UNIQUE_ID:i.length+1,PRODUCT_ID:sap.ui.getCore().byId("Configurable_Product1").getValue(),UID_TYPE:sap.ui.getCore().byId("UniqueType1").getSelectedKey(),ACTIVE:e.getSelectedItem().getBindingContext().getObject().ACTIVE,UNIQUE_DESC:sap.ui.getCore().byId("UniqueDescription1").getValue()};s.push(l);o.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"V1",Data:null},success:function(e){var n=JSON.parse(e.seed_order);for(var i=0;i<t.length;i++){for(var l=0;l<n.length;l++){if(t[i].getBindingContext().getObject().CHARVAL_NUM==n[l].CHARVAL_NUM&&t[i].getBindingContext().getObject().CHAR_NUMVALDESC==n[l].CHAR_NUMVALDESC){var g={UNIQUE_ID:s[0].UNIQUE_ID,PRODUCT_ID:s[0].PRODUCT_ID,CHAR_NUM:parseInt(n[l].CHAR_NUM),CHAR_NUMVAL:n[l].CHAR_NUMVAL,NEW_VAL:t[i].getBindingContext().getObject().CHAR_NUMVALDESC};r.push(g)}}}o.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"C",Data:JSON.stringify(s)},success:function(){console.log("Successfully created ")},error:function(e){console.log(e)}});o.callFunction("/seed_order",{method:"GET",urlParameters:{FLAG:"C1",Data:JSON.stringify(r)},success:function(){console.log("successfully created")},error:function(e){console.log(e)}});a.Listclick()}})},err:function(e){console.log(e)}});n.show("Sucessfully created");a.copy.close()},Sample123:function(){console.log("what is that ")},Table_sort:function(){var e=a.byId("table");var t=e.getBinding("items");var o=new s("UNIQUE_ID",false);t.sort(o)}})});
},
	"seeduniqueorder/i18n/i18n.properties":'# This is the resource bundle for seeduniqueorder\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=A Fiori application.\n#XTIT: Main view title\ntitle=App Title',
	"seeduniqueorder/manifest.json":'{"_version":"1.49.0","sap.app":{"id":"seeduniqueorder","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.10.1","toolsId":"52808a93-8be6-48ce-af1a-afe7c7c198bf"},"dataSources":{"mainService":{"uri":"v2/catalog/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.115.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"seeduniqueorder.i18n.i18n"}},"oData":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"oGmodel":{"type":"sap.ui.model.json.JSONModel"},"oGmodel1":{"type":"sap.ui.model.json.JSONModel"},"oModel2":{"type":"sap.ui.model.json.JSONModel"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"seeduniqueorder.view","controlAggregation":"pages","controlId":"_IDGenFlexibleColumnLayout1","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":":?query:","target":["TargetView1","Detail"]},{"name":"Detail","pattern":"Detail","target":["TargetView1","Detail"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"controlAggregation":"beginColumnPages","viewId":"View1","viewName":"View1"},"Detail":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"controlAggregation":"midColumnPages","viewId":"Detail","viewName":"Detail"}}},"rootView":{"viewName":"seeduniqueorder.view.App","type":"XML","async":true,"id":"App"}}}',
	"seeduniqueorder/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"seeduniqueorder/view/App.view.xml":'<mvc:View xmlns:f="sap.f" controllerName="seeduniqueorder.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"   height="100%" ><App id="app"   ><f:FlexibleColumnLayout id="_IDGenFlexibleColumnLayout1"   ></f:FlexibleColumnLayout></App></mvc:View>\n',
	"seeduniqueorder/view/Detail.view.xml":'<mvc:View controllerName="seeduniqueorder.controller.Detail"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Page id="page" ><customHeader><Toolbar id="_IDGenToolbar1" ><Text id="_IDGenText1" text="Characteristic name and value" textAlign="Center"  ></Text><ToolbarSpacer id="_IDGenToolbarSpacer1" ></ToolbarSpacer><Button   id="dcdcds" icon="sap-icon://decline" press="onClose" type="Reject" /></Toolbar></customHeader><subHeader><Toolbar ><SearchField   width="45%"  liveChange="Characteristic_value_search"  ></SearchField><Button  text="Create Order"  type="Accept"  press="open_order_frag" ></Button></Toolbar></subHeader><Table  id="Table2"  items="{/items2}" ><columns><Column ><Text  text="CHARVAL_NUM"></Text></Column><Column ><Text  text="CHAR_NUMVALDESC"></Text></Column></columns><items><ColumnListItem ><Text  text="{CHARVAL_NUM}"></Text><Text   text="{CHAR_NUMVALDESC}" ></Text></ColumnListItem></items></Table></Page></mvc:View>\n',
	"seeduniqueorder/view/View1.view.xml":'<mvc:View xmlns:vk="sap.ui.vk" xmlns:uxap="sap.uxap" controllerName="seeduniqueorder.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"  xmlns:core="sap.ui.core" displayBlock="true"\n    xmlns="sap.m"\n\n\t\t   xmlns:layout="sap.ui.layout"\n\t\t   xmlns:m="sap.m"\n    ><Page id="_IDGenPage1"  title="Unique Characteristics"   titleAlignment="Center" ><uxap:ObjectPageLayout id="_IDGenObjectPageLayout1" ><uxap:headerTitle   ><uxap:ObjectPageDynamicHeaderTitle id="_IDGenObjectPageDynamicHeaderTitle1"   ><uxap:expandedHeading   ><m:Title id="_IDGenTitle1" text="Unique Characteristics" wrapping="true"  textAlign="Center"   /></uxap:expandedHeading></uxap:ObjectPageDynamicHeaderTitle></uxap:headerTitle><uxap:headerContent><layout:VerticalLayout id="_IDGenHorizontalLayout1" class="sapUiSmallMarginBeginEnd"><FlexBox  justifyContent="Start"  direction="Column" ><Label id="_IDGenLabel1"  text="Unique Characteristics Search"  ></Label><SearchField id="LiveSearch"  width="100%"  liveChange="Unique_desc_search"  ></SearchField></FlexBox></layout:VerticalLayout><layout:VerticalLayout id="_IDGenVerticalLayout2" class="sapUiSmallMarginBeginEnd"><FlexBox  justifyContent="Start"  direction="Column" ><Label id="label_combo_box"  text="Configureble product" ></Label><Input id="_IDGenInput1" type="Text"  placeholder="Configureble product"  showValueHelp="true" valueHelpRequest="onValueHelpRequest" ></Input></FlexBox></layout:VerticalLayout><layout:VerticalLayout id="_IDGenVerticalLayout3" class="sapUiSmallMarginBeginEnd"><FlexBox  justifyContent="Start"  direction="Column" ><Label id="_IDGenLabel2"  text="Unique type"  ></Label><ComboBox id="_IDGenComboBox1"  placeholder="Product_unique_type"  value="ALL" selectedKey="ALL" ><items><core:Item id="_IDGenItem5"  text="ALL" key="ALL"  ></core:Item><core:Item id="_IDGenItem1"  text="P" ></core:Item><core:Item id="_IDGenItem2"  text="U" ></core:Item></items></ComboBox></FlexBox></layout:VerticalLayout><m:FlexBox id="_IDGenFlexBoxg" wrap="Wrap" fitContainer="true" justifyContent="End" ><layout:VerticalLayout id="_IDGenVerticalLaygout1" class="sapUiSmallMarginBeginEnd"><Button id="_IDGenButton1"  type="Accept" press="Listclick" text="GO" ></Button></layout:VerticalLayout><layout:HorizontalLayout id="_IDGenHorizontalvLayout1" class="sapUiSmallMarginBeginEnd"><Button id="_IDGenButton2"  type="Emphasized"  text="Create"  press="Create_unique_Character" ></Button></layout:HorizontalLayout><layout:VerticalLayout id="_IDGenVerticalLayvout2" class="sapUiSmallMarginBeginEnd"><Button id="_IDGenButton3"   type="Neutral"  text="Copy"  press="Copy_fragment_open" ></Button></layout:VerticalLayout></m:FlexBox></uxap:headerContent><uxap:sections><uxap:ObjectPageSection id="_IDGenObjectPageSection1" ><uxap:subSections><uxap:ObjectPageSubSection id="_IDGenObjectPageSubSection1" ><uxap:blocks><Table id="table"  items="{/items}"  alternateRowColors="true"  selectionChange="handleListPress"  mode="SingleSelectMaster"  ><columns><Column id="_IDGenColumn1" hAlign="Center" ><Text id="_IDGenText1" text="Unique Description"></Text></Column><Column id="_IDGenColumn2"   hAlign="Center"><Text id="_IDGenText2" text="Type"></Text></Column><Column id="_IDGenColumn3" hAlign="Center" ><Text id="_IDGenText3" text="Active"></Text></Column></columns><items><ColumnListItem id="_IDGenColumnListItem1" ><VBox id="_IDGenVBox3" ><Text id="_IDGenText4" text="{UNIQUE_ID}" textAlign="Center"></Text><Text id="_IDGenText5" text="{UNIQUE_DESC}" textAlign="Center" ></Text></VBox><Text id="_IDGenText6"  text="{UID_TYPE}" ></Text><Switch id="_IDGenSwitch1" type="AcceptReject" state="{ACTIVE}"   change="Switch_case_change"   ><layoutData><FlexItemData id="_IDGenFlexItemData1" growFactor="1" /></layoutData></Switch></ColumnListItem></items></Table></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection></uxap:sections></uxap:ObjectPageLayout></Page></mvc:View>\n',
	"seeduniqueorder/view/characteristics_options.fragment.xml":'<core:FragmentDefinition  xmlns:tnt="sap.tnt" xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form" xmlns:l="sap.ui.layout" ><Dialog id="charac_options_frag"  title="Select the Charcteristics"  titleAlignment="Center"  contentHeight="45%" contentWidth="38%" ><content><SearchField  id="Search_char"  liveChange="copy_charac_search"  placeholder="Search Here......."   ></SearchField></content><VBox><List id="idList"   items="{/items4}"    ><items><CustomListItem><Panel expandable="true" headerText="{CHARVAL_NUM}" width="auto" class="sapUiResponsiveMargin"  id="Panel_125"  expanded="false" ><content><RadioButtonGroup  id="Radio_group" ><RadioButton  text="{name0}"  selected="false"  ></RadioButton><RadioButton  text="{name1}"  selected="false" ></RadioButton><RadioButton  text="{name2}" selected="false"  ></RadioButton></RadioButtonGroup></content></Panel></CustomListItem></items></List></VBox><footer   ><tnt:ToolHeader ><ToolbarSpacer ></ToolbarSpacer><Button  text="Submit"  type="Accept" press="on_characteristics_submit" ></Button><Button  text="Close"  type="Reject" press="characetristicsclose" ></Button></tnt:ToolHeader></footer></Dialog></core:FragmentDefinition>',
	"seeduniqueorder/view/characteroptions.fragment.xml":'<core:FragmentDefinition  xmlns:tnt="sap.tnt" xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form" xmlns:l="sap.ui.layout" ><Dialog id="charac"  title="Select the Charcteristics"  titleAlignment="Center"  contentHeight="45%" contentWidth="38%" ><content><SearchField  id="Search_char1"  liveChange="create_char_search"  placeholder="Search Here......."   ></SearchField></content><VBox><List id="idList1"   items="{/items4}"    ><items><CustomListItem><Panel expandable="true" headerText="{CHARVAL_NUM}" width="auto" class="sapUiResponsiveMargin"  id="Panel_1251"  expanded="false" ><content><RadioButtonGroup  id="Radio_group1" select="chars_values_add" ><buttons><RadioButton  text="{name0}"  selected="false" ></RadioButton><RadioButton  text="{name1}"  selected="false" ></RadioButton><RadioButton  text="{name2}" selected="false"  ></RadioButton></buttons></RadioButtonGroup></content></Panel></CustomListItem></items></List></VBox><footer   ><tnt:ToolHeader ><ToolbarSpacer ></ToolbarSpacer><Button  text="Submit"  type="Accept" press="onOptions_select_close" ></Button><Button  text="Close"  type="Reject" press="onOptions_select_close" ></Button></tnt:ToolHeader></footer></Dialog></core:FragmentDefinition>',
	"seeduniqueorder/view/copy.fragment.xml":'<core:FragmentDefinition xmlns:tnt="sap.tnt"   xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form" xmlns:l="sap.ui.layout" ><Dialog  id="Copy"  title="Create Characteristic "  titleAlignment="Center"  contentWidth="30%"   ><f:SimpleForm ><f:content><Label  text="Configurable Product"  /><Input  id="Configurable_Product1"  enabled="false"  /><Label  text="Unique Type"/><ComboBox id="UniqueType1" ><items><core:Item  text="Primary" key="P"></core:Item><core:Item  text="Unique"   key="U" ></core:Item></items></ComboBox><Label  text="Active Status"/><Input  id="ActiveStatus1"  enabled="false" /><Label  text="Unique Description" required="true" /><Input  id="UniqueDescription1" enabled="true"  /></f:content></f:SimpleForm><FlexBox  justifyContent="End" ><Button  icon="sap-icon://add"  type="Accept"  press="copy_characteristics_options" ></Button></FlexBox><Table  id="table6" width="100%"  items="{/items2}" ><columns><Column  hAlign="Center" ><Text text="Char_name"   ></Text></Column><Column hAlign="Center" ><Text text="Char_value"  ></Text></Column><Column  hAlign="Center"></Column></columns><items><ColumnListItem ><Text  text="{CHARVAL_NUM}" textAlign="Center"  id="vcd" ></Text><Text  text="{CHAR_NUMVALDESC}"  textAlign="Center" id="dscudc"  ></Text><Button   type="Reject"  icon="sap-icon://decline"  press="delete_row_6"  id="dscd"  ></Button></ColumnListItem></items></Table><footer   ><tnt:ToolHeader ><ToolbarSpacer ></ToolbarSpacer><Button  text="Create"  type="Accept" press="on_copy_data_submit" ></Button><Button  text="Close"  type="Reject" press="Copy_fragment_close" ></Button></tnt:ToolHeader></footer></Dialog></core:FragmentDefinition>',
	"seeduniqueorder/view/create.fragment.xml":'<core:FragmentDefinition xmlns:tnt="sap.tnt" xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form" xmlns:l="sap.ui.layout"><Dialog  title="Create Unique Characteristic"  titleAlignment="Center"  contentWidth="45%" contentHeight="35%"  class="content_padding"   id="Create_dio"  ><f:SimpleForm id="StudentForm"  layout="ResponsiveGridLayout"   ><f:content  ><Label  text="Configurable Product"  /><Input  id="Configurable_Product"  enabled="false"  /><Label  text="Unique Type"/><ComboBox id="UniqueType"   ><items><core:Item  text="Primary" key="P"  ></core:Item><core:Item  text="Unique"   key="U" ></core:Item></items></ComboBox><Label  text="Active Status"/><Input  id="ActiveStatus"  enabled="false" /><Label  text="Unique Description" required="true" /><Input  id="UniqueDescription" enabled="true"  /></f:content></f:SimpleForm><FlexBox  justifyContent="End" ><Button  icon="sap-icon://add"  type="Accept"  press="onOptions_selectDialog" ></Button></FlexBox><Table  id="table3" width="100%"  delete="" items="{/items5}" ><columns><Column  hAlign="Center" ><Text text="Char_name"   ></Text></Column><Column hAlign="Center" ><Text text="Char_value"  ></Text></Column><Column  hAlign="Center"></Column></columns><items><ColumnListItem ><Text  text="{CHARVAL_NUM}" textAlign="Center" ></Text><Text  text="{CHAR_NUMVALDESC}"  textAlign="Center" ></Text><Button   type="Reject"  icon="sap-icon://decline"  press="delete_row"  ></Button></ColumnListItem></items></Table><footer ><Toolbar  ><ToolbarSpacer ></ToolbarSpacer><Button  type="Accept"  text="Submit" press="OnCreate_submit" ></Button><Button  type="Reject"  text="Cancel" press="onClose_create" ></Button></Toolbar></footer></Dialog></core:FragmentDefinition>',
	"seeduniqueorder/view/order.fragment.xml":'<core:FragmentDefinition  xmlns:tnt="sap.tnt" xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form" xmlns:l="sap.ui.layout" ><Dialog id="characccddcdcd"  title="CREATE SEED ORDER"  titleAlignment="Center"    ><f:SimpleForm id="Order_form"  layout="ResponsiveGridLayout"   ><f:content  ><Label  text="Configurable Product"  /><Input  id="Configurable_Product_1"  enabled="false"  /><Label  text="Unique Id"/><Input  id="UniqueType_1" enabled="false"  /><Label  text="Order Quantity"/><Input  id="ActiveStatus_1"  enabled="true" /><Label  text="Order Date" required="true" /><DatePicker  id="Date_range_1"  valueFormat="dd/MM/yyyy"   ></DatePicker></f:content></f:SimpleForm><footer   ><tnt:ToolHeader ><ToolbarSpacer ></ToolbarSpacer><Button  text="Submit"  type="Accept" press="Submit_order" ></Button><Button  text="Close"  type="Reject" press="close_order_frag" ></Button></tnt:ToolHeader></footer></Dialog></core:FragmentDefinition>\n',
	"seeduniqueorder/view/selection.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" displayBlock="true" ><SelectDialog id="_IDGe"  items="{/items}"  confirm="onValueHelpDialogClose" cancel="onValueHelpDialogClose"  contentHeight="30%" ><StandardListItem id="_IDGenStandardListItem1"  title="{PRODUCT_ID}" ></StandardListItem></SelectDialog></core:FragmentDefinition>'
}});
