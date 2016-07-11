package restaurant

import com.constants.CodeConstants
import com.utils.ServiceContext
import com.utils.SessionUtil

class RestaurantTagLib {
    static defaultEncodeAs = [taglib:'html']
    //static encodeAsForTags = [tagName: [taglib:'html'], otherTagName: [taglib:'none']]

    static namespace = "restaurant"

    def springSecurityService
    def userManagementService

    def renderUserFullName = {
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        out << sCtx.userName
    }

    def renderUserRole = {
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        String userRole = ""
        switch (sCtx.mainRole) {
            case CodeConstants.ROLE_SUPER_ADMIN:
                userRole = "System Administrator"
                break
            case CodeConstants.ROLE_ADMIN:
                userRole = "Administrator"
                break
        }
        out << userRole
    }

    def renderUserBranch = {
        ServiceContext sCtx = SessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        String userBranch = ""
        if (sCtx.branchName != ""){
            userBranch = sCtx.branchName
        }
        out << userBranch
    }

/*    def renderUserParentEntityFullName = {
        ServiceContext sCtx = RestSessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        String returnValue = ""
        switch (sCtx.mainRole)
        {
            case CodeConstants.ROLE_ADMIN:
                returnValue = "Dani Data Systems"
                break
            case CodeConstants.ROLE_COMPANY_ADMIN:
                Company c = Company.findById(sCtx.companyId, [readOnly: true])
                returnValue = c.companyName
                break
            case CodeConstants.ROLE_SITE_ADMIN:
                Company c = Company.findById(sCtx.companyId, [readOnly: true])
                returnValue = c.companyName
                break
            case CodeConstants.ROLE_SITE_USER:
                Company c = Company.findById(sCtx.companyId, [readOnly: true])
                returnValue = c.companyName
                break
        }
        out << returnValue
    }*/

/*    def renderUserParentEntityShortName = {
        ServiceContext sCtx = RestSessionUtil.getServiceContext(request, springSecurityService, userManagementService)
        String returnValue = ""
        switch (sCtx.mainRole)
        {
            case CodeConstants.ROLE_ADMIN:
                returnValue = "DDS"
                break
            case CodeConstants.ROLE_COMPANY_ADMIN:
                Company c = Company.findById(sCtx.companyId, [readOnly: true])
                returnValue = c.companyShortName.toUpperCase()
                break
            case CodeConstants.ROLE_SITE_ADMIN:
                Company c = Company.findById(sCtx.companyId, [readOnly: true])
                returnValue = c.companyShortName.toUpperCase()
                break
            case CodeConstants.ROLE_SITE_USER:
                Company c = Company.findById(sCtx.companyId, [readOnly: true])
                returnValue = c.companyShortName.toUpperCase()
                break
        }
        out << returnValue
    }*/
}
