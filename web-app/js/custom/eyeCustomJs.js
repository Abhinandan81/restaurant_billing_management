/**
 * Created by KS115 on 5/4/16.
 */
//For showing the notifications
function show_stack_bottomleft(type, msg) {
    //var stack_bottomleft = {"dir1": "up", "dir2": "left", "firstpos1": 15, "firstpos2": 15};
    var stack_bottomleft = {"dir1": "right", "dir2": "up", "push": "top"};

    var opts = {
        title: "Over Here",
        text: "Check me out. I'm in a different stack.",
        addclass: "stack-bottomleft",
        delay: 5000,
        stack: stack_bottomleft
    };
    switch (type) {
        case 'error':
            opts.title = "Error message";
            opts.text = msg;
            opts.type = "error";
            break;
        case 'info':
            opts.title = "Informative message";
            opts.text = msg;
            opts.type = "info";
            break;
        case 'success':
            opts.title = "Operation status";
            opts.text = msg;
            opts.type = "success";
            break;
    }
    new PNotify(opts);
}

var dataTable = "";
//    reloading data table
function dataTableReload(tableData) {
    $("#newCategoryModal").modal('hide');
    dataTable = $('#inventoryDataTable').DataTable();
    dataTable.destroy();
    dataTable = $('#inventoryDataTable').DataTable({
        data: tableData,
        "bLengthChange": false,
        "sScrollY": 400,
        "columnDefs": [ {
            "targets": 6,
            "orderable": false
        } ]
    });
}

function jsonInput() {
    $.ajax({
        url: '../inventory/fetchInventoryData',
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            dataTableReload(data);
        },
        error: function () {
        }
    });
}


//    reloading data table
var categoryDataTable = "";

var init = {
    //    reloading data table
    deviceMapDataTable: "",

    //function for checking if map is already present or not
    deviceDataTableLoading: function () {
        $.ajax({
            url: '../device/fetchDeviceMapDetails',
            type: 'GET',
            success: function (response) {
                customEye.initialization.deviceMapDataTableReload(response);
            },
            error: function () {
                alert("Error in loading device map table");
            }
        });
    },


    deviceMapDataTableReload: function (inputData) {
        init.deviceMapDataTable = $('#deviceMapDataTable').DataTable();
        init.deviceMapDataTable.destroy();
        init.deviceMapDataTable = $('#deviceMapDataTable').DataTable({
            data: inputData,
            "columnDefs": [ {
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<button class='btn btn-default'>Show</button>"
                },
                {
                    "targets": -1,
                    "orderable": false
                }
            ]
        });
    }
};

