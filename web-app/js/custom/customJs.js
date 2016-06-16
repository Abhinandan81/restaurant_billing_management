/**
 * Created by abhi on 11/6/16.
 */



var init = {
};

var ajaxCalls = {
    branchDetailsDataTable          : "",
    userDetailsDataTable            : "",
    menuDetailsDataTable            : "",
    branchWiseMenuDetailsDataTable  : "",

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
            } ]
        });
    },
    //END : reload the MenuDetailsDataTable

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
                "defaultContent": ["<i id='branchUpdate' class='glyphicon glyphicon-edit text-info dataTableActionMargin' aria-hidden='true'></i>"+
                    "<i id='branchDelete' class='glyphicon glyphicon-trash text-danger dataTableActionMargin' aria-hidden='true'></i>"]
            }]
        });
    }
    //END : reload the branchDetailsDataTable
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
    }
};
var handleEvents = {

//    START : Branch Management view handler
    branchDetailsFromTableRow   :   "",
    branchSubmitUrl             :   "",
    branchId                    :   "",
    branchManagementView : function(){

        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#branchManagementView").addClass('active');

        //hiding branch creation and update form
        $("#branchEditing").hide();
        //reload the branchDetailsDataTable
        ajaxCalls.branchDetailsTableReload();

        //on click to new branch div
        $("#newBranch").click(function(){
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
        $("#cancelButton").click(function(){
           handleEvents.showBranchDetailsTable();
            commonUtilities.removeValidationClass();
        });

        //on branchSubmit (form submit)
        $("#branchSubmit").click(function(){
            validateForms.validateBranchCreation();
        });

        //Function for handling update button click event
        $('body').on('click', '#branchDataTable tbody tr #branchUpdate', function () {

            $("#branchHeader").html("");
            $("#branchHeader").html("Branch Update");

            $("#existingBranchDetails").hide();
            $("#branchEditing").show();

            commonUtilities.clearForm("branchModificationForm");

            handleEvents.branchDetailsFromTableRow = ajaxCalls.branchDetailsDataTable.row( $(this).parents('tr') ).data();
            //pre populate branch details in the input field
            $("#branchName").val(handleEvents.branchDetailsFromTableRow[0]);
            $("#address").val(handleEvents.branchDetailsFromTableRow[1]);
            $("#contactNumber").val(handleEvents.branchDetailsFromTableRow[2]);

            handleEvents.branchId   =   "";
            handleEvents.branchId   =   handleEvents.branchDetailsFromTableRow[3];

            //give a value to the branchSubmit button
            $("#branchSubmit").val("");
            $("#branchSubmit").val("Update");

            handleEvents.branchSubmitUrl = "../restaurantManagement/updateBranch";
        } );

        //Function for handling delete  click event
        $('body').on('click', '#branchDataTable tbody tr #branchDelete', function () {
            $("#deleteBranchModal").modal('show');
            $("#branchNameValidator").val("");
            $("#invalidBranchNameMessage").html("");

            handleEvents.branchDetailsFromTableRow = ajaxCalls.branchDetailsDataTable.row( $(this).parents('tr') ).data();

            handleEvents.branchId   =   "";
            handleEvents.branchId   =   handleEvents.branchDetailsFromTableRow[3];

            $("#branchDeletionMessage").html("");
            $("#branchDeletionMessage").html("If you delete this branch " +handleEvents.branchDetailsFromTableRow[0]+", " +
                "all details related to this will also get deleted.To continue with delete type <b class='text-danger'>"+handleEvents.branchDetailsFromTableRow[0]+
            "</b> in below box.");
        });

        //on click to the confirmBranchDelete
        $("#confirmBranchDelete").click(function(){
            var deleteInputBoxContent   =   $("#branchNameValidator").val();

            if(deleteInputBoxContent == handleEvents.branchDetailsFromTableRow[0]){
                deleteData.deleteBranch();
            }else{
                $("#invalidBranchNameMessage").html("Invalid Branch Name entered");
            }
        });
    },

    showBranchDetailsTable : function(){
        $("#existingBranchDetails").show();
        $("#branchEditing").hide();
    },

    //    END : Branch Management view handler

    //    START : User Management view handler

    userDetailsFromTableRow :   "",
    passwordEditFlag        :   false,
    userUpdateDetailsMap    :   {},
    userManagementView :  function(){
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#userManagementView").addClass('active');

        handleEvents.showExistingUserDetails();

        //load the user details data table
        ajaxCalls.userDetailsDataTableReload();

        //on click to the newUser
        $("#newUser").click(function(){
            //clear the form
            commonUtilities.clearForm("userCreationForm");

            $("#userName").prop('disabled',false);
            $("#password").prop('disabled',false);

            //give the value to the submit button
            $("#userSubmit").val("");
            $("#userSubmit").val("Submit");

            $("#existingUserDetails").hide();
            $("#editUserDetails").hide();
            $("#newUserCreation").show();

            //pre fetch and load the branch names
            show.fetchBranchNameAndAppendOptions("selectBranch");
        });

        $("#userSubmit").click(function(){
            //validate the form
            validateForms.validateUserCreation();
        });

        //on cancelButton click from branch modification form
        $("#cancelButton").click(function(){
            handleEvents.showExistingUserDetails();
            commonUtilities.removeValidationClass();
        });

        //Function for handling update button click event
        $('body').on('click', '#userDataTable tbody tr #userUpdate', function () {


            $("#existingUserDetails").hide();
            $("#newUserCreation").hide();
            $("#editUserDetails").show();

//            commonUtilities.clearForm("userModificationForm")

            handleEvents.userDetailsFromTableRow = ajaxCalls.userDetailsDataTable.row( $(this).parents('tr') ).data();
            //pre populate branch details in the input field
            $("#currentBranch").val(handleEvents.userDetailsFromTableRow[0]);
            $("#currentUserName").val(handleEvents.userDetailsFromTableRow[1]);
            $("#currentFirstName").val(handleEvents.userDetailsFromTableRow[2]);
            $("#currentLastName").val(handleEvents.userDetailsFromTableRow[3]);
            $("#currentContactNumber").val(handleEvents.userDetailsFromTableRow[4]);

            //pre fetch and load the branch names
            show.fetchBranchNameAndAppendOptions("selectNewBranch");

            $("#currentUserName").prop('disabled',true);
            $("#currentBranch").prop('disabled',true);
            $("#newPassword").prop('disabled',true);
        } );

        $("#editPassword").click(function(){
            $("#newPassword").prop('disabled',false);
            handleEvents.passwordEditFlag = true;
        });

        $("#userUpdateSubmit").click(function(){
            //validate the form
            validateForms.validateUserUpdate();
        });

        //on cancelUserUpdate click from branch modification form
        $("#cancelUserUpdate").click(function(){
            handleEvents.showExistingUserDetails();
            commonUtilities.removeValidationClass();
        });

        //Function for handling delete  click event
        $('body').on('click', '#userDataTable tbody tr #userDelete', function () {

            handleEvents.userDetailsFromTableRow = ajaxCalls.userDetailsDataTable.row( $(this).parents('tr') ).data();

            BootstrapDialog.show({
                title:'Delete User',
                type: BootstrapDialog.TYPE_DANGER,
                message:"Do you really want to proceed with the user delete?",
                closable: false,
                buttons: [{
                    id: 'btn-yes',
                    label: 'Yes',
                    cssClass: 'btn-danger',
                    action: function(dialogRef){
                        $.ajax({
                            url: "../restaurantManagement/deleteUser",
                            data:{userId : handleEvents.userDetailsFromTableRow[5]},
                            type: 'POST',
                            success: function(response){
                                if(response.status == true){
                                    //Loading existing user details data to the Data table
                                    ajaxCalls.userDetailsDataTableReload();
                                    commonUtilities.show_stack_bottomleft("success", response.message);
                                }else{
                                    commonUtilities.show_stack_bottomleft("error", response.message);
                                }
                                dialogRef.close();
                            },
                            error: function(response){
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
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }]
            });

        } );
    },

    //function to shoe user management home page
    showExistingUserDetails : function(){
        $("#existingUserDetails").show();
        $("#newUserCreation").hide();
        $("#editUserDetails").hide();
    },

    //before update, collect the updated values
    userUpdateInformationMap    :   function(){
        handleEvents.userUpdateDetailsMap    =   {};

        handleEvents.userUpdateDetailsMap.userId        =   handleEvents.userDetailsFromTableRow[5];
        handleEvents.userUpdateDetailsMap.firstName     =   $("#currentFirstName").val();
        handleEvents.userUpdateDetailsMap.lastName      =   $("#currentLastName").val();
        handleEvents.userUpdateDetailsMap.contactNumber =   $("#currentContactNumber").val();

        if(handleEvents.passwordEditFlag == true && ($("#newPassword").val() != "")){
            handleEvents.userUpdateDetailsMap.password =   $("#newPassword").val();
        }else{
            handleEvents.userUpdateDetailsMap.password  =   "";
        }

        if($("#selectNewBranch").val() == "-- Select Branch --"){
            handleEvents.userUpdateDetailsMap.branchName = "";
        }else{
            handleEvents.userUpdateDetailsMap.branchName = $("#selectNewBranch").val();
        }
    },

    //    END : User Management view handler

    //    START : Menu Management view handler

    menuSubmitUrl   :   "",
    menuDetailsFromTableRow :   "",
    menuId  : "",
    menuManagementView : function(){
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#menuManagementView").addClass('active');
        $("#basicMenuManagementView").addClass('active');

        handleEvents.showExistingMenuDetails();

        ajaxCalls.menuDetailsDataTableReload();

        $("#addNewMenu").click(function(){
            $("#existingMenuDetails").hide();
            $("#menuHandling").show();

            commonUtilities.clearForm("menuForm")

            //change the submit button value
            $("#menuSubmit").val("Submit");
            handleEvents.menuSubmitUrl  =   "../restaurantManagement/newMenu"
        });

        $("#menuSubmit").click(function(){
            validateForms.validateMenuOperation();
        });

        $("#cancelButton").click(function(){
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

            handleEvents.menuDetailsFromTableRow = ajaxCalls.menuDetailsDataTable.row( $(this).parents('tr') ).data();
            //pre populate branch details in the input field
            $("#menuName").val(handleEvents.menuDetailsFromTableRow[0]);
            handleEvents.menuId =   handleEvents.menuDetailsFromTableRow[1];

            handleEvents.menuSubmitUrl  =   "../restaurantManagement/updateMenu"

        } );

        //Function for handling delete button click event
        $('body').on('click', '#menuDataTable tbody tr #menuDelete', function () {

            handleEvents.menuDetailsFromTableRow = ajaxCalls.menuDetailsDataTable.row( $(this).parents('tr') ).data();

            BootstrapDialog.show({
                title:'Delete Menu',
                type: BootstrapDialog.TYPE_DANGER,
                message:"Do you really want to proceed with the menu delete?",
                closable: false,
                buttons: [{
                    id: 'btn-yes',
                    label: 'Yes',
                    cssClass: 'btn-danger',
                    action: function(dialogRef){
                        $.ajax({
                            url: "../restaurantManagement/deleteMenu",
                            data:{menuId : handleEvents.menuDetailsFromTableRow[1]},
                            type: 'POST',
                            success: function(response){
                                if(response.status == true){
                                    //Loading existing user details data to the Data table
                                    ajaxCalls.menuDetailsDataTableReload();
                                    commonUtilities.show_stack_bottomleft("success", response.message);
                                }else{
                                    commonUtilities.show_stack_bottomleft("error", response.message);
                                }
                                dialogRef.close();
                            },
                            error: function(response){
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
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }]
            });

        } );
    },

    showExistingMenuDetails : function(){
        $("#existingMenuDetails").show();
        $("#menuHandling").hide();
    },

    //    END : Menu Management view handler

    //    START : Branch Wise Menu Management view handler

    selectedBranch  :   "",
    branchWiseMenuManagementView : function(){
        //adding active class to current view
        $(".sidebar-menu li").removeClass('active');
        $("#menuManagementView").addClass('active');
        $("#branchMenuManagementView").addClass('active');

        //function to prefetch and display branch names in drop down box
        show.fetchBranchNameAndAppendOptions("branchOptionProvider");

        $("#branchMenuDetailsTable").hide();

        $("#submitBranchChoice").click(function(){
            handleEvents.selectedBranch = $("#branchOptionProvider").val();

            if(handleEvents.selectedBranch == "-- Select Branch --"){
                BootstrapDialog.alert("Please select branch");
            }else{
                show.fetchBranchWiseMenuInformation();
            }
        });
    }

    //    END : Branch Wise Menu Management view handler
};

var show = {

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
        $("#branchMenu").hide();
        ajaxCalls.branchWiseMenuDetailsTableReload();
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

