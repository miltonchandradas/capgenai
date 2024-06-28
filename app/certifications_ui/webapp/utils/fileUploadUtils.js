/* eslint-disable no-console */
sap.ui.define(["sap/m/MessageToast"
], function (MessageToast) {
    "use strict";

    return {

        handleUploadComplete: function (oEvent) {
            console.log("File upload is complete...");
        },

        handleUploadPress: async function (controller) {
            let formData = new FormData();
            formData.append("content", controller._file);

            await axios.put("http://localhost:4004/service/certification/Units(6ce19a66-84dd-42a2-9136-e4b18774bcee)/content", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            MessageToast.show("File uploaded successfully.");

        },

        handleFileChange: function (oEvent, controller) {
            controller._file = oEvent.getParameters().files["0"];
        },

        handleTypeMismatch: function () {
            MessageToast.show("Please upload pdf files only...");
        }

    };

});