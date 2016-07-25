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

    @Secured(['ROLE_SUPER_ADMIN'])
    def newRestaurant(){
        Map newRestaurantCreationStatus =   provisionService.newRestaurantCreation('Roller','sangamner',
        '8796105046','Abhi','Satpute','12345','abc/pqr')
        render newRestaurantCreationStatus as JSON
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