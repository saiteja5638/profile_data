sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var that;
        return Controller.extend("fiorimediaapp.controller.View1", {
            onInit: function () {
                    that = this;
            },
            onOpenCameraPress: function () {

              navigator.mediaDevices.getUserMedia({
                  video: true
                })
                .then(function (stream) {
                  // Create a new ImageCapture object
                  var track = stream.getVideoTracks()[0];
                  var imageCapture = new ImageCapture(track);
        
                  // Capture an image from the camera
                  return imageCapture.takePhoto();
                })
                .then(function (blob) {
                  // Convert the captured image to a base64 encoded data URL
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    var base64data = reader.result;
        
                    that.byId("myImage").setSrc(base64data)
                  };
                  reader.readAsDataURL(blob);
                })
                .catch(function (error) {
                  console.error("Error accessing the camera:", error);
                });
        
            }
            
        });
    });
