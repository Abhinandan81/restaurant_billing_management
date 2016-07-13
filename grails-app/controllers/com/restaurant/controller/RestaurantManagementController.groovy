package com.restaurant.controller

import com.constants.CodeConstants
import com.utils.ServiceContext
import com.utils.SessionUtil
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class RestaurantManagementController {
    def restaurantManagementService
    def userManagementService
    def springSecurityService
    def commonUtilService

    @Secured(['ROLE_SUPER_ADMIN'])
    def dashboard(){}

    @Secured(['ROLE_SUPER_ADMIN'])
    def getSummaryInformation(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        Map summaryInformation  =   restaurantManagementService.fetchSummaryInformation(sCtx.restaurantId)
        render summaryInformation as JSON
    }

    /*-------------------------- START : Branch Management ---------------------------------*/
    @Secured(['ROLE_SUPER_ADMIN'])
    def branchManagement(){}

    @Secured(['ROLE_SUPER_ADMIN'])
    def newBranch(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        Map branchCreationStatusMap =   restaurantManagementService.newBranchCreation(params.branchName,params.address,
                params.contactNumber, sCtx.restaurantId)
        render branchCreationStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def updateBranch(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        Map detailsToUpdate =   [name: params.branchName, address: params.address, contactNumber : params.contactNumber]
        Map branchUpdateStatusMap   =   restaurantManagementService.updateBranchDetails(params.branchId, sCtx.restaurantId, detailsToUpdate)
        render branchUpdateStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def deleteBranch(){
        Map branchDeletionStatus    =   restaurantManagementService.deleteBranch(params.branchId)
        render branchDeletionStatus as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchBranchDetails(){
        Map branchDetailsMap    =   [:]
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        List allBranchDetailsList   =   restaurantManagementService.branchDetails(sCtx.restaurantId)
        branchDetailsMap << [ data : allBranchDetailsList]
        render branchDetailsMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchBranchNames(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        List branchNameList   =   restaurantManagementService.branchNameByRestaurantId(sCtx.restaurantId)
        render branchNameList as JSON
    }
    /*-------------------------- END : Branch Management ---------------------------------*/

    /*-------------------------- START : Restaurant User Management ----------------------*/

    @Secured(['ROLE_SUPER_ADMIN'])
    def userManagement(){}

    /**
     * New user creation
     * @return : userCreationStatusMap
     */
    @Secured(['ROLE_SUPER_ADMIN'])
    def createUser(){
        String branchId =   ""
        Map userCreationStatusMap   =   [:]
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        branchId =   commonUtilService.fetchBranchIdByNameAndRestaurantId(sCtx.restaurantId, params.branchName)
        if (branchId != ""){
            userCreationStatusMap    =   userManagementService.newUserCreation(params.userName, params.password,
                    params.firstName, params.lastName, params.contactNumber, CodeConstants.ROLE_ADMIN,
                    sCtx.restaurantId, branchId)
        }else {
            userCreationStatusMap << [status : false, message : "Invalid branch name"]
        }
        render userCreationStatusMap as JSON
    }

    /**
     * Updating user information
     * @return : userUpdateStatusMap
     */
    @Secured(['ROLE_SUPER_ADMIN'])
    def updateUserInformation(){
        println "params :"+params
        String branchId = ""
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        //building map for user details to update
        Map detailsToUpdate =  [firstName : params.firstName, lastName : params.lastName, contactNumber: params.contactNumber]
        if (params.branchName != ""){
            branchId =   commonUtilService.fetchBranchIdByNameAndRestaurantId(sCtx.restaurantId, params.branchName)
            if (branchId != ""){
                detailsToUpdate << [branchId : branchId]
            }
        }

        if (params.password != ""){
            detailsToUpdate << [password : params.password]
        }

        Map  userUpdateStatusMap = userManagementService.updateUserInformation(params.userId, detailsToUpdate)
        render userUpdateStatusMap as JSON
    }

    /**
     * Deleting the user
     * @return : userDeletionStatusMap
     */
    @Secured(['ROLE_SUPER_ADMIN'])
    def deleteUser(){
        Map userDeletionStatusMap   =   userManagementService.deleteUser(params.userId)
        render userDeletionStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchUserDetails(){
        Map userDetailsMap      =   [:]
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        List userDetailsList    =   userManagementService.fetchAllUsersByRestaurantId(sCtx.restaurantId)
        userDetailsMap << [data : userDetailsList]
        render userDetailsMap as JSON
    }
    /*-------------------------- END : Restaurant User Management -----------------------*/

    /*-------------------------- START : Menu Management -----------------------*/

    @Secured(['ROLE_SUPER_ADMIN'])
    def menuManagement(){}

    @Secured(['ROLE_SUPER_ADMIN'])
    def branchWiseMenuManagement(){}

    @Secured(['ROLE_SUPER_ADMIN'])
    def newMenu(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        Map menuCreationStatusMap   = restaurantManagementService.createMenu(sCtx.restaurantId, params.menuName)
        render menuCreationStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def updateMenu(){
        Map menuUpdateStatusMap   = restaurantManagementService.updateMenu(params.menuId, params.menuName)
        render menuUpdateStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def deleteMenu(){
        Map menuDeletionStatusMap   = restaurantManagementService.deleteMenu(params.menuId)
        render menuDeletionStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchMenu(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        Map  menuDetailMap  =   [:]

        List menuList   =   restaurantManagementService.fetchMenuList(sCtx.restaurantId)
        menuDetailMap   <<  [data : menuList]
        render menuDetailMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchBranchWiseMenuDetails(){
        Map branchWiseMenuDetailsMap    =   [:]
        List branchWiseMenuDetails  = []
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        String branchId = commonUtilService.fetchBranchIdByNameAndRestaurantId(sCtx.restaurantId, params.branchName)
        if (branchId != ""){
            branchWiseMenuDetails  = restaurantManagementService.fetchBranchWiseMenuDetails(branchId)
        }
        branchWiseMenuDetailsMap << [data: branchWiseMenuDetails]

        render branchWiseMenuDetailsMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def updateBranchWiseMenuPrice(){
        Map menuPriceUpdateStatus   =   restaurantManagementService.updateBranchWiseMenuPrice(params.branchMenuId, params.price as Float)
        render menuPriceUpdateStatus as JSON
    }

    /*-------------------------- END    : Menu Management    -----------------------*/

    /*-------------------------- START  : Grocery Management -----------------------*/

    @Secured(['ROLE_SUPER_ADMIN'])
    def groceryManagement(){ }

    @Secured(['ROLE_SUPER_ADMIN'])
    def branchWiseGroceryManagement(){ }

    @Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'])
    def adminGroceryManagement(){ }

    @Secured(['ROLE_SUPER_ADMIN'])
    def newGrocery(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        Map groceryCreationStatusMap    =   restaurantManagementService.createGrocery(sCtx.restaurantId, params.groceryName)
        render groceryCreationStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def updateGrocery(){
        Map groceryUpdateStatusMap    =   restaurantManagementService.updatingGrocery(params.groceryId, params.groceryName)
        render groceryUpdateStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def deleteGrocery(){
        Map groceryDeletionStatusMap    =   restaurantManagementService.deletingGrocery(params.groceryId)
        render groceryDeletionStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchGroceries(){
        Map groceryDetails = [:]
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        List groceryDetailsList   =   restaurantManagementService.fetchGroceryByRestaurantId(sCtx.restaurantId)
        groceryDetails << [data: groceryDetailsList]
        render groceryDetails as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'])
    def fetchGroceriesForAutoComplete(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        List groceryDetailsList   =   restaurantManagementService.getGroceryListByRestaurantId(sCtx.restaurantId)
        render groceryDetailsList as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def addGroceryToStock(){
        Map groceryAdditionStatusMap    =   [:]
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        Long timeStamp  =   commonUtilService.stringDateToLong(params.groceryAddDate)
        String groceryId    =   commonUtilService.getGroceryIdByName(sCtx.restaurantId, params.addGroceryName)
        if (groceryId != ""){
            groceryAdditionStatusMap    =   restaurantManagementService.addGrocery(sCtx.restaurantId, sCtx.branchId, groceryId,
                    "Add", params.addQuantity as Float, params.addPrice as Float, timeStamp, params.addGroceryName)
        }else {
            groceryAdditionStatusMap << [status: false, message: "Invalid grocery name"]
        }

        render groceryAdditionStatusMap as JSON
    }

    /**
     * Deduct grocery from the stock
     * @return
     */
    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def deductGroceryFromStock(){
        Map deductGroceryStatusMap    =   [:]

        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        Long timeStamp  =   commonUtilService.stringDateToLong(params.groceryDeductDate)
        String groceryId    =   commonUtilService.getGroceryIdByName(sCtx.restaurantId, params.deductGroceryName)
        if (groceryId != ""){
            deductGroceryStatusMap    =   restaurantManagementService.deductGrocery(sCtx.restaurantId, sCtx.branchId, groceryId,
                    "Deduct", params.deductQuantity as Float, timeStamp, params.deductGroceryName)
        }else {
            deductGroceryStatusMap << [status: false, message: "Invalid grocery name"]
        }

        render deductGroceryStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def fetchGroceryStockDetails(){
        Map groceryDetails  =   [:]
        List groceryDetailsList =   []
        String branchId =   ""

        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        if (sCtx.mainRole == "ROLE_SUPER_ADMIN"){
            branchId = commonUtilService.fetchBranchIdByNameAndRestaurantId(sCtx.restaurantId, params.branchName)
        }else {
            if (sCtx.branchId != null)
            branchId    =   sCtx.branchId
        }

        if (branchId != ""){
            groceryDetailsList = restaurantManagementService.fetchBranchWiseGroceryDetails(branchId)
        }
        groceryDetails << [data: groceryDetailsList]
        render groceryDetails as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def fetchAvailableGroceryQuantity(){
        String branchId
        Float availableGroceryQuantity
        Map availableGroceryMap    =   [:]

        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        String groceryId    =   commonUtilService.getGroceryIdByName(sCtx.restaurantId, params.groceryName)

        if (groceryId != ""){
            if (sCtx.mainRole == "ROLE_SUPER_ADMIN"){
                branchId = commonUtilService.fetchBranchIdByNameAndRestaurantId(sCtx.restaurantId, params.branchName)
            }else {
                if (sCtx.branchId != null)
                    branchId    =   sCtx.branchId
            }

            availableGroceryQuantity = restaurantManagementService.getAvailableGroceryQuantity(branchId, groceryId)
            availableGroceryMap    <<  [status: true, message: availableGroceryQuantity]
        }else {
            availableGroceryMap    << [status: false, message: "Invalid grocery name"]
        }
        render availableGroceryMap as JSON
    }

    /*-------------------------- END    : Grocery Management -----------------------*/


    /*-------------------------- START    : Billing Management -----------------------*/
    /**
     * Billing view
     */
    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def billing(){

    }

    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def getListOfMenusForAutoComplete(){
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        List menuDetailsList   =   restaurantManagementService.getMenuListByRestaurantId(sCtx.restaurantId)
        render menuDetailsList as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def fetchMenuPrice(){
        Map menuPriceDetails    =   [:]
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        String menuId   =   commonUtilService.fetchMenuIdByMenuName(sCtx.restaurantId, params.menuName)
        if (menuId != "") {
            menuPriceDetails = restaurantManagementService.getMenuPriceByBranchIdAndMenuId(sCtx.branchId, menuId)
        }
        render menuPriceDetails as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def persistBill(){
        Map billPersistenceDetails    =   [:]

        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        billPersistenceDetails  =   restaurantManagementService.persistBillDetails(sCtx,params)

        render billPersistenceDetails as JSON
    }

   @Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
    def billPrinting(){}

    /*-------------------------- END    : Billing Management -------------------------*/

}