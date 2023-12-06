sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Button) {
        "use strict";
        var that;
        return Controller.extend("fiorimediaapp.controller.View1", {
            onInit: function () {
                    that = this;
                  
            },
            takePic:function()
            {
                that.fixedDialog = new sap.m.Dialog({
                    title: "Take a picture", beginButton: new sap.m.Button({
                        text: "Submit",
                        press: function(oEvt)
                        {
                            that.imageVal = document.getElementById("player")
                            var Button = oEvt.getSource()
                            var imageText = Button.getParent().getContent()[1].getValue()
                            that.fixedDialog.close()
                            that.onExit()
                        }
                    }),
                    content: [
                        new sap.ui.core.HTML({
                            content: "<video  id='player'    autoplay ></video> "
                        }),
                        new sap.m.Input({
                            placeholder:"Enter the content",
                            required:true
                        })
                    ],
                    endButton: new sap.m.Button({
                        text: "Cancel", press: function () {
                            that.fixedDialog.close()
                        }
                    })
                })
                    that.getView().addDependent(that.fixedDialog)
                    this.fixedDialog.attachBeforeClose(this.setImage,this)
                    
                navigator.mediaDevices.getUserMedia({
                    video:true
                }).then(function (stream)
                {
                    player.srcObject = stream
                })
                that.fixedDialog.open()

             

            },
            setImage:function()
            {
                var vBox  = that.getView().byId("vBox1")
                var items = vBox.getItems()
                var snapId = 'saiteja' + items.length;
                var textId = snapId +'-text'
                var imageVal  = that.imageVal

                var oCanvas = new sap.ui.core.HTML({
                    content:"<canvas id='"+snapId+"'width='320px' height='320px'"+"style='2px solid red'> </canvas>" +
                    "<label id='" + textId +"'>"+ this.attachEvent().fixedDialog.mAggregations.content[1].mProperties.value + "</label>" 
                });

                vBox.addItem(oCanvas)
                
                oCanvas.addEventDelegate({
                    onAfterRendering: function() {
                    var snapShotCanvas = document.getElementById(snapId);
                    var oContext = snapShotCanvas.getContext('2d' );
                    oContext.drawImage (imageVal, 0, 0, snapShotCanvas.width, snapShotCanvas.height);
                    
                    }
                })
                
            },
            sendDB:function()
            {
                var canvas = document.getElementById('saiteja0')

                var imageDataURL = canvas.toDataURL("image/png");

                that.byId("image123").setSrc(imageDataURL)
            },
            onExit: function () {
                // Stop the video stream when exiting the application
                if (this.oVideoStream) {
                    this.oVideoStream.getTracks().forEach(function (track) {
                        track.stop();
                    });
                }
            }
         });
    });
