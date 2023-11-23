sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/FlexibleColumnLayout"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,FlexibleColumnLayout) {
        "use strict";

        return Controller.extend("flexiblecolumnlayout.controller.View1", {
            onInit: function () {
                    this.onNavigateToMidColumn()
            },
            onNavigateToMidColumn: function() {
                this.getView().byId("flexibleColumnLayout").setLayout(FlexibleColumnLayout.LayoutType.MidColumn);
              },
          
              onNavigateToEndColumn: function() {
                this.getView().byId("flexibleColumnLayout").setLayout(FlexibleColumnLayout.LayoutType.EndColumn);
              },
          
              onNavigateBack: function() {
                this.getView().byId("flexibleColumnLayout").backToPage("beginColumnId");
              }
        });
    });