var ajaxCalls = {};
var deleteData = {};
var validateForms = {

    //function for validation JSON input and redirection
    categoryValue: "",
    firmwareValue: "",
    categoryName: "",
    //it helps in deciding which operation to perform(new or update)
    callerEvent : "",

    /* -------------------------- START : category view  -------------------------- */

    /*validating add new category form
        This function is called when :
        1) Creating a new category from category page
        2) update a category from category page
        3) Creating a new category from category page*/
    validateNewCategoryForm: function () {
        $("#newCategoryForm").validate({
            rules: {
                categoryName: {required: true},
                modelNumber: {required: true,
                              exactLength: 4},
                description: {required: true}
            },

            messages: {
                categoryName: "Please enter category name",
                modelNumber: {required :"Please give modelNumber",
                              exactLength : "Model number should have exact length 4"  },
                description: "Please give description"
            },
            //after form validation
            submitHandler: function (form) {

                //enabling the category name  and modelNumber property so that form data can go to back end
                $("#categoryName").prop('disabled', false);
                $("#modelNumber").prop('disabled', false);

                //it will handle three cases
                $(form).ajaxSubmit({
                    url: '../device/newCategory',                                   //Path of the controller action
                    type: 'POST',
                    data : {'categoryOperation' : validateForms.callerEvent},
                    //on successful operation
                    success: function (response) {
                        //1)If call is made from a category page for create and  2)update
                        if (validateForms.callerEvent == "categoryAdd" || validateForms.callerEvent == "categoryUpdate" ) {
                            //And if category is persisted successfully to the database after verifying that
                            // the model number does not exist already for the given category
                            if(response.status == true){
                                //Reload the category data table
                                customEye.eventHandlers.categoryDataTableReload();

                                //clear the form
                                $("#newCategoryForm").trigger("reset");
                                //success notification
                                show_stack_bottomleft("success", response.operationStatus);
                            }else{
                                //If the category update failed exist
                                if(validateForms.callerEvent == "categoryUpdate"){
                                    show_stack_bottomleft("error", response.operationStatus);
                                }else{
                                    show_stack_bottomleft("error", response.operationStatus);
                                }
                            }
                        } else {
                            //3)If call is made from device map creation page
                            //And if category is persisted successfully to the database after verifying that
                            // the model number does not exist already for the given category
                            if(response.status == true){
                                $("#newCategoryModal").modal('hide');
                                show_stack_bottomleft("success", response.operationStatus);
                                customEye.formValidate.validateJson(response.categoryId, '../device/deviceMapCreation');
                            }else{
                                //If the category already exist
                                show_stack_bottomleft("error", response.operationStatus);
                            }
                        }
                    },
                    error: function (response) {
                        show_stack_bottomleft("error", response.operationStatus);
                    }
                });
                return false;
            }
        });
    },
    /* -------------------------- END : category view  -------------------------- */

    /* -------------------------- START : Firmware view validation  -------------------------- */

    validateFirmware: function (caller) {
        $("#firmwareModificationForm").validate({
            errorElement : 'div',

            errorPlacement: function(error, element) {
                error.addClass("customError");
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            },

            rules: {
                modelNumber     :   {required: true},
                productCode     :   {required: true},
                hardwareVersion :   {required: true},
                softwareVersion :   {required: true},
                addOnVersion    :   {required: true}
            },

            messages: {
                modelNumber     :   "Please give model number",
                productCode     :   "Please give product code",
                hardwareVersion :   "Please give hardware version",
                softwareVersion :   "Please give software version",
                addOnVersion    :   "Please give add on version"
            },
            //after form validation
            submitHandler: function (form) {

                if(caller == "Add"){
                    $(form).ajaxSubmit({
                        url: '../device/newFirmware',                                   //Path of the controller action
                        type: 'POST',
                        //on successful operation
                        success: function (response) {
                            if(response.status == true){
                                //Loading existing firmware data to the Data table
                                handleEvents.firmwareDataTableReload();
                                //hiding the new / update firmware creation form
                                $("#modifyFirmware").hide();
                                //show firmware details data table
                                $("#existingFirmwareDetails").show();
                                show_stack_bottomleft("success", response.message);
                            }else{
                                show_stack_bottomleft("error", response.message);
                            }
                        },
                        error: function (response) {
                            show_stack_bottomleft("error", response);
                        }
                    });

                }else if(caller == "Update"){
                    $("#modelNumber").prop('disabled', false);
                    $(form).ajaxSubmit({
                        url: '../device/updateFirmware',                                   //Path of the controller action
                        type: 'POST',
                        //on successful operation
                        success: function (response) {
                            if(response.status == true){
                                //Loading existing firmware data to the Data table
                                handleEvents.firmwareDataTableReload();
                                //hiding the new / update firmware creation form
                                $("#modifyFirmware").hide();
                                //show firmware details data table
                                $("#existingFirmwareDetails").show();
                                show_stack_bottomleft("success", response.message);
                            }else{
                                //Loading existing firmware data to the Data table
                                handleEvents.firmwareDataTableReload();
                                //hiding the new / update firmware creation form
                                $("#modifyFirmware").hide();
                                //show firmware details data table
                                $("#existingFirmwareDetails").show();
                                show_stack_bottomleft("success", response.message);                            }
                        },
                        error: function (response) {
                            show_stack_bottomleft("error", response);
                        }
                    });
                }
                return false;
            }
        });
    },

    /* -------------------------- END : Firmware view validation  -------------------------- */
    /* -------------------------- START : DeviceMap view  -------------------------- */

    //JSON validator
    validateJson: function (category, URL) {
        $("#mappingJson").validateJSON({

            // Compress the result
            // default: false
            compress: false,

            // Prettify the result
            // default: true
            reformat: true,
            // Call on valid
            // default: noop
            onSuccess: function (deviceMap) {
                $.ajax({
                    url: URL,
                    type: 'POST',
                    data: {
                        'category': category,
                        'firmware': handleEvents.deviceFirmwareValue,
                        'deviceMap': JSON.stringify(deviceMap)
                    },
                    success: function (response) {
                        if(response.status == true){
                            $("#deviceMapModal").modal('hide');

                            //take Fuel UX wizard to the step - 1
                            $('#deviceMapWizard').wizard('selectedItem', {
                                step: 1
                            });

                            //Reload the category table of the Fuel UX
                            handleEvents.deviceCategoryTableReload();
                            show_stack_bottomleft("success", "Device map created successfully for " + handleEvents.deviceCategoryName + ' and ' +
                            handleEvents.deviceFirmwareValue);
                        }else{
                            show_stack_bottomleft("error", "Device map creation failed for " + handleEvents.deviceCategoryName + ' and ' +
                            handleEvents.deviceFirmwareValue+" Make sure JSON is in valid form");
                        }
                    },
                    error: function (response) {
                        show_stack_bottomleft("error", "Device map creation failed for " + handleEvents.deviceCategoryName + ' and ' +  handleEvents.deviceFirmwareValue);
                    }
                });
            },

            // Call on invalid
            // default: noop
            onError: function (error) {
                alert("Invalid Json");
            }
        });
    }
    /* -------------------------- END : DeviceMap view  -------------------------- */

};
var handleEvents = {

    //variable for categoryViewEventHandler : for caching selected category value
    categoryValue : "",

    //variable for deviceMapViewHandler : for caching selected category value
    deviceCategoryValue :  "",
    deviceFirmwareValue :  "",
    deviceCategoryName  :  "",

    //Variables for deviceMapDetails view handler
    deviceMapDetailsRow   :   "",

    /* -------------------------- START : category view  -------------------------- */

    categoryViewEventHandler : function() {

        $(".labelColor").addClass('col-md-2');
        $(".buttonAlignment").addClass('col-md-2');


        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#categoryView").addClass('active');

        //init
        $("#modifyCategory").hide();

        //on remove show the existing category form
        $("#remove").click(function(){
            $("#existingCategoryDetails").show();
        });

        //On click submit
        $("#submitButton").click(function () {
            validateForms.callerEvent   = "category"+$("#submitButton").val();
            validateForms.validateNewCategoryForm();
        });

        //Reset new category form
        customEye.eventHandlers.clearForm("newCategoryForm");

        //Loading existing category data to the Data table on document load
        customEye.eventHandlers.categoryDataTableReload();

        //on click of table row get the category ID of selected row into "categoryValue"
        $('body').on('click', '#categoryDataTable tbody tr', function () {
            var tempRow = []; //Flush the tempRow before inserting new entry

            //For toggling the select case
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                handleEvents.categoryValue = "";
            }
            else {
                categoryDataTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                tempRow.push(categoryDataTable.row(this).data()); //insert selected row into temp list
                handleEvents.categoryValue = {}
                handleEvents.categoryValue.categoryName = tempRow[0][0];
                handleEvents.categoryValue.modelNumber  = tempRow[0][1];
                handleEvents.categoryValue.description  = tempRow[0][2];
                handleEvents.categoryValue.categoryId   = tempRow[0][4];
            }
        });

        // new category creation
        $("#newCategory").click(function () {
            customEye.eventHandlers.modifyCategoryBox("create","");
        });

        /*Category deletion : before deleting category check whether any device map is associated with it or not
         */
        $("#deleteCategory").click(function () {
            if (handleEvents.categoryValue == "") {
                alert("Please select a category.");
            } else {
                //call to check whether any device map is associated with it or not
                $.ajax({
                    url: '../device/isDeviceMapAssociatedWithCategory',                                   //Path of the controller action
                    data: {"categoryId" :  handleEvents.categoryValue.categoryId},
                    type: 'POST',
                    success: function (response) {
                        //if deviceMap check operation is successful, show the modal
                        $("#deleteCategoryModal").modal('show');
                        $("#invalidCategoryMessage").html("");
                        $("#categoryNameValidator").val("");

                        //if the deviceMap is associated with the selected category, alert the system user about it
                        if(response.status == true){
                            //set the deviceMapForCategoryStatus to true, so that it helps in cascading delete of device map
                            handleEvents.categoryValue.deviceMapForCategoryStatus    =   true;
                            $("#categoryAssociationMessage").html((response.associatedDeviceMapCount) +" device map is associated with the category: "+
                            (handleEvents.categoryValue.categoryName)+"-"+(handleEvents.categoryValue.modelNumber));

                            //clear the list appended with the <ol> tag
                            $("#categoryAssociatedDeviceMapList").html("");

                            //show user the list of the device map associated with the category
                            $.each(response.deviceMapList,function(index, value){
                                $("#categoryAssociatedDeviceMapList").append('<li>'+value+'</li>');
                            });

                            $("#categoryDeletionMessage").html("If you proceed with the this category deletion, above  associated device map" +
                            " will also get deleted. To continue with delete, type the Category name-Model number in the below box.");

                        }else{
                            //Clearing the html content
                            $("#categoryAssociatedDeviceMapList").html("");
                            $("#categoryAssociationMessage").html("");
                            $("#categoryDeletionMessage").html("");

                            //set the deviceMapForCategoryStatus to true, so that it helps in cascading delete of device map
                            handleEvents.categoryValue.deviceMapForCategoryStatus    =   false;

                            $("#categoryAssociationMessage").html("No device map is associated with this category.");
                            $("#categoryDeletionMessage").html("To continue with delete, type <b>"+ (handleEvents.categoryValue.categoryName)+"-"+(handleEvents.categoryValue.modelNumber)+"</b> in the below box.");
                        }
                    },
                    error: function (response) {
                        show_stack_bottomleft("error", "Category - "+(handleEvents.categoryValue.categoryName)+" deletion failed");
                    }
                });
            }
        });

        //Actual deletion of category and associated deviceMap if it has any, will take place here
        $("#confirmCategoryDelete").click(function () {
            //take the value of the category name user has entered in the text box for validation purpose
            var categoryName    =   $("#categoryNameValidator").val();
            if (categoryName != (handleEvents.categoryValue.categoryName+"-"+handleEvents.categoryValue.modelNumber)) {
                $("#invalidCategoryMessage").html("Category name not matching");
            } else {
                $.ajax({
                    url: '../device/removeCategory',                                   //Path of the controller action
                    data: handleEvents.categoryValue,
                    type: 'POST',
                    success: function (response) {
                        $("#deleteCategoryModal").modal('hide');
                        show_stack_bottomleft("success", "Category - "+(handleEvents.categoryValue.categoryName)+" deleted successfully");
                        customEye.eventHandlers.categoryDataTableReload();
                        handleEvents.categoryValue = "";
                    },
                    error: function (response) {
                        show_stack_bottomleft("error", "Category - "+(handleEvents.categoryValue.categoryName)+" deletion failed");
                    }
                });
            }
        });

        //update category
        $("#updateCategory").click(function () {
            if (handleEvents.categoryValue == "") {
                BootstrapDialog.alert("Please select a category.");
            } else {
                customEye.eventHandlers.modifyCategoryBox("update",handleEvents.categoryValue);
            }
        });

    },

    categoryDataTableReload : function () {
        handleEvents.categoryValue =   "";
    $("#modifyCategory").hide();
    $("#existingCategoryDetails").show();

    categoryDataTable = $('#categoryDataTable').DataTable();
    categoryDataTable.destroy();
    categoryDataTable = $('#categoryDataTable').DataTable({
        "ajax": '../device/fetchCategory'
    });
},

    /*Form for category creation and modification
     * Same form is used for category create and update.
     * Parameters :
     *       1)caller : Depending on the it's caller(create or update) values of the some fields are changed.
     *       2)categoryValue : if it's called from update caller, it is used to pre-fill the update form
     * */
    modifyCategoryBox: function (caller, category) {
        //hide the category details data table
        $("#existingCategoryDetails").hide();
        //show the category creation/modification form
        $("#modifyCategory").show();

        //If call is made for creating a new category
        if (caller == "create") {
            //change the header of the form
            $("#categoryHeader").html('New category creation form');
            //change the value of the submit button
            $("#submitButton").val('Add');

            //enabling the category name property
            $("#categoryName").prop('disabled', false);
            $("#modelNumber").prop('disabled', false);

            //clear the form
            $("#newCategoryForm").trigger("reset");

            //show the clear button
            $("#clearButton").show();
        } else {
        //If call is made for updating the new category
            //change the header of the form
            $("#categoryHeader").html('Category modification form');
            //change the value of the submit button
            $("#submitButton").val('Update');
            //hide the clear button
            $("#clearButton").hide();

            //Pre-fill the values for all the fields on the form and making the categoryName non-editable
            $("#categoryName").val(category.categoryName);
            $("#categoryName").prop('disabled', true);

            $("#modelNumber").val(category.modelNumber);
            $("#modelNumber").prop('disabled', true);
            $("#description").val(category.description);
        }
    },

    //Reset new category form
    clearForm: function (formId) {
        $(".clear").click(function () {
            $("#" + formId).trigger("reset");
        });
    },

    /* -------------------------- END : category view  -------------------------- */

    /* -------------------------- START : DeviceMap view  -------------------------- */
    //deviceMapCategoryTable for category table
    deviceMapCategoryTable : "",
    deviceMapToShow : "",
    deviceCategoryTableReload : function(){
        handleEvents.deviceMapCategoryTable = $('#categoryTable').DataTable();
        handleEvents.deviceMapCategoryTable.destroy();
        handleEvents.deviceMapCategoryTable =   $('#categoryTable').DataTable({
            "ajax": '../device/fetchCategory',
            select: true
        });
    },

    deviceMapViewHandler :  function(){
        //adding a css class to the category form
        $(".labelColor").addClass('categoryLabel');
        $(".labelColor").addClass('col-md-3');
        $(".buttonAlignment").addClass('col-md-3');

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#deviceMapMainView").addClass('active');
        $("#deviceMapView").addClass('active');

        //device map edit and update button div is hidden on page load
        $("#editDeviceMapButton").hide();
        $("#updateDeviceMapButton").hide();

        //FuelUX category data table data table
        handleEvents.deviceCategoryTableReload();

        //on click of table row get the category ID of selected row into "categoryValue"
        $('body').on('click', '#categoryTable tbody tr', function () {
            var tempRow = []; //Flush the tempRow before inserting new entry

            //For toggling the select case
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                handleEvents.deviceCategoryValue = "";
                handleEvents.deviceCategoryName = "";
            }
            else {
                handleEvents.deviceMapCategoryTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                tempRow.push(handleEvents.deviceMapCategoryTable.row(this).data()); //insert selected row into temp list
                handleEvents.deviceCategoryValue = tempRow[0][4];
                handleEvents.deviceCategoryName = tempRow[0][0];
            }
        });

        //firmware data table
        var firmwareTable = $('#firmwareTable').DataTable({
            "ajax": '../device/fetchUniqueFirmware',
            select: true
        });

        //on click of table row get the category ID of selected row into "categoryValue"
        $('body').on('click', '#firmwareTable tbody tr', function () {
            var tempRow = []; //Flush the tempRow before inserting new entry

            //For toggling the select case
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                handleEvents.deviceFirmwareValue = "";
            }
            else {
                firmwareTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                tempRow.push(firmwareTable.row(this).data()); //insert selected row into temp list
                handleEvents.deviceFirmwareValue = tempRow[0][0];
            }
        });

