/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "excelfileupload/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("excelfileupload.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
              

                var oRouter = this.getRouter()

                if(oRouter)
                {
                    oRouter.initialize()
                }

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
                document.head.appendChild(jQueryScript);
    
                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://unpkg.com/xlsx/dist/xlsx.full.min.js');
                document.head.appendChild(jQueryScript);
            }
        });
    }
);