sap.ui.define([
    "certificationsui/controller/BaseController",
    "sap/ui/model/json/JSONModel",
],
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("certificationsui.controller.Master", {
            onInit: function () {

                this._view = this.getView();
                this._router = this.getRouter();

                let viewModel = new JSONModel({
                    busy: false,
                    delay: 0,
                })

                this.setModel(viewModel, "viewModel");
                this._viewModel = this.getModel("viewModel");

                this._mainModel = this.getOwnerComponent().getModel();
            },

            onItemPress: function (oEvent) {
                let src = oEvent.getSource();
                let sPath = src.getBindingContextPath();

                this._navigateToDetailPage(sPath);
            },


            _navigateToDetailPage: function (sPath) {

                let ID = sPath.match(/\(([^)]+)\)/)[1]
                let sPathEncoded = encodeURIComponent(sPath);
                this.getRouter().navTo("details", {
                    query: {
                        ID,
                        sPathEncoded,
                    },
                });
            },
        });
    });