//        FuelUX validation
        $('#deviceMapWizard').wizard().on('actionclicked.fu.wizard', function (e, data) {
            //enable the submit button
            $("#submitMapping").prop('disabled', false);

            if (data.direction === 'next') {
                    if (data.step === 1 && handleEvents.deviceCategoryValue == "") {
                        e.preventDefault();
                        BootstrapDialog.alert("Please select a category");
                    }

                    if (data.step === 2) {
                        if (handleEvents.deviceFirmwareValue == "") {
                            e.preventDefault();
                            BootstrapDialog.alert("Please select a firmware");
                        } else {
                            handleEvents.checkForDeviceMap();
                        }
                    }
                }

                if (data.direction === 'previous') {
                    // Do nothing if you're going to the previous step
                    return;
                }
            }).on('finished.fu.wizard', function (e) {
                customEye.formValidate.validateJson(handleEvents.deviceCategoryValue, '../device/deviceMapCreation');
            });

        //on directly clicking on the top stepper
        $('#deviceMapWizard').wizard().on('changed.fu.wizard', function (e, data) {
            //enable the submit/next button
            $("#submitMapping").prop('disabled', false);
        });

        //On clicking on the the format button, format the json
        $("#formatDeviceMapButton").click(function(){
            show.formatJson("mappingJson");
        });

        //on update button click
        $("#editDeviceMapButton").click(function () {
            $("#formatDeviceMapButton").show();
            $("#updateDeviceMapButton").show();
            $("#mappingJson").prop('disabled', false);
        });

        //on edit button click
        $("#updateDeviceMapButton").click(function () {
            commonUtilities.jsonValidator("mappingJson");
        });

        //minor update to the device map
        $("#minorUpdate").click(function () {
            customEye.formValidate.validateJson(handleEvents.deviceCategoryValue, '../device/deviceMapUpdate');
        });

        // update to the device map with new category
        $("#updateWithNewCategory").click(function () {
            $("#deviceMapModal").modal('hide');
            $("#newCategoryModal").modal('show');
            $("#categoryName").val(handleEvents.deviceCategoryName);
            $("#categoryName").prop('disabled', true);
        });

        //On click submit
        $("#submitButton").click(function () {
            validateForms.callerEvent = "deviceMapCategory"
            customEye.formValidate.validateNewCategoryForm();
        });
    },

    //function for checking if map is already present or not
    checkForDeviceMap : function () {
    $.ajax({
        url: '../device/fetchDeviceMap',
        type: 'POST',
        cache: false,
        data: {category: handleEvents.deviceCategoryValue, firmware: handleEvents.deviceFirmwareValue},
        success: function (response) {
            if (response != "") {
                //if there is a device map
                //disable the textarea as the device map is present already
                $("#mappingJson").prop('disabled', true);
                //show edit device map button
                $("#editDeviceMapButton").show();
                //formatting the deviceMap JSON
                $("#mappingJson").val(JSON.stringify(response));
                customEye.showData.formatJson("mappingJson");

                //disable the submit mapping button
                $("#submitMapping").prop('disabled', true);

                //hide the formatDeviceMapButton button
                $("#formatDeviceMapButton").hide();
            }else{
                //if there is a no device map
                //enable the textarea
                $("#mappingJson").prop('disabled', false);
                //hide edit and update device map button
                $("#editDeviceMapButton").hide();
                $("#updateDeviceMapButton").hide();
                //clearing the text area
                $("#mappingJson").val("");

                //enable the submit mapping button
                $("#submitMapping").prop('disabled', false);
            }
        },
        error: function () {
            alert("Error");
        }
    });
},

    deviceMapDetailsViewHandler : function(){

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#deviceMapMainView").addClass('active');
        $("#deviceMapDetailsView").addClass('active');

        //hide the deviceMapDetailedView
        $("#deviceMapDetailedView").hide();

        //on click of table row get the category ID  and firmware of selected row into "deviceMapDetailsRow"
        $('body').on('click', '#deviceMapDataTable tbody tr', function () {
            var tempRow = []; //Flush the tempRow before inserting new entry

            //For toggling the select case
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                handleEvents.deviceMapDetailsRow = "";
            }
            else {
                init.deviceMapDataTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                tempRow.push(init.deviceMapDataTable.row(this).data()); //insert selected row into temp list
                handleEvents.deviceMapDetailsRow = {};

                handleEvents.deviceMapDetailsRow.categoryName  = tempRow[0][0];
                handleEvents.deviceMapDetailsRow.firmware  = tempRow[0][1];
                handleEvents.deviceMapDetailsRow.category  = tempRow[0][3];
            }
        });

        //Function for handling button click event
        $('body').on('click', '#deviceMapDataTable tbody tr button', function () {
            //hide the device map data table
            $("#deviceMapDetailTable").hide();

            //show the actual device map
            $("#deviceMapDetailedView").show();
            handleEvents.deviceMapToShow = init.deviceMapDataTable.row( $(this).parents('tr') ).data();

            $("#showDeviceMap").val(handleEvents.deviceMapToShow[2]);
            //format the device map json
            show.formatJson("showDeviceMap");
        } );

        //on click goBackToDeviceMapDetailTable - take user to
        $("#goBackToDeviceMapDetailTable").click(function(){
            //show the device map data table
            $("#deviceMapDetailTable").show();
            $("#deviceMapDetailedView").hide();
            //remove the select class of the row
            init.deviceMapDataTable.$('tr.selected').removeClass('selected');
            handleEvents.deviceMapDetailsRow = "";
        });


        //*************************************** START  : device map deletion***************************************

        //Showing warning and validation before delete operation
        $("#deleteDeviceMap").click(function(){
            if(handleEvents.deviceMapDetailsRow == ""){
                BootstrapDialog.alert("Please select a device map to delete")
            }else{
                $("#deleteDeviceMapModal").modal('show');
                $("#deviceMapDeletionMessage").html("To continue with delete, type <b>"+(handleEvents.deviceMapDetailsRow.categoryName)+"-"+(handleEvents.deviceMapDetailsRow.firmware)+
                "</b> in below box.");
            }
        });

        //Deletion of deviceMap will take place here
        $("#confirmDeviceMapDelete").click(function () {
            //take the value of the category name user has entered in the text box for validation purpose
            var categoryName    =   $("#deviceMapValidator").val();
            var categoryToDelete    =   (handleEvents.deviceMapDetailsRow.categoryName)+"-"+(handleEvents.deviceMapDetailsRow.firmware);

            if (categoryName != categoryToDelete) {
                $("#invalidDeviceMapCategory").html("Category name not matching");
            } else {
                $.ajax({
                    url: '../device/removeDeviceMap',                                   //Path of the controller action
                    data: {category: handleEvents.deviceMapDetailsRow.category,
                           firmware: handleEvents.deviceMapDetailsRow.firmware
                    },
                    type: 'POST',
                    success: function (response) {
                        $("#deleteDeviceMapModal").modal('hide');
                        show_stack_bottomleft("success", "Device Map deleted successfully");
                        customEye.initialization.deviceDataTableLoading();
                        handleEvents.deviceMapDetailsRow = "";
                    },
                    error: function (response) {
                        show_stack_bottomleft("error", "Device Map deletion failed");
                    }
                });
            }
        });
        //*************************************** END  : device map deletion***************************************

    },

    /* -------------------------- END : DeviceMap view  -------------------------- */


    /* -------------------------- START : Inventory view  -------------------------- */

    //variables used in file upload process
