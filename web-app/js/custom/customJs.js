/**
 * Created by abhi on 11/6/16.
 */



var init = {
    clearBillForm : function(){
        commonUtilities.clearForm("billingForm");
        $(".dynamicAddition").remove();

        $("#totalBillAmount").text(00);
        $("#menuTotalPrice_1").text("");
        $("#billMenuPrice_1").text("");
        $("#quantity_1").text("");

        //setting today's date to the datepicker
        $("#addBillDate").datepicker("setDate", new Date());

    }
};

var ajaxCalls = {
    branchDetailsDataTable          : "",
    userDetailsDataTable            : "",
    menuDetailsDataTable            : "",
    branchWiseMenuDetailsDataTable  : "",
    groceryDetailsDataTable            : "",
    branchWiseGroceryDetailsDataTable  : "",
    adminViewGroceryDetailsDataTable  : "",


    //START : reload the branchDetailsDataTable
    branchDetailsTableReload :  function(){
        ajaxCalls.branchDetailsDataTable = "";
        ajaxCalls.branchDetailsDataTable = $('#branchDataTable').DataTable();
        ajaxCalls.branchDetailsDataTable.destroy();
        ajaxCalls.branchDetailsDataTable = $('#branchDataTable').DataTable({
            "ajax": '../restaurantManagement/fetchBranchDetails',
//            "sScrollY": 400,
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": ["<i id='branchUpdate' class='glyphicon glyphicon-edit text-info dataTableActionMargin' aria-hidden='true'></i>"+
                    "<i id='branchDelete' class='glyphicon glyphicon-trash text-danger dataTableActionMargin' aria-hidden='true'></i>"]
            },
                {
                    "targets": [1,2,-1],
                    "orderable": false
                }
            ]
        });
    },
    //END : reload the branchDetailsDataTable

    //START : reload the userDetailsDataTable
    userDetailsDataTableReload :  function(){
    ajaxCalls.userDetailsDataTable = "";
    ajaxCalls.userDetailsDataTable = $('#userDataTable').DataTable();
    ajaxCalls.userDetailsDataTable.destroy();
    ajaxCalls.userDetailsDataTable = $('#userDataTable').DataTable({
        "ajax": '../restaurantManagement/fetchUserDetails',
//        "sScrollY": 400,
        "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent": ["<i id='userUpdate' class='glyphicon glyphicon-edit text-info dataTableActionMargin' aria-hidden='true'></i>"+
                "<i id='userDelete' class='glyphicon glyphicon-trash text-danger dataTableActionMargin' aria-hidden='true'></i>"]
        },
            {
                "targets": [3,4],
                "orderable": false
            }
        ]
    });
},
    //END : reload the userDetailsDataTable

    //START : reload the branchDetailsDataTable
    branchWiseMenuDetailsTableReload :  function(){
        ajaxCalls.branchWiseMenuDetailsDataTable = "";
        ajaxCalls.branchWiseMenuDetailsDataTable = $('#branchWiseMenuDataTable').DataTable();
        ajaxCalls.branchWiseMenuDetailsDataTable.destroy();
        ajaxCalls.branchWiseMenuDetailsDataTable = $('#branchWiseMenuDataTable').DataTable({
            "ajax":{
                url : '../restaurantManagement/fetchBranchWiseMenuDetails',
                "data": {"branchName" : handleEvents.selectedBranch}
            },
//            "sScrollY": 400,
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": ["<i id='priceUpdate' class='glyphicon glyphicon-edit text-info dataTableActionMargin' aria-hidden='true'></i>"]
            },
                {
                    "targets": [-1],
                    "orderable": false
                }]
        });
    },
    //END : reload the branchDetailsDataTable

    updateMenuPrice : function(){
        $.ajax({
            url: '../restaurantManagement/updateBranchWiseMenuPrice',                                   //Path of the controller action
            type: 'POST',
            data: {branchMenuId : handleEvents.branchMenuDetailsFromTableRow[2],
                price       : handleEvents.updatedMenuPrice },
            success: function (response) {
                if(response.status == true){
                    $("#updateMenuPriceModal").modal('hide');
                    //reload the branchDetailsDataTable
                    ajaxCalls.branchWiseMenuDetailsTableReload();
                    commonUtilities.show_stack_bottomleft("success", handleEvents.branchMenuDetailsFromTableRow[0]+"'s price updated to Rs."+handleEvents.updatedMenuPrice+" successfully");
                }else{
                    $("#updateMenuPriceModal").modal('hide');
                    commonUtilities.show_stack_bottomleft("error", handleEvents.branchMenuDetailsFromTableRow[0]+"'s price update failed");
                }
            },
            error: function (response) {
                $("#updateMenuPriceModal").modal('hide');
                commonUtilities.show_stack_bottomleft("error", "Please try again later");
            }
        });

    },

    //START : reload the MenuDetailsDataTable
    menuDetailsDataTableReload :  function(){
        ajaxCalls.menuDetailsDataTable = "";
        ajaxCalls.menuDetailsDataTable = $('#menuDataTable').DataTable();
        ajaxCalls.menuDetailsDataTable.destroy();
        ajaxCalls.menuDetailsDataTable = $('#menuDataTable').DataTable({
            "ajax": '../restaurantManagement/fetchMenu',
//        "sScrollY": 400,
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": ["<i id='menuUpdate' class='glyphicon glyphicon-edit text-info dataTableActionMargin' aria-hidden='true'></i>"+
                    "<i id='menuDelete' class='glyphicon glyphicon-trash text-danger dataTableActionMargin' aria-hidden='true'></i>"]
            },
                {
                    "targets": [-1],
                    "orderable": false
                }
            ]
        });
    },
    //END : reload the MenuDetailsDataTable

    //START : reload the GroceryDetailsDataTable
    groceryDetailsDataTableReload :  function(){
        ajaxCalls.groceryDetailsDataTable = "";
        ajaxCalls.groceryDetailsDataTable = $('#groceryDataTable').DataTable();
        ajaxCalls.groceryDetailsDataTable.destroy();
        ajaxCalls.groceryDetailsDataTable = $('#groceryDataTable').DataTable({
            "ajax": '../restaurantManagement/fetchGroceries',
//        "sScrollY": 400,
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": ["<i id='groceryUpdate' class='glyphicon glyphicon-edit text-info dataTableActionMargin' aria-hidden='true'></i>"+
                    "<i id='groceryDelete' class='glyphicon glyphicon-trash text-danger dataTableActionMargin' aria-hidden='true'></i>"]
            },
                {
                    "targets": [-1],
                    "orderable": false
                }
            ]
        });
    },
    //START : reload the GroceryDetailsDataTable

    //START : reload the branchWiseGroceryDetailsTableReload
    branchWiseGroceryDetailsTableReload :  function(){
        ajaxCalls.branchWiseGroceryDetailsDataTable = "";
        ajaxCalls.branchWiseGroceryDetailsDataTable = $('#branchWiseGroceryDataTable').DataTable();
        ajaxCalls.branchWiseGroceryDetailsDataTable.destroy();
        ajaxCalls.branchWiseGroceryDetailsDataTable = $('#branchWiseGroceryDataTable').DataTable({
            "ajax":{
                url : '../restaurantManagement/fetchGroceryStockDetails',
                "data": {"branchName" : handleEvents.selectedBranch}
            }
        });
    },
    //END : reload the branchWiseGroceryDetailsTableReload

    //START : reload the branchWiseGroceryDetailsTableReload
    adminViewGroceryDetailsTableReload :  function(){
        ajaxCalls.adminViewGroceryDetailsDataTable = "";
        ajaxCalls.adminViewGroceryDetailsDataTable = $('#adminViewGroceryDataTable').DataTable();
        ajaxCalls.adminViewGroceryDetailsDataTable.destroy();
        ajaxCalls.adminViewGroceryDetailsDataTable = $('#adminViewGroceryDataTable').DataTable({
            "ajax": '../restaurantManagement/fetchGroceryStockDetails'
        });
    }
    //END : reload the branchWiseGroceryDetailsTableReload
};

