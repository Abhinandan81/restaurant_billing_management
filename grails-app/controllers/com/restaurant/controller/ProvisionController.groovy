package com.restaurant.controller

import com.utils.ServiceContext
import com.utils.SessionUtil
import grails.plugin.springsecurity.annotation.Secured

import com.constants.CodeConstants
import grails.converters.JSON

@Secured(['permitAll'])
class ProvisionController {
    def userManagementService
    def restaurantManagementService
    def provisionService
    def springSecurityService

    @Secured(['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'])
    def index() {
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)

        if (sCtx.mainRole == CodeConstants.ROLE_SUPER_ADMIN){
            redirect(controller: 'restaurantManagement', action: 'dashboard')
        }else {
            redirect(controller: 'restaurantManagement', action: 'billing')
        }
    }

    @Secured(['permitAll'])
    def newRestaurant(){
        Map newRestaurantCreationStatus =   provisionService.newRestaurantCreation(params.name,params.address,
        params.contactNumber,params.firstName,params.lastName)
        render newRestaurantCreationStatus as JSON
    }

    /**
     * New user creation
     * @return : userCreationStatusMap
     */
    @Secured(['permitAll'])
    def createUser(){
        Map userCreationStatusMap    =   userManagementService.newUserCreation(params.userName, params.password, params.firstName,
                params.lastName, params.contactNumber, params.userRole, params.restaurantId, "")
        render userCreationStatusMap as JSON
    }
}