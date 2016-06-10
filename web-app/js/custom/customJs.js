/**
 * Created by abhi on 11/6/16.
 */

var init = {
};

var ajaxCalls = {};
var deleteData = {};
var validateForms = {};
var handleEvents = {
    branchDetailsDataTable : "",


    branchManagementView : function(){
        //hiding branch creation and update form
        $("#branchEditing").hide();
        handleEvents.branchDetailsDataTable = $('#branchDataTable').DataTable();
        handleEvents.branchDetailsDataTable.destroy();
        handleEvents.branchDetailsDataTable = $('#branchDataTable').DataTable({
            "ajax": '../provision/fetchBranchDetails'
        });

    }
};

var show = {};
var commonUtilities = {};

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

