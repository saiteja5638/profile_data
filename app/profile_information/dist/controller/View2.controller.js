sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/Sorter","sap/m/MessageToast"],function(e,t,o){"use strict";var n;return e.extend("profileinformation.controller.View2",{onInit:function(){n=this;var e=sap.ui.core.UIComponent.getRouterFor(n);e.getRoute("create").attachMatched(n.alogo_Select,n);let t=n.getOwnerComponent().getModel("oGmodel");var o=n.getOwnerComponent().getModel("oData");let l=new sap.ui.model.json.JSONModel;o.read("/CP_STAT_METHOD1",{success:function(e){let t=e.results;t.unshift({METHOD:"NONE"});l.setData({items3:t});n.getView().byId("options").setModel(l)}})},back_home:function(){history.go(-1);n.byId("_IDGenText6").setText("Create");n.byId("_IDGenInput1").setValue("");n.byId("_IDGenInput2").setValue("");n.byId("options").setSelectedKey("");n.byId("_IDGenInput1").setEditable(true);n.byId("table2").setModel(new sap.ui.model.json.JSONModel({}))},alogo_Select:function(e){var t=n.getOwnerComponent().getModel("oGmodel");var o=e.getParameter("arguments");if(o.data=="CREATE"){n.alogo_Selection(false)}if(o.data=="COPY"){n.byId("options").setSelectedKey(t.oData.items.METHOD);n.alogo_Selection(t.oData.items.METHOD)}if(o.data=="EDIT"){n.on_Edit_profile();n.alogo_Selection(t.oData.items.METHOD);n.byId("options").setSelectedKey(t.oData.items.METHOD)}},alogo_Selection:function(e){let t;if(e.length>0){t=e}else{t=n.byId("options").getSelectedKey()}const o=n.getOwnerComponent().getModel("oData");o.read("/CP_STAT_METHOD_VAL1",{success:function(e){let o=e.results.filter(e=>e.METHOD===t);o.map(e=>e["DEFAULTVALUE1"]=e.DEFAULTVALUE);const l=n.byId("table2");const s=new sap.ui.model.json.JSONModel;s.setData({items:o});l.setModel(s);var a=n.getOwnerComponent().getModel("oGmodel1");if(a.oData.items2.length>0){var i=n.byId("table2").getItems();for(let e=0;e<a.oData.items2.length;e++){for(let t=0;t<i.length;t++){if(a.oData.items2[e].PARAM==i[t].getBindingContext().getObject().PARAM){i[t].getCells()[4].setValue(a.oData.items2[e].PARAM_VALUE)}}}}},error:function(e){console.log(e)}})},onSave_profile:function(){let e=n.getOwnerComponent().getModel("oData");if(n.byId("_IDGenText6").getText()=="EDIT"){alert("Edit mode")}else{e.read("/CP_STAT_PROFILE1",{success:function(t){let l=0;for(let e=0;e<t.results.length;e++){if(t.results[e].PROFILE==n.byId("_IDGenInput1").getValue()){l=l+1}}if(l>0){o.show("Profile already Exists")}else{let t=new sap.ui.model.json.JSONModel;let l=n.byId("table2").getItems();let s=[];let a=new Date;let i={PROFILE:n.byId("_IDGenInput1").getValue(),PRF_DESC:n.byId("_IDGenInput2").getValue(),METHOD:n.byId("options").getSelectedKey(),CREATED_DATE:a};l.forEach(e=>{let t={PROFILE:n.byId("_IDGenInput1").getValue(),PARAM:e.getBindingContext().getObject().PARAM,PARAM_VALUE:e.getCells()[4].getValue()};s.push(t)});if(!i.PROFILE){o.show("Please enter the above details")}else{let t=[];t.push(i);console.log(s);e.callFunction("/profile",{METHOD:"GET",urlParameters:{FLAG:"C",Data:JSON.stringify(t)},success:function(e){o.show("Created Successfully")},error:function(e){console.log(e)}});e.callFunction("/profile",{METHOD:"GET",urlParameters:{FLAG:"C1",Data:JSON.stringify(s)},success:function(){console.log("successfully created")},err:function(e){console.log(e)}});window.location.reload()}}}})}},on_Edit_profile:function(){let e=n.getOwnerComponent().getModel("oData");e.read("/CP_STAT_PROFILE_VAL1",{success:function(e){let t=n.getOwnerComponent().getModel("oGmodel");n.byId("_IDGenText6").setText("EDIT");n.byId("_IDGenInput1").setValue(t.oData.items.PROFILE);n.byId("_IDGenInput1").setEditable(false);n.byId("_IDGenInput2").setValue(t.oData.items.PRF_DESC);n.byId("options").setSelectedKey(t.oData.items.METHOD)},error:function(e){console.log(e)}})}})});