package com.utils

import com.constants.CodeConstants
import com.restaurant.domain.auth.User
import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.Restaurant
import com.restaurant.service.UserManagementService
import grails.plugin.springsecurity.SpringSecurityService

/**
 * Created by abhi on 25/5/16.
 */
class SessionUtil {
    static ServiceContext getServiceContext(def request, SpringSecurityService svc, UserManagementService ums) {

        if(!(svc?.principal instanceof String)) {
            ServiceContext sCtx
            def session = request.session


            if(!session.getAttribute(CodeConstants.SERVICE_CONTEXT_ATTRIBUTE_NAME)) {
                /* Construct the serviceContext */
                sCtx = getServiceContextFromTO( [userAgent : request?.getHeader('user-agent') ,
                                                 host : request?.getHeader("X-Forwarded-For") ?: request?.getRemoteAddr() ,
                                                 principalUsername : svc?.principal?.username ?: "" ,
                                                 principalAuthorities : svc?.principal.authorities ?: [:]], ums)
                sCtx = setServiceContext(request, sCtx)
            } else {
                /* Retrieving cached serviceContext from the session */
                sCtx = session.getAttribute(CodeConstants.SERVICE_CONTEXT_ATTRIBUTE_NAME)
            }
            return sCtx

        }else{
            return null
        }
    }

    static ServiceContext setServiceContext(def request, ServiceContext sCtx) {

        def session = request.session

        /* Cache  the serviceContext in the session  */
        session.setAttribute(CodeConstants.SERVICE_CONTEXT_ATTRIBUTE_NAME, sCtx)

        /*
         * The setMaxInactiveInterval function specifies the time, in seconds, between client requests
         *  before the servlet container will invalidate this session. We have set this threshold to an hour.
         */
        session.setMaxInactiveInterval(1000);

        return sCtx
    }

    /**
     * Construct the ServiceContext object
     *
     * @param request	The request object is an instance of the Servlet API's HttpServletRequest interface.
     * @param eps		Entity provisioning service.
     * @return sCtx		ServiceContext instance.
     */
    static ServiceContext getServiceContextFromTO(Map request, UserManagementService ums) {

        String userName = request.principalUsername

        User user = null
        String mainRole = null
        String userTimeZone = null

        ServiceContext undetSCtx = new ServiceContext(
                userId : 'SYSTEM',
                userName: "Abhi System"
        )

        user = ums.findUserByUsername(undetSCtx, userName)
        request.principalAuthorities.each { nxtAuth ->

            /*--------------------------------------- ROLE_ADMIN ---------------------------------------*/
            if (nxtAuth.toString() == CodeConstants.ROLE_SUPER_ADMIN) {
                mainRole = CodeConstants.ROLE_SUPER_ADMIN
            }
            /*--------------------------------------- ROLE_COMPANY_ADMIN ---------------------------------------*/
            else if (nxtAuth.toString() == CodeConstants.ROLE_ADMIN) {
                mainRole = CodeConstants.ROLE_ADMIN
//                companyId = user.companyId
            }
        }

        def username = user.username
        String restaurantId = user.restaurantId
        String branchId = user.branchId

        String restaurantName =  ""
        String branchName   =   ""

        //find restaurant name to which user belongs
        Restaurant restaurant = Restaurant.findById(restaurantId)
        if (restaurant){
            restaurantName = restaurant.name
        }

        //find branch of the restaurant name to which user belongs
        Branch branch   =   Branch.findById(branchId)
        if (branch){
            branchName  =   branch.name
        }

        /* Initialize the ServiceContext instance */
        ServiceContext sCtx = new ServiceContext(
                userAgent	    : request.userAgent,
                host		    : request.host,
                restaurantId    : restaurantId,
                restaurantName  : restaurantName,
                branchId        : branchId,
                branchName      : branchName,
                userId 		    : username,
                mainRole	    : mainRole,
                userName 		: userName
        )
        return sCtx
    }
}