fd : new FormData(),
uploadedFiles   : [],
fileName        :   "",
uploadObj       :   "",

    resetInventoryUploadModal : function(){
        handleEvents.fileName    =   "";
        handleEvents.uploadedFiles   = [];
        handleEvents.uploadObj.reset();
        // To reset formData
        handleEvents.fd = new FormData();
    },

    inventoryDetailsView : function(){

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#inventoryDetailsView").addClass('active');
        //Loading existing category data to the Data table on document load
        jsonInput();

        //on close of inventory upload
        $("#inventoryUploadClose").click(function(){
            handleEvents.resetInventoryUploadModal();
        });

        $("#addInventory").click(function () {
            $("#addInventoryModal").modal('show');
        });

        handleEvents.fd = new FormData();
        handleEvents.uploadedFiles = [];

        handleEvents.uploadObj = $("#fileUpload").uploadFile({
            multiple:true,
            dragDrop:true,
            //fileName:"myfile",
            autoSubmit: false,
            acceptFiles:"*",
            maxFileSize: 5242880,
            maxFileCount: 1,
            showProgress: true,
            showFileCounter: true,
            showPreview:true,
            previewHeight: "100px",
            previewWidth: "100px",
            onSelect:function(files)
            {
                _.each(files, function(file){
                    handleEvents.uploadedFiles.push(file);
                });

                return true; //to allow file submission.
            },
            onCancel: function(files,pd)
            {
                _.each(files, function(file){
                    handleEvents.uploadedFiles = _.without(handleEvents.uploadedFiles, _.findWhere(handleEvents.uploadedFiles, {name: file}));
                })
            }
        });

        $("#inventoryUpload").click(function() {
            handleEvents.fileName    =   "";
            // Add files to formData
            _.each(handleEvents.uploadedFiles, function(file){
                handleEvents.fileName = file.name + '_' + file.lastModified;
                handleEvents.fd.append(handleEvents.fileName, file);
            });

            if(handleEvents.fileName != ""){
                $.ajax({
                    url: "../inventory/doUpload",
                    type: "POST",
                    data: handleEvents.fd,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        if(response.status == true){
                            $("#addInventoryModal").modal('hide');
                            show_stack_bottomleft("success", response.message );
                            jsonInput();
                            handleEvents.resetInventoryUploadModal();
                        }else{
                            BootstrapDialog.show({
                                title:'Error in file upload',
                                type: BootstrapDialog.TYPE_DANGER,
                                message:response.message,
                                closable: false,
                                buttons: [{
                                    id: 'btn-ok',
                                    label: 'OK',
                                    cssClass: 'btn-primary',
                                    action: function(dialogRef){
                                        dialogRef.close();
                                    }
                                }]
                            });
                            handleEvents.resetInventoryUploadModal();
                        }

                    },
                    error: function(jqXHR, textStatus, errorMessage) {
                        $("#addInventoryModal").modal('hide');
                        handleEvents.resetInventoryUploadModal();
                        show_stack_bottomleft("error", "Failed to upload file, please try again");
                    }
                });
            }else{
                BootstrapDialog.alert("Please select a file for inventory upload");
            }
            // To reset formData
            handleEvents.fd = new FormData();
        });
    },
    /* -------------------------- END : Inventory view  -------------------------- */

    /* -------------------------- START : firmware view  -------------------------- */
    firmwaresDataTable : "",
    firmwareTableRowValue : "",
    submitFunctionCaller : "",


    firmwareView : function(){

        //hiding the new / update category creation form
        $("#modifyFirmware").hide();

        //Loading existing category data to the Data table on document load
        handleEvents.firmwareDataTableReload();

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#firmwareView").addClass('active');

        //Loading existing category data to the Data table on document load
        handleEvents.firmwareDataTableReload();

        //hiding the new / update category creation form
        $("#modifyFirmware").hide();

        //on click to remove button
        $("#removeFirmwareModificationForm").click(function(){
            //hiding the new / update category creation form
            $("#existingFirmwareDetails").show();
            $("#modifyFirmware").hide();
            //resetting the form
            $("#firmwareModificationForm").validate().resetForm();
        });

        //on click to remove button
        $("#cancelButton").click(function(){
            //hiding the new / update category creation form
            $("#existingFirmwareDetails").show();
            $("#modifyFirmware").hide();
            //resetting the form
            $("#firmwareModificationForm").validate().resetForm();
        });

        //add new firmware
        $("#newFirmware").click(function(){
            $("#firmwareSubmit").val("Add");

            $("#firmwareHeader").html("New firmware creation");
            $("#modifyFirmware").show();
            $("#existingFirmwareDetails").hide();
        });

        //firmware form submit
        $("#firmwareSubmit").click(function(){
            handleEvents.submitFunctionCaller    =   $("#firmwareSubmit").val();
            customEye.formValidate.validateFirmware(handleEvents.submitFunctionCaller);
        });


        //Function for handling i click event for firmware update event
        $('body').on('click', '#firmwareDataTable tbody tr #firmwareUpdate', function () {
            handleEvents.firmwareTableRowValue = handleEvents.firmwaresDataTable.row($(this).parents('tr')).data();

            //change the submit button value
            $("#firmwareSubmit").val("Update");

            //pre-filling the firmware details
            $("#modelNumber").val(handleEvents.firmwareTableRowValue[0]);
            $("#productCode").val(handleEvents.firmwareTableRowValue[1]);
            $("#hardwareVersion").val(handleEvents.firmwareTableRowValue[2]);
            $("#softwareVersion").val(handleEvents.firmwareTableRowValue[3]);
            $("#addOnVersion").val(handleEvents.firmwareTableRowValue[4]);

            $("#firmwareHeader").html("firmware update");
            $("#modifyFirmware").show();
            $("#existingFirmwareDetails").hide();


            //disabling the model number field
            $("#modelNumber").prop('disabled', true);
        });

        //Function for handling i click event for firmware delete event
        $('body').on('click', '#firmwareDataTable tbody tr #firmwareDelete', function () {
            handleEvents.firmwareTableRowValue = handleEvents.firmwaresDataTable.row($(this).parents('tr')).data();

            BootstrapDialog.show({
                title:'Delete firmware',
                type: BootstrapDialog.TYPE_DANGER,
                message:"Do you really want to proceed with the firmware delete?",
                closable: false,
                buttons: [{
                    id: 'btn-yes',
                    label: 'Yes',
                    cssClass: 'btn-danger',
                    action: function(dialogRef){
                        $.ajax({
                            url: "../device/deleteFirmware",
                            data:{modelNumber : handleEvents.firmwareTableRowValue[0]},
                            type: 'POST',
                            success: function(response){
                                if(response.status == true){
                                    //Loading existing category data to the Data table
                                    handleEvents.firmwareDataTableReload();
                                    show_stack_bottomleft("success", response.message);
                                }else{
                                    show_stack_bottomleft("error", response.message);
                                }
                                dialogRef.close();
                            },
                            error: function(response){
                                show_stack_bottomleft("error", response.message);
                                dialogRef.close();
                            }
                        });
                    }
                },
                    {
                    id: 'btn-cancel',
                    label: 'Cancel',
                    cssClass: 'btn-primary',
                    action: function(dialogRef){
                        dialogRef.close();
                    }
                }]
            });

        });
    },

