sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";var t;return e.extend("sampleprofilepredication.controller.View3",{onInit:function(){t=this;var e=t.getOwnerComponent().getModel("oData");var o=new sap.ui.model.json.JSONModel;e.read("/CP_STAT_PROFILE1",{success:function(e){var n=e.results;o.setData({items:n});t.getView().byId("table").setModel(o)},error:function(e){console.log(e)}})},nav_to_create:function(){var e=this.getOwnerComponent().getRouter();e.navTo("View1")}})});