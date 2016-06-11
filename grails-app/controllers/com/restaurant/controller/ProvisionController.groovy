package com.restaurant.controller

import grails.plugin.springsecurity.annotation.Secured

import com.constants.CodeConstants
import grails.converters.JSON

@Secured(['permitAll'])
class ProvisionController {
    def userManagementService
    def restaurantManagementService
    def provisionService

    @Secured(['ROLE_SUPER_ADMIN'])
    def index() {
        redirect(controller: 'restaurantManagement', action: 'branchManagement')
    }

    @Secured(['ROLE_SUPER_ADMIN'])
    def newRestaurant(){
        Map newRestaurantCreationStatus =   provisionService.newRestaurantCreation('Roller','sangamner',
        '8796105046','Abhi','Satpute','12345','abc/pqr')
        render newRestaurantCreationStatus as JSON
    }


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
        Map userCreationStatusMap    =   userManagementService.newUserCreation('abhi', 'abhi', 'Abhinandan',
                'Satpute', '8796105046', CodeConstants.ROLE_SUPER_ADMIN, "1", "")
        render userCreationStatusMap as JSON
    }
}