//    reloading data table
    firmwareDataTableReload : function () {
    handleEvents.firmwaresDataTable = $('#firmwareDataTable').DataTable();
    handleEvents.firmwaresDataTable.destroy();
    handleEvents.firmwaresDataTable = $('#firmwareDataTable').DataTable({
        "ajax": '../device/fetchUniqueFirmware',
        "sScrollY": 400,
        "bLengthChange": false,
        "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent": ["<i id='firmwareUpdate' class='glyphicon glyphicon-pencil text-info dataTableActionMargin' aria-hidden='true'></i>"+
                                "<i id='firmwareDelete' class='glyphicon glyphicon-trash text-danger dataTableActionMargin' aria-hidden='true'></i>"]
        },
            {
                "targets": -1,
                "orderable": false
            }
        ]
    });
    }
    /* -------------------------- END : firmware view  -------------------------- */
};

var show = {
    //        function for JSON formatting
    formatJson :function (fieldId) {
    $("#"+fieldId).validateJSON({
        reformat: true
    });
}
};
var commonUtilities = {
    //JSON validator
    jsonValidator : function(inputField) {
    $("#"+inputField).validateJSON({
        reformat: true,
        onSuccess: function () {
            show_stack_bottomleft("success", "Valid JSON input");
            $("#deviceMapModal").modal('show');
        },
        onError: function () {
            BootstrapDialog.alert("Invalid Json");
        }
    });
}
};

var customEye = {
    //For initialization
    initialization: init,

//for get data from controller with ajax request(GET/POST)
    getAjaxCall: ajaxCalls,

//for delete request
    deleteCalls: deleteData,

//for validating the forms
    formValidate: validateForms,

//for handling the events on all the views
    eventHandlers: handleEvents,

//For displaying data(tabular & other)
    showData: show,

//For common util functionality
    utils: commonUtilities
};