var deleteData = {

    deleteBranch : function(){
        $.ajax({
            url: '../restaurantManagement/deleteBranch',                                   //Path of the controller action
            data: {branchId : handleEvents.branchId},
            type: 'POST',
            success: function (response) {
                //reload the branchDetailsDataTable
                ajaxCalls.branchDetailsTableReload();
                $("#deleteBranchModal").modal('hide');
                handleEvents.showBranchDetailsTable();

                commonUtilities.show_stack_bottomleft("success", "Branch - "+(handleEvents.branchDetailsFromTableRow[0])+" deleted successfully");
                handleEvents.branchDetailsFromTableRow = "";
                handleEvents.branchId = "";
            },
            error: function (response) {
                commonUtilities.show_stack_bottomleft("error", "Branch - "+handleEvents.branchDetailsFromTableRow[0]+" deletion failed");
            }
        });
    }
};


var validateForms = {

    validatingMenuQuantity : function(){
        $('.billMenuQuantity').on('keyup keydown', function (e) {
            var code = e.keyCode || e.which;
            if (this.value.length === 0 && code === 96) {
                e.preventDefault();
                $(this).val(1);
            }
        });
    },

//    branch modification form validator
    validateBranchCreation: function () {
        $("#branchModificationForm").validate({
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
                branchName      :   {required: true},
                address         :   {required: true},
                contactNumber   :   {required: true, exactLength: 10}
            },

            messages: {
                branchName      :   "Please give branch name",
                address         :   "Please give branch address",
                contactNumber   :   {required: "Please give contact number",
                                     exactLength: "contact number should be of 10 digit"}

            },
            //after form validation
            submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        url: handleEvents.branchSubmitUrl,                                   //Path of the controller action
                        type: 'POST',
                        data : {branchId : handleEvents.branchId},
                        //on successful operation
                        success: function (response) {
                            if(response.status == true){
                                handleEvents.showBranchDetailsTable();
                                commonUtilities.show_stack_bottomleft("success", response.message);
                                //reload the branchDetailsDataTable
                                ajaxCalls.branchDetailsTableReload();
                                handleEvents.branchSubmitUrl = "";
                            }else{
                                commonUtilities.show_stack_bottomleft("error", response.message);
                            }
                        },
                        error: function (response) {
                            commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                        }
                    });
                return false;
            }
        });
    },

    validateUserCreation: function () {
        $("#userCreationForm").validate({
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
                userName        :   {required: true},
                firstName       :   {required: true},
                lastName        :   {required: true},
                contactNumber   :   {required: true, exactLength: 10},
                password        :   {required : true, minlength: 5}
            },

            messages: {
                userName        :   "Please give user name",
                firstName       :   "Please give first name",
                lastName        :   "Please give last address",
                contactNumber   :   {required: "Please give contact number",
                    exactLength :   "contact number should be of 10 digit"},
                password          :   {required : "Password can not be empty",
                    minlength     : "Password should contain at least 5 characters"}
            },
            //after form validation
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    url: '../restaurantManagement/createUser',                                   //Path of the controller action
                    type: 'POST',
                    //on successful operation
                    success: function (response) {
                        if(response.status == true){
                            handleEvents.showExistingUserDetails();
                            commonUtilities.show_stack_bottomleft("success", response.message);
                            //reload the branchDetailsDataTable
                            ajaxCalls.userDetailsDataTableReload();
                        }else{
                            commonUtilities.show_stack_bottomleft("error", response.message);
                        }
                    },
                    error: function (response) {
                        commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                    }
                });
                return false;
            }
        });
    },

    validateUserUpdate: function () {

        $("#userModificationForm").validate({
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
                firstName       :   {required: true},
                lastName        :   {required: true},
                contactNumber   :   {required: true, exactLength: 10},
                password            :   {required : true, minlength : 5}
            },

            messages: {
                firstName        :   "Please give first name",
                lastName         :   "Please give last address",
                contactNumber    :   {required: "Please give contact number",
                    exactLength  :   "contact number should be of 10 digit"},
                password          :   {required : "Password can not be empty",
                    minlength     : "Password should contain at least 5 characters"}
            },
            //after form validation
            submitHandler: function () {
                handleEvents.userUpdateInformationMap();
                $.ajax({
                    url: '../restaurantManagement/updateUserInformation',                                   //Path of the controller action
                    type: 'POST',
                    data: handleEvents.userUpdateDetailsMap,
                    //on successful operation
                    success: function (response) {
                        if(response.status == true){
                            handleEvents.showExistingUserDetails();
                            commonUtilities.show_stack_bottomleft("success", response.message);
                            //reload the branchDetailsDataTable
                            ajaxCalls.userDetailsDataTableReload();
                        }else{
                            commonUtilities.show_stack_bottomleft("error", response.message);
                        }
                    },
                    error: function (response) {
                        commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                    }
                });
                return false;
            }
        });
    },

    validateMenuOperation: function () {
        $("#menuForm").validate({
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
                menuName        :   {required: true}
            },

            messages: {
                menuName        :   "Please give menu name"
            },
            //after form validation
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    url: handleEvents.menuSubmitUrl,                                   //Path of the controller action
                    type: 'POST',
                    data: {menuId : handleEvents.menuId},
                    //on successful operation
                    success: function (response) {
                        if(response.status == true){
                            handleEvents.showExistingMenuDetails();
                            commonUtilities.show_stack_bottomleft("success", response.message);
                            //reload the branchDetailsDataTable
                            ajaxCalls.menuDetailsDataTableReload();
                        }else{
                            commonUtilities.show_stack_bottomleft("error", response.message);
                        }
                    },
                    error: function (response) {
                        commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                    }
                });
                return false;
            }
        });
    },

    validateGroceryOperation: function () {
        $("#groceryForm").validate({
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
                groceryName        :   {required: true}
            },

            messages: {
                groceryName        :   "Please give grocery name"
            },
            //after form validation
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    url: handleEvents.grocerySubmitUrl,                                   //Path of the controller action
                    type: 'POST',
                    data: {groceryId : handleEvents.groceryId},
                    //on successful operation
                    success: function (response) {
                        if(response.status == true){
                            handleEvents.showExistingGroceryDetails();
                            commonUtilities.show_stack_bottomleft("success", response.message);
                            //reload the branchDetailsDataTable
                            ajaxCalls.groceryDetailsDataTableReload();
                        }else{
                            commonUtilities.show_stack_bottomleft("error", response.message);
                        }
                    },
                    error: function (response) {
                        commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                    }
                });
                return false;
            }
        });
    },

    validateGroceryAddOperation: function () {
        $("#addingGroceryForm").validate({
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
                addGroceryName  :   {required: true},
                addQuantity     :   {required: true},
                addPrice        :   {required: true},
                groceryAddDate  :   {required: true}
            },

            messages: {
                addGroceryName  :   "Please give grocery name",
                addQuantity     :   "Please give grocery quantity",
                addPrice        :   "Please give total grocery price",
                groceryAddDate  :   "Please select Date"
            },
            //after form validation
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    url: '../restaurantManagement/addGroceryToStock',                                   //Path of the controller action
                    type: 'POST',
                    //on successful operation
                    success: function (response) {
                        if(response.status == true){
                            handleEvents.showGroceryStockDetails();
                            commonUtilities.show_stack_bottomleft("success", response.message);
                            //reload the branchDetailsDataTable
                            ajaxCalls.adminViewGroceryDetailsTableReload();
                        }else{
                            commonUtilities.show_stack_bottomleft("error", response.message);
                        }
                    },
                    error: function (response) {
                        commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                    }
                });
                return false;
            }
        });
    },

    validateGroceryDeductOperation: function () {
        $("#deductGroceryForm").validate({
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
                deductGroceryName  :   {required: true},
                deductQuantity     :   {required: true},
                groceryDeductDate  :   {required: true}
            },

            messages: {
                deductGroceryName  :   "Please give grocery name",
                deductQuantity     :   "Please give grocery quantity",
                groceryDeductDate  :    "Please select Date"
            },
            //after form validation
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    url: '../restaurantManagement/deductGroceryFromStock',                                   //Path of the controller action
                    type: 'POST',
                    //on successful operation
                    success: function (response) {
                        if(response.status == true){
                            handleEvents.showGroceryStockDetails();
                            commonUtilities.show_stack_bottomleft("success", response.message);
                            //reload the branchDetailsDataTable
                            ajaxCalls.adminViewGroceryDetailsTableReload();
                        }else{
                            commonUtilities.show_stack_bottomleft("error", response.message);
                        }
                    },
                    error: function (response) {
                        commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                    }
                });
                return false;
            }
        });
    },

    validateBill: function () {
        handleEvents.generateFinalBill();
        $("#billingForm").validate({
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
                customerName      :   {required: true}
            },

            messages: {
                customerName       :   "Please give customer name"
            },
            //after form validation
            submitHandler: function (form) {

                if(handleEvents.isValidMenu == true){
                    $(form).ajaxSubmit({
                        url     : '../restaurantManagement/persistBill',                                   //Path of the controller action
                        type    : 'POST',
                        data    : {
                            allBillMenuDetails : JSON.stringify(handleEvents.allBillMenuDetails),
                            totalBillAmount : handleEvents.totalBillAmount
                        },
                        //on successful operation
                        success: function (response) {
                            if(response.status == true){
                                commonUtilities.show_stack_bottomleft("success", response.message);

                                init.clearBillForm();

                            }else{
                                commonUtilities.show_stack_bottomleft("error", response.message);
                            }
                        },
                        error: function (response) {
                            commonUtilities.show_stack_bottomleft("error", "Please try again after some time.");
                        }
                    });

                }else{
                    commonUtilities.show_stack_bottomleft("error", "Invalid menu name occurred");
                }

                return false;
            }
        });
    }

};
var handleEvents = {

//    START : Branch Management view handler
    branchDetailsFromTableRow: "",
    branchSubmitUrl: "",
    branchId: "",
    branchManagementView: function () {

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#branchManagementView").addClass('active');

        //hiding branch creation and update form
        $("#branchEditing").hide();
        //reload the branchDetailsDataTable
        ajaxCalls.branchDetailsTableReload();

        //on click to new branch div
        $("#newBranch").click(function () {
            $("#branchHeader").html("");
            $("#branchHeader").html("New Branch Creation");

            $("#existingBranchDetails").hide();
            $("#branchEditing").show();
            //clear the form
            $("#branchModificationForm").trigger("reset");

            //give a value to the branchSubmit button
            $("#branchSubmit").val("");
            $("#branchSubmit").val("Submit");
            handleEvents.branchSubmitUrl = "../restaurantManagement/newBranch";
        });

        //on cancelButton click from branch modification form
        $("#cancelButton").click(function () {
            handleEvents.showBranchDetailsTable();
            commonUtilities.removeValidationClass();
        });

        //on branchSubmit (form submit)
        $("#branchSubmit").click(function () {
            validateForms.validateBranchCreation();
        });

        //Function for handling update button click event
        $('body').on('click', '#branchDataTable tbody tr #branchUpdate', function () {

            $("#branchHeader").html("");
            $("#branchHeader").html("Branch Update");

            $("#existingBranchDetails").hide();
            $("#branchEditing").show();

            commonUtilities.clearForm("branchModificationForm");

            handleEvents.branchDetailsFromTableRow = ajaxCalls.branchDetailsDataTable.row($(this).parents('tr')).data();
            //pre populate branch details in the input field
            $("#branchName").val(handleEvents.branchDetailsFromTableRow[0]);
            $("#address").val(handleEvents.branchDetailsFromTableRow[1]);
            $("#contactNumber").val(handleEvents.branchDetailsFromTableRow[2]);

            handleEvents.branchId = "";
            handleEvents.branchId = handleEvents.branchDetailsFromTableRow[3];

            //give a value to the branchSubmit button
            $("#branchSubmit").val("");
            $("#branchSubmit").val("Update");

            handleEvents.branchSubmitUrl = "../restaurantManagement/updateBranch";
        });

        //Function for handling delete  click event
        $('body').on('click', '#branchDataTable tbody tr #branchDelete', function () {
            $("#deleteBranchModal").modal('show');
            $("#branchNameValidator").val("");
            $("#invalidBranchNameMessage").html("");

            handleEvents.branchDetailsFromTableRow = ajaxCalls.branchDetailsDataTable.row($(this).parents('tr')).data();

            handleEvents.branchId = "";
            handleEvents.branchId = handleEvents.branchDetailsFromTableRow[3];

            $("#branchDeletionMessage").html("");
            $("#branchDeletionMessage").html("If you delete this branch " + handleEvents.branchDetailsFromTableRow[0] + ", " +
                "all details related to this will also get deleted.To continue with delete type <b class='text-danger'>" + handleEvents.branchDetailsFromTableRow[0] +
                "</b> in below box.");
        });

        //on click to the confirmBranchDelete
        $("#confirmBranchDelete").click(function () {
            var deleteInputBoxContent = $("#branchNameValidator").val();

            if (deleteInputBoxContent == handleEvents.branchDetailsFromTableRow[0]) {
                deleteData.deleteBranch();
            } else {
                $("#invalidBranchNameMessage").html("Invalid Branch Name entered");
            }
        });
    },

    showBranchDetailsTable: function () {
        $("#existingBranchDetails").show();
        $("#branchEditing").hide();
    },

    //    END : Branch Management view handler

    //    START : User Management view handler

    userDetailsFromTableRow: "",
    passwordEditFlag: false,
    userUpdateDetailsMap: {},
    userManagementView: function () {
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#userManagementView").addClass('active');

        handleEvents.showExistingUserDetails();

        //load the user details data table
        ajaxCalls.userDetailsDataTableReload();

        //on click to the newUser
        $("#newUser").click(function () {
            //clear the form
            commonUtilities.clearForm("userCreationForm");

            $("#userName").prop('disabled', false);
            $("#password").prop('disabled', false);

            //give the value to the submit button
            $("#userSubmit").val("");
            $("#userSubmit").val("Submit");

            $("#existingUserDetails").hide();
            $("#editUserDetails").hide();
            $("#newUserCreation").show();

            //pre fetch and load the branch names
            show.fetchBranchNameAndAppendOptions("selectBranch");
        });

        $("#userSubmit").click(function () {
            //validate the form
            validateForms.validateUserCreation();
        });

        //on cancelButton click from branch modification form
        $("#cancelButton").click(function () {
            handleEvents.showExistingUserDetails();
            commonUtilities.removeValidationClass();
        });

        //Function for handling update button click event
        $('body').on('click', '#userDataTable tbody tr #userUpdate', function () {


            $("#existingUserDetails").hide();
            $("#newUserCreation").hide();
            $("#editUserDetails").show();

//            commonUtilities.clearForm("userModificationForm")

            handleEvents.userDetailsFromTableRow = ajaxCalls.userDetailsDataTable.row($(this).parents('tr')).data();
            //pre populate branch details in the input field
            $("#currentBranch").val(handleEvents.userDetailsFromTableRow[0]);
            $("#currentUserName").val(handleEvents.userDetailsFromTableRow[1]);
            $("#currentFirstName").val(handleEvents.userDetailsFromTableRow[2]);
            $("#currentLastName").val(handleEvents.userDetailsFromTableRow[3]);
            $("#currentContactNumber").val(handleEvents.userDetailsFromTableRow[4]);

            //pre fetch and load the branch names
            show.fetchBranchNameAndAppendOptions("selectNewBranch");

            $("#currentUserName").prop('disabled', true);
            $("#currentBranch").prop('disabled', true);
            $("#newPassword").prop('disabled', true);
        });

        $("#editPassword").click(function () {
            $("#newPassword").prop('disabled', false);
            handleEvents.passwordEditFlag = true;
        });

        $("#userUpdateSubmit").click(function () {
            //validate the form
            validateForms.validateUserUpdate();
        });

        //on cancelUserUpdate click from branch modification form
        $("#cancelUserUpdate").click(function () {
            handleEvents.showExistingUserDetails();
            commonUtilities.removeValidationClass();
        });

        //Function for handling delete  click event
        $('body').on('click', '#userDataTable tbody tr #userDelete', function () {

            handleEvents.userDetailsFromTableRow = ajaxCalls.userDetailsDataTable.row($(this).parents('tr')).data();

            BootstrapDialog.show({
                title: 'Delete User',
                type: BootstrapDialog.TYPE_DANGER,
                message: "Do you really want to proceed with the user delete?",
                closable: false,
                buttons: [
                    {
                        id: 'btn-yes',
                        label: 'Yes',
                        cssClass: 'btn-danger',
                        action: function (dialogRef) {
                            $.ajax({
                                url: "../restaurantManagement/deleteUser",
                                data: {userId: handleEvents.userDetailsFromTableRow[5]},
                                type: 'POST',
                                success: function (response) {
                                    if (response.status == true) {
                                        //Loading existing user details data to the Data table
                                        ajaxCalls.userDetailsDataTableReload();
                                        commonUtilities.show_stack_bottomleft("success", response.message);
                                    } else {
                                        commonUtilities.show_stack_bottomleft("error", response.message);
                                    }
                                    dialogRef.close();
                                },
                                error: function (response) {
                                    commonUtilities.show_stack_bottomleft("error", "Error in deleting user.Please try after some time.");
                                    dialogRef.close();
                                }
                            });
                        }
                    },
                    {
                        id: 'btn-cancel',
                        label: 'Cancel',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }
                ]
            });

        });
    },

    //function to shoe user management home page
    showExistingUserDetails: function () {
        $("#existingUserDetails").show();
        $("#newUserCreation").hide();
        $("#editUserDetails").hide();
    },

    //before update, collect the updated values
    userUpdateInformationMap: function () {
        handleEvents.userUpdateDetailsMap = {};

        handleEvents.userUpdateDetailsMap.userId = handleEvents.userDetailsFromTableRow[5];
        handleEvents.userUpdateDetailsMap.firstName = $("#currentFirstName").val();
        handleEvents.userUpdateDetailsMap.lastName = $("#currentLastName").val();
        handleEvents.userUpdateDetailsMap.contactNumber = $("#currentContactNumber").val();

        if (handleEvents.passwordEditFlag == true && ($("#newPassword").val() != "")) {
            handleEvents.userUpdateDetailsMap.password = $("#newPassword").val();
        } else {
            handleEvents.userUpdateDetailsMap.password = "";
        }

        if ($("#selectNewBranch").val() == "-- Select Branch --") {
            handleEvents.userUpdateDetailsMap.branchName = "";
        } else {
            handleEvents.userUpdateDetailsMap.branchName = $("#selectNewBranch").val();
        }
    },

    //    END : User Management view handler

    //    START : Menu Management view handler

    menuSubmitUrl: "",
    menuDetailsFromTableRow: "",
    menuId: "",
    menuManagementView: function () {
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#menuManagementView").addClass('active');
        $("#basicMenuManagementView").addClass('active');

        handleEvents.showExistingMenuDetails();

        ajaxCalls.menuDetailsDataTableReload();

        $("#addNewMenu").click(function () {
            $("#existingMenuDetails").hide();
            $("#menuHandling").show();

            commonUtilities.clearForm("menuForm")

            //change the submit button value
            $("#menuSubmit").val("Submit");
            handleEvents.menuSubmitUrl = "../restaurantManagement/newMenu"
        });

        $("#menuSubmit").click(function () {
            validateForms.validateMenuOperation();
        });

        $("#cancelButton").click(function () {
            handleEvents.showExistingMenuDetails();
            commonUtilities.removeValidationClass();
        });

        //Function for handling update button click event
        $('body').on('click', '#menuDataTable tbody tr #menuUpdate', function () {

            $("#existingMenuDetails").hide();
            $("#menuHandling").show();

            commonUtilities.clearForm("menuForm")

            //change the submit button value
            $("#menuSubmit").val("Update");

            handleEvents.menuDetailsFromTableRow = ajaxCalls.menuDetailsDataTable.row($(this).parents('tr')).data();
            //pre populate branch details in the input field
            $("#menuName").val(handleEvents.menuDetailsFromTableRow[0]);
            handleEvents.menuId = handleEvents.menuDetailsFromTableRow[1];

            handleEvents.menuSubmitUrl = "../restaurantManagement/updateMenu"

        });

        //Function for handling delete button click event
        $('body').on('click', '#menuDataTable tbody tr #menuDelete', function () {

            handleEvents.menuDetailsFromTableRow = ajaxCalls.menuDetailsDataTable.row($(this).parents('tr')).data();

            BootstrapDialog.show({
                title: 'Delete Menu',
                type: BootstrapDialog.TYPE_DANGER,
                message: "Do you really want to proceed with the menu delete?",
                closable: false,
                buttons: [
                    {
                        id: 'btn-yes',
                        label: 'Yes',
                        cssClass: 'btn-danger',
                        action: function (dialogRef) {
                            $.ajax({
                                url: "../restaurantManagement/deleteMenu",
                                data: {menuId: handleEvents.menuDetailsFromTableRow[1]},
                                type: 'POST',
                                success: function (response) {
                                    if (response.status == true) {
                                        //Loading existing user details data to the Data table
                                        ajaxCalls.menuDetailsDataTableReload();
                                        commonUtilities.show_stack_bottomleft("success", response.message);
                                    } else {
                                        commonUtilities.show_stack_bottomleft("error", response.message);
                                    }
                                    dialogRef.close();
                                },
                                error: function (response) {
                                    commonUtilities.show_stack_bottomleft("error", "Error in deleting user.Please try after some time.");
                                    dialogRef.close();
                                }
                            });
                        }
                    },
                    {
                        id: 'btn-cancel',
                        label: 'Cancel',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }
                ]
            });

        });
    },

    showExistingMenuDetails: function () {
        $("#existingMenuDetails").show();
        $("#menuHandling").hide();
    },

    //    END : Menu Management view handler

    //    START : Branch Wise Menu Management view handler

    selectedBranch: "",
    branchMenuDetailsFromTableRow: "",
    updatedMenuPrice: 0,
    branchWiseMenuManagementView: function () {
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#menuManagementView").addClass('active');
        $("#branchMenuManagementView").addClass('active');

        //function to prefetch and display branch names in drop down box
        show.fetchBranchNameAndAppendOptions("branchOptionProvider");

        $("#branchMenuDetailsTable").hide();

        $("#submitBranchChoice").click(function () {
            handleEvents.selectedBranch = $("#branchOptionProvider").val();

            if (handleEvents.selectedBranch == "-- Select Branch --") {
                BootstrapDialog.alert("Please select branch");
                $("#branchMenuDetailsTable").hide();
            } else {
                show.fetchBranchWiseMenuInformation();
            }
        });

        //Function for handling update button click event
        $('body').on('click', '#branchWiseMenuDataTable tbody tr #priceUpdate', function () {
            $("#invalidMessage").html("");
            handleEvents.branchMenuDetailsFromTableRow = ajaxCalls.branchWiseMenuDetailsDataTable.row($(this).parents('tr')).data();
            $("#updateMenuPriceModal").modal('show');
            $("#menuPrice").val(handleEvents.branchMenuDetailsFromTableRow[1]);


        });

        $("#confirmPriceUpdate").click(function () {
            handleEvents.updatedMenuPrice = $("#menuPrice").val();

            if (handleEvents.updatedMenuPrice == "") {
                $("#invalidMessage").html("Please enter a valid price");
            } else {
                ajaxCalls.updateMenuPrice();
            }
        });
    },
    //    END : Branch Wise Menu Management view handler


    //    START : Grocery Management view handler
    grocerySubmitUrl: "",
    groceryId: "",
    groceryDetailsFromTableRow: "",
    groceryManagementView: function () {
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#groceryManagementView").addClass('active');
        $("#basicGroceryManagementView").addClass('active');

        handleEvents.showExistingGroceryDetails();
        ajaxCalls.groceryDetailsDataTableReload();

        $("#addNewGrocery").click(function () {
            $("#existingGroceryDetails").hide();
            $("#groceryHandling").show();

            commonUtilities.clearForm("groceryForm");

            //change the submit button value
            $("#grocerySubmit").val("Submit");
            handleEvents.grocerySubmitUrl = "../restaurantManagement/newGrocery"
        });

        $("#grocerySubmit").click(function () {
            validateForms.validateGroceryOperation();
        });

        $("#cancelButton").click(function () {
            handleEvents.showExistingGroceryDetails();
            commonUtilities.removeValidationClass();
        });

        //Function for handling update button click event
        $('body').on('click', '#groceryDataTable tbody tr #groceryUpdate', function () {

            $("#existingGroceryDetails").hide();
            $("#groceryHandling").show();

            commonUtilities.clearForm("groceryForm")

            //change the submit button value
            $("#grocerySubmit").val("Update");

            handleEvents.groceryDetailsFromTableRow = ajaxCalls.groceryDetailsDataTable.row($(this).parents('tr')).data();
            //pre populate branch details in the input field
            $("#groceryName").val(handleEvents.groceryDetailsFromTableRow[0]);
            handleEvents.groceryId = handleEvents.groceryDetailsFromTableRow[1];
            handleEvents.grocerySubmitUrl = "../restaurantManagement/updateGrocery"
        });

        //Function for handling delete button click event
        $('body').on('click', '#groceryDataTable tbody tr #groceryDelete', function () {

            handleEvents.groceryDetailsFromTableRow = ajaxCalls.groceryDetailsDataTable.row($(this).parents('tr')).data();

            BootstrapDialog.show({
                title: 'Delete Grocery',
                type: BootstrapDialog.TYPE_DANGER,
                message: "Do you really want to proceed with the grocery delete?",
                closable: false,
                buttons: [
                    {
                        id: 'btn-yes',
                        label: 'Yes',
                        cssClass: 'btn-danger',
                        action: function (dialogRef) {
                            $.ajax({
                                url: "../restaurantManagement/deleteGrocery",
                                data: {groceryId: handleEvents.groceryDetailsFromTableRow[1]},
                                type: 'POST',
                                success: function (response) {
                                    if (response.status == true) {
                                        //Loading existing user details data to the Data table
                                        ajaxCalls.groceryDetailsDataTableReload();
                                        commonUtilities.show_stack_bottomleft("success", response.message);
                                    } else {
                                        commonUtilities.show_stack_bottomleft("error", response.message);
                                    }
                                    dialogRef.close();
                                },
                                error: function (response) {
                                    commonUtilities.show_stack_bottomleft("error", "Error in deleting user.Please try after some time.");
                                    dialogRef.close();
                                }
                            });
                        }
                    },
                    {
                        id: 'btn-cancel',
                        label: 'Cancel',
                        cssClass: 'btn-primary',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }
                ]
            });

        });

    },

    showExistingGroceryDetails: function () {
        $("#existingGroceryDetails").show();
        $("#groceryHandling").hide();
    },

    //    END : Grocery Management view handler


    //    START : BranchWise Grocery Management view handler
    branchWiseGroceryManagementView: function () {
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#groceryManagementView").addClass('active');
        $("#branchGroceryManagementView").addClass('active');

        //function to prefetch and display branch names in drop down box
        show.fetchBranchNameAndAppendOptions("branchOptionProvider");

        $("#branchWiseGroceryDetailsTable").hide();

        $("#submitBranchChoice").click(function () {
            handleEvents.selectedBranch = $("#branchOptionProvider").val();

            if (handleEvents.selectedBranch == "-- Select Branch --") {
                BootstrapDialog.alert("Please select branch");
                $("#branchWiseGroceryDetailsTable").hide();
            } else {
                show.fetchBranchWiseGroceryInformation();
            }
        });

        //Function for handling update button click event
        $('body').on('click', '#branchWiseMenuDataTable tbody tr #priceUpdate', function () {
            $("#invalidMessage").html("");
            handleEvents.branchMenuDetailsFromTableRow = ajaxCalls.branchWiseMenuDetailsDataTable.row($(this).parents('tr')).data();
            $("#updateMenuPriceModal").modal('show');
            $("#menuPrice").val(handleEvents.branchMenuDetailsFromTableRow[1]);


        });

        $("#confirmPriceUpdate").click(function () {
            handleEvents.updatedMenuPrice = $("#menuPrice").val();

            if (handleEvents.updatedMenuPrice == "") {
                $("#invalidMessage").html("Please enter a valid price");
            } else {
                ajaxCalls.updateMenuPrice();
            }
        });
    },
    //    START : BranchWise Grocery Management view handler

    //    START : Admin Grocery Management view handler
    adminGroceryManagementView: function () {
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#adminGroceryManagementView").addClass('active');

        handleEvents.showGroceryStockDetails();

        ajaxCalls.adminViewGroceryDetailsTableReload();

        $("#addGroceryToStock").click(function () {
            $("#addGroceryView").show();
            $("#deductGroceryView").hide();

            commonUtilities.clearForm("addingGroceryForm");
            show.getListOfGroceriesForAutoComplete("addGroceryName");
        });

        $("#addGroceryDate").datepicker({
            format: 'dd/mm/yyyy',
            endDate: '+0d'
        });

        $("#submitGrocery").click(function () {
            validateForms.validateGroceryAddOperation();
        });

        $("#cancelGroceryAddition").click(function () {
            handleEvents.showGroceryStockDetails();
            commonUtilities.removeValidationClass();
        });


        $("#deductGroceryFromStock").click(function () {
            $("#deductGroceryView").show();
            $("#addGroceryView").hide();
            commonUtilities.clearForm("deductGroceryForm");

            show.getListOfGroceriesForAutoComplete("deductGroceryName");
        });

        $('#deductQuantity').on('keyup keydown', function (e) {
            if ($(this).val() > show.availableQuantity
                && e.keyCode != 46
                && e.keyCode != 8
                ) {
                e.preventDefault();
                $(this).val(show.availableQuantity);
                commonUtilities.show_stack_bottomleft("info", "Only " + show.availableQuantity + " quantity available");
            }
        });

        $("#deductGroceryDate").datepicker({
            format: 'dd/mm/yyyy',
            endDate: '+0d'
        });

        $("#deductGrocery").on('click', function () {
            validateForms.validateGroceryDeductOperation();
        });

        $("#cancelGroceryDeduction").click(function () {
            handleEvents.showGroceryStockDetails();
            commonUtilities.removeValidationClass();
        });
    },

    showGroceryStockDetails: function () {
        $("#adminGroceryDetailsTable").show();
        $("#addGroceryView").hide();
        $("#deductGroceryView").hide();
    },
    //    START : Admin Grocery Management view handler

    //    START : Billing Management view handler

    currentMenuId : "",
    currentMenuQuantity : "",
    billingManagementView: function () {

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#billingView").addClass('active');

        //setting today's date to the datepicker
        $("#addBillDate").datepicker("setDate", new Date());

        //for dynamically adding menu items
        handleEvents.addingMenuToBill();

        show.getListOfMenusForAutoComplete();

        //preventing user from entering the 0 as a quantity
        validateForms.validatingMenuQuantity();

        $("#generateBill").click(function(){
            validateForms.validateBill();
        });

        $("#clearBill").click(function(){
            init.clearBillForm();
        });

        //on changing the quantity of the items
        $('input.billMenuQuantity').on("change", function() {
            handleEvents.currentMenuQuantity = $(this).attr('id');

            var splittedString = handleEvents.currentMenuQuantity.split("_");

            if($(this).val() == ""){
                $("#"+handleEvents.currentMenuQuantity).val(1);
                show.updateTotalPriceForMenu("billMenuPrice_"+splittedString[1], "quantity_"+splittedString[1], "menuTotalPrice_"+splittedString[1]);
            }else{
                show.updateTotalPriceForMenu("billMenuPrice_"+splittedString[1], "quantity_"+splittedString[1], "menuTotalPrice_"+splittedString[1]);
            }
        });


        //On addition of the add menu item
        $("#add_field_button").click(function(){

            //fetching menu names
            show.menuAutoComplete("billMenuName");

            $('input.billMenuName').on("focus", function() {
                handleEvents.currentMenuId = $(this).attr('id');
            });

            //preventing user from entering the 0 as a quantity
            validateForms.validatingMenuQuantity();

            $('input.billMenuQuantity').on("change", function() {
                handleEvents.currentMenuQuantity = $(this).attr('id');

                var splittedString = handleEvents.currentMenuQuantity.split("_");

                    if($(this).val() == ""){
                        $("#"+handleEvents.currentMenuQuantity).val(1);
                        show.updateTotalPriceForMenu("billMenuPrice_"+splittedString[1], "quantity_"+splittedString[1], "menuTotalPrice_"+splittedString[1]);
                    }else{
                        show.updateTotalPriceForMenu("billMenuPrice_"+splittedString[1], "quantity_"+splittedString[1], "menuTotalPrice_"+splittedString[1]);
                    }
            });

        });
    },

    addingMenuToBill: function () {

        var max_fields      = 50; //maximum input boxes allowed
        var wrapper         = $(".input_fields_wrap"); //Fields wrapper
        var add_button      = $("#add_field_button"); //Add button ID

        var x = 1; //initlal text box count
        var detailsFilledFlag = 0;

        $(add_button).click(function(e){ //on add input button click

            $('input[name="menuName[]"]').each(function(){
                if($(this).val() == '') {
                    detailsFilledFlag = 0;
                    BootstrapDialog.alert("Please fill the empty entries.");
                } else{
                    detailsFilledFlag = 1;

                }
            });

            if(detailsFilledFlag != 0) {
                e.preventDefault();
                if (x < max_fields) { //max input box allowed
                    x++; //text box increment

                    $(wrapper).append('<div class="row dynamicAddition topDivMargin"><div class="col-md-4"><input id="tempMenuName" class="billMenuName inputBoxWidth" type="text" name="menuName[]" autofocus></div>' +
                        '<div class="col-md-1"><span id="tempPrice" class="billMenuPrice" name="menuPrice[]"></span></div>'+
                        '<div class="col-md-1"><input id="tempQuantity" class="billMenuQuantity inputBoxWidth" type="number" name="quantity[]" min="1"></div>'+
                        '<div class="col-md-1"><span id="tempMenuTotalPrice" class="billMenuTotalPrice" name="menuTotalPrice[]"></span></div>'+
                        '<i id="remove_field" class = "glyphicon glyphicon-remove-circle text-danger dataTableAddActionSize"></i></div>');

                    $("#tempMenuName").attr('id', "billMenuName_" + x);
                    $("#tempPrice").attr('id', "billMenuPrice_" + x);
                    $("#tempQuantity").attr('id', "quantity_" + x);
                    $("#tempMenuTotalPrice").attr('id', "menuTotalPrice_" + x);

                    //set focus
                   /* var menuId = "billMenuName_"+x;
                    console.log("menuId :"+menuId);
                    $("#"+menuId).focus();*/
                }
            }else{
                e.preventDefault();
            }
        });

        $(wrapper).on("click","#remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); x--;

            //update total bill amount
            show.calculateAndUpdateTotalBillAmount();
        });
        //    START : Billing Management view handler
    },

    allBillMenuDetails : [],
    billMenuDetails : {},
    totalBillAmount : 0,
    isValidMenu :  true,
    generateFinalBill : function(){

        handleEvents.allBillMenuDetails = [];
        handleEvents.isValidMenu =  true;

            $("input.billMenuName").each(function(){
            var menuName    =   $(this).val();

            var currentRow   =   $(this).attr('id');
            var splittedString = currentRow.split("_");

            var billMenuPriceId =   "billMenuPrice_"+splittedString[1];
            var quantityId      =   "quantity_"+splittedString[1];
            var menuTotalPriceId=   "menuTotalPrice_"+splittedString[1];

            if(menuName != "" && ($.inArray(menuName, show.listOfMenus) > -1)){
                handleEvents.billMenuDetails = {};

                handleEvents.billMenuDetails.menuName   =   menuName;
                handleEvents.billMenuDetails.menuPrice  =   $("#"+billMenuPriceId).text();
                handleEvents.billMenuDetails.quantity   =   $("#"+quantityId).val();
                handleEvents.billMenuDetails.menuTotalPrice   =   $("#"+menuTotalPriceId).text();

                handleEvents.allBillMenuDetails.push(handleEvents.billMenuDetails);
            }else{
                handleEvents.isValidMenu = false
            }
        });

        handleEvents.totalBillAmount    =   $("#totalBillAmount").text();
    }
};

