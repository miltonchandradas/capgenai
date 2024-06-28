sap.ui.define(
    [
        "certificationsui/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/FilterType",
        "certificationsui/utils/fragmentUtils",
        "certificationsui/utils/fileUploadUtils",
    ],

    function (
        BaseController,
        JSONModel,
        Filter,
        FilterOperator,
        FilterType,
        fragmentUtils,
        fileUploadUtils
    ) {
        "use strict";

        return BaseController.extend("certificationsui.controller.Detail", {

            onInit: async function () {

                this._view = this.getView();
                this._router = this.getRouter();

                // Setting the view model for busy indicators
                let viewModel = new JSONModel({
                    busy: false,
                    delay: 0,

                });

                this.setModel(viewModel, "viewModel");
                this._viewModel = this.getModel("viewModel");

                this._mainModel = this.getOwnerComponent().getModel();


                let oRouter = this.getRouter();
                oRouter.getRoute("details").attachMatched(this._onRouteMatched, this);

            },

            onExit: function () {
                this._reset();
            },

            _onRouteMatched: function (oEvent) {
                let oArgs, oQuery;
                oArgs = oEvent.getParameter("arguments");

                oQuery = oArgs["?query"];
                if (oQuery) {
                    let { ID, sPathEncoded } = oQuery;

                    this._viewModel.setProperty(
                        "/sPath",
                        decodeURIComponent(sPathEncoded)
                    );
                    this._sPath = decodeURIComponent(sPathEncoded);
                    this._viewModel.setProperty(
                        "/ID",
                        ID
                    );
                    this._ID = ID;

                    let oFilter = new Filter("certification_ID", FilterOperator.EQ, ID);
                    this._view.byId("unitsTable").getBinding("items").filter(oFilter, FilterType.Application);

                }
            },

            onGenerateQuestions: async function (oEvent) {
                let src = oEvent.getSource();
                let sPath = src.getBindingContext()?.sPath;
                let ID = sPath.match(/\(([^)]+)\)/)[1]

                let action = this._mainModel.bindContext(`${sPath}/CertificationService.generateQuestions(...)`, null, { ID })

                try {
                    await action.execute()
                    console.log("Questions generated !!")
                } catch (err) {
                    console.error("Error executing action:", err);
                }
            },

            onUploadPDF: async function (oEvent) {

                fragmentUtils.loadFileUploadDialog("certificationsui.fragments.FileUploadDialog", this._view, this);

                // let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
                // console.log(response.data);

                // let src = oEvent.getSource();
                // let sPath = src.getBindingContext()?.sPath;

                // let context = this._mainModel.bindContext(sPath);
                // let data = await context.requestObject()
                // context.getBoundContext().setProperty("content", null)

                // await this._mainModel.submitBatch()
                // console.log("Upload PDF")
            },

            onCloseDialog: function (oEvent) {
                fragmentUtils.closeDialog(this);
            },

            onHandleUploadPress: function (oEvent) {
                fileUploadUtils.handleUploadPress(this);
            },

            onHandleUploadComplete: function (oEvent) {
                fileUploadUtils.handleUploadComplete(oEvent);
            },

            onHandleFileChange: function (oEvent) {
                fileUploadUtils.handleFileChange(oEvent, this);
            },

            onHandleTypeMismatch: function (oEvent) {
                fileUploadUtils.handleTypeMismatch(oEvent);
            },
        });
    }
);
