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
        Map userCreationStatusMap    =   userManagementService.newUserCreation('ankya', 'ankya', 'Abhinandan',
                'Satpute', '8796105046', CodeConstants.ROLE_SUPER_ADMIN, "1", "2")
        render userCreationStatusMap as JSON
    }

    /**
     * Updating user information
     * @return : userUpdateStatusMap
     */
    @Secured(['ROLE_SUPER_ADMIN'])
    def updateUserInformation(){
        Map detailsToUpdate =  [firstName : "Abhi", lastName : "Sat"]
        Map  userUpdateStatusMap = userManagementService.updateUserInformation("3", detailsToUpdate)
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
}