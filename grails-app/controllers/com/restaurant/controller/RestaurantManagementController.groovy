package com.restaurant.controller

import com.constants.CodeConstants
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class RestaurantManagementController {
    def restaurantManagementService
    def userManagementService

    @Secured(['ROLE_SUPER_ADMIN'])
    def branchManagement(){}

    @Secured(['ROLE_SUPER_ADMIN'])
    def newBranch(){
        Map branchCreationStatusMap =   restaurantManagementService.newBranchCreation('branch3','baner','8796104056')
        render branchCreationStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def updateBranch(){
        Map detailsToUpdate =   [name: 'branch4', address: 'kothrud', contactNumber : '4545454545']
        Map branchUpdateStatusMap   =   restaurantManagementService.updateBranchDetails('2','branch4',detailsToUpdate)
        render branchUpdateStatusMap as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def deleteBranch(){
        Map branchDeletionStatus    =   restaurantManagementService.deleteBranch('2')
        render branchDeletionStatus as JSON
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def fetchBranchDetails(){
        Map branchDetailsMap    =   [:]
        List allBranchDetailsList   =   restaurantManagementService.branchDetails()
        branchDetailsMap << [ data : allBranchDetailsList]
        render branchDetailsMap as JSON
    }

    /**
     * New user creation
     * @return : userCreationStatusMap
     */
    @Secured(['ROLE_SUPER_ADMIN'])
    def createUser(){
        Map userCreationStatusMap    =   userManagementService.newUserCreation('abhi', 'abhi', 'Abhinandan',
                'Satpute', '8796105046', CodeConstants.ROLE_SUPER_ADMIN, "1", "")
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
        Map userDeletionStatusMap   =   userManagementService.deleteUser("3")
        render userDeletionStatusMap as JSON
    }
}
