sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        var that;

        return Controller.extend("treeapp.controller.View1", {
            onInit: function () {
                 that =this
                 let oData = this.getOwnerComponent().getModel()
                 oData.callFunction('/tree', {
                    METHOD: 'GET',
                    urlParameters: {
                        FLAG: "R",
                        Data: null
                    },
                    success: function (response) {
                       let tree_strc1  =  JSON.parse(response.tree)
                       
                       let oModel = new sap.ui.model.json.JSONModel()

                       oModel.setData({
                          items:tree_strc1
                       })
                       that.byId("tree").setModel(oModel) 
                    },
                    err: function (e) {
                        console.log(e)
                    }

                })
                 
            },
            onDragStart : function (oEvent) {
                var oTree = this.byId("tree");
                var oBinding = oTree.getBinding("items");
                var oDragSession = oEvent.getParameter("dragSession");
                var oDraggedItem = oEvent.getParameter("target");
                var iDraggedItemIndex = oTree.indexOfItem(oDraggedItem);
                var aSelectedIndices = oTree.getBinding("items").getSelectedIndices();
                var aSelectedItems = oTree.getSelectedItems();
                var aDraggedItemContexts = [];
    
                if (aSelectedItems.length > 0) {
                    // If items are selected, do not allow to start dragging from a item which is not selected.
                    if (aSelectedIndices.indexOf(iDraggedItemIndex) === -1) {
                        oEvent.preventDefault();
                    } else {
                        for (var i = 0; i < aSelectedItems.length; i++) {
                            aDraggedItemContexts.push(oBinding.getContextByIndex(aSelectedIndices[i]));
                        }
                    }
                } else {
                    aDraggedItemContexts.push(oBinding.getContextByIndex(iDraggedItemIndex));
                }
    
                oDragSession.setComplexData("hierarchymaintenance", {
                    draggedItemContexts: aDraggedItemContexts
                });
            },
    
            onDrop: function (oEvent) {
                var oTree = this.byId("tree");
                var oBinding = oTree.getBinding("items");
                var oDragSession = oEvent.getParameter("dragSession");
                var oDroppedItem = oEvent.getParameter("droppedControl");
                var aDraggedItemContexts = oDragSession.getComplexData("hierarchymaintenance").draggedItemContexts;
                var iDroppedIndex = oTree.indexOfItem(oDroppedItem);
                var oNewParentContext = oBinding.getContextByIndex(iDroppedIndex);
    
                if (aDraggedItemContexts.length === 0 || !oNewParentContext) {
                    return;
                }
    
                var oModel = oTree.getBinding("items").getModel();
                var oNewParent = oNewParentContext.getProperty();
    
                // In the JSON data of this example the children of a node are inside an array with the name "categories".
                if (!oNewParent.categories) {
                    oNewParent.categories = []; // Initialize the children array.
                }
    
                for (var i = 0; i < aDraggedItemContexts.length; i++) {
                    if (oNewParentContext.getPath().indexOf(aDraggedItemContexts[i].getPath()) === 0) {
                        // Avoid moving a node into one of its child nodes.
                        continue;
                    }
    
                    // Copy the data to the new parent.
                    oNewParent.categories.push(aDraggedItemContexts[i].getProperty());
    
                    // Remove the data. The property is simply set to undefined to preserve the tree state (expand/collapse states of nodes).
                    oModel.setProperty(aDraggedItemContexts[i].getPath(), undefined, aDraggedItemContexts[i], true);
                }
            }
        });
    });
