sap.ui.define(["sap/ui/core/Fragment"],
    function (Fragment) {
        "use strict";

        return {

            loadFileUploadDialog: function (name, view, controller) {
                if (!controller._fileUploadDialog) {
                    Fragment.load({
                        id: view.getId(),
                        name,
                        controller
                    }).then(oFragment => {
                        controller._fileUploadDialog = oFragment;

                        view.addDependent(controller._fileUploadDialog);
                        controller._fileUploadDialog.open();

                    });
                } else {
                    controller._fileUploadDialog.open();
                }
            },

            closeDialog: function (controller) {
                if (controller._fileUploadDialog) {
                    controller._fileUploadDialog.close();
                    controller._fileUploadDialog.destroy();
                    controller._fileUploadDialog = null;
                }
            },

        };

    });