var show = {
    listOfGroceries     : [],
    listOfMenus         : [],
    selectedGroceryName : "",
    selectedMenuName : "",
    availableQuantity   : 0,
    menuPrice   : 0,

    getListOfGroceriesForAutoComplete : function(fieldId){
        $.ajax({
            url: "../restaurantManagement/fetchGroceriesForAutoComplete",
            type: 'GET',
            success: function(grocery){
                show.listOfGroceries = grocery;
                $("#"+fieldId).autocomplete({
                    source: show.listOfGroceries,
                    autoFocus:true,
                    select: function (event, ui) {
                        show.selectedGroceryName = ui.item.value;
                        if(fieldId == "deductGroceryName"){
                            show.getAvailableGroceryQuantity();
                        }
                    }
                });
            },
            error: function(response){
            }
        });
    },

    getAvailableGroceryQuantity :  function(){
        $.ajax({
            url: '../restaurantManagement/fetchAvailableGroceryQuantity',
            type: 'POST',
            data: {groceryName : show.selectedGroceryName},
            success: function(response){
                if(response.status == true){
                    show.availableQuantity  =   response.message;
                    $("#deductQuantity").val(show.availableQuantity);
                }else{
                    commonUtilities.show_stack_bottomleft("error", response.message);
                }
            },
            error: function(response){
                commonUtilities.show_stack_bottomleft("error", "Please try again later");
            }
        });
    },

    //function to prefetch and display branch names in drop down box
    fetchBranchNameAndAppendOptions : function(selectionId){
        $.ajax({
            url: "../restaurantManagement/fetchBranchNames",
            type: 'GET',
            success: function(branchNameList){
                //show user the list of branches for this restaurant
                $("#"+selectionId).append('<option>-- Select Branch --</option>');
                $.each(branchNameList,function(index, value){
                    $("#"+selectionId).append('<option>'+value+'</option>');
                });
            },
            error: function(response){
            }
        });
    },

    fetchBranchWiseMenuInformation : function(){
        $("#branchMenuDetailsTable").show();

        $("#branchMenuHeader").html(handleEvents.selectedBranch+" - menu price details");
        ajaxCalls.branchWiseMenuDetailsTableReload();
    },

    fetchBranchWiseGroceryInformation : function(){
        $("#branchWiseGroceryDetailsTable").show();

        $("#branchGroceryHeader").html(handleEvents.selectedBranch+" - Grocery Details");
        ajaxCalls.branchWiseGroceryDetailsTableReload();
    },

    getListOfMenusForAutoComplete : function(){

        $.ajax({
            url: "../restaurantManagement/getListOfMenusForAutoComplete",
            type: 'GET',
            success: function(menuList){
                show.listOfMenus = menuList;
                show.menuAutoComplete("billMenuName");
            },
            error: function(response){
            }
        });
    },

    menuAutoComplete :  function(fieldId){
        $("."+fieldId).autocomplete({
            source: show.listOfMenus,
            autoFocus:true,
            select: function (event, ui) {
                show.selectedMenuName = ui.item.value;
                show.getMenuPrice();
            }
        });
    },

    getMenuPrice :  function(){
        $.ajax({
            url: '../restaurantManagement/fetchMenuPrice',
            type: 'POST',
            data: {menuName : show.selectedMenuName},
            success: function(response){
                if(response.status == true){
                    show.menuPrice  =   response.message;
                    if(handleEvents.currentMenuId == ""){
                        $("#billMenuPrice_1").text(show.menuPrice);
                        $("#quantity_1").val(1);

                        //update total price for menu according to quantity
                        show.updateTotalPriceForMenu("billMenuPrice_1", "quantity_1", "menuTotalPrice_1");
                    }else{
                        var splittedString = handleEvents.currentMenuId.split("_");

                        $("#billMenuPrice_"+splittedString[1]).text(show.menuPrice);
                        $("#quantity_"+splittedString[1]).val(1);

                        //update total price for menu according to quantity
                        show.updateTotalPriceForMenu("billMenuPrice_"+splittedString[1], "quantity_"+splittedString[1], "menuTotalPrice_"+splittedString[1]);
                    }
                }else{
                    commonUtilities.show_stack_bottomleft("error", response.message);
                }
            },
            error: function(response){
                commonUtilities.show_stack_bottomleft("error", "Please try again later");
            }
        });
    },

    //updating total menu quantity price
    updateTotalPriceForMenu : function(menuPriceField, menuQuantityField, totalMenuPrice){
        var menuPrice   =   $("#"+menuPriceField).text();
        var menuQuantity   =   $("#"+menuQuantityField).val();

        var menuTotalPrice = 0;
        menuTotalPrice  =   menuPrice * menuQuantity;
        $("#"+totalMenuPrice).text(menuTotalPrice);
        show.calculateAndUpdateTotalBillAmount();
    },

    //calculating total bill amount
    calculateAndUpdateTotalBillAmount :  function(){
        var totalBillAmount  =   0;
        var menuAmount = 0;

        $("span.billMenuTotalPrice").each(function(){
            menuAmount = $(this).text();

            if(menuAmount == ""){
                menuAmount = 0;
            }
            totalBillAmount = totalBillAmount + parseInt(menuAmount, 10);
        });

        $("#totalBillAmount").text(totalBillAmount);
    }
};

var commonUtilities = {
    removeValidationClass : function(){
        //Remove the error class of form(if any errors has occurred previously)
        $("div.error").hide();
        $(".error").removeClass("error");
    },

    clearForm : function(formId){
        $("#"+formId).trigger("reset");
    },

    //For showing the notifications
    show_stack_bottomleft : function(type, msg) {
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
};

var customRestaurantJs = {
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

