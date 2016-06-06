package com.restaurant.controller

import grails.plugin.springsecurity.annotation.Secured

import com.constants.CodeConstants
import grails.converters.JSON

@Secured(['permitAll'])
class ProvisionController {
    def userManagementService

    @Secured(['ROLE_SUPER_ADMIN'])
    def index() {
        redirect(action: 'branchManagement')
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def branchManagement(){}

    @Secured(['ROLE_SUPER_ADMIN'])
    def createBranch(){}




    /*-------------------------- START : User management  -----------------------------------*/
    @Secured(['ROLE_SUPER_ADMIN'])
    def testing(){
        /*ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        println "Role :"+sCtx.mainRole+"\t name"+sCtx.userName*/
    }

    /**
     * New user creation
     * @return : userCreationStatusMap
     */
    @Secured(['ROLE_SUPER_ADMIN'])
    def createUser(){
        Map userCreationStatusMap    =   userManagementService.newUserCreation('abhi', 'abhi', 'Abhinandan', 'Satpute', '8796105046',
                CodeConstants.ROLE_SUPER_ADMIN)
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

    /*-------------------------- END : User management  -----------------------------------*/


}
