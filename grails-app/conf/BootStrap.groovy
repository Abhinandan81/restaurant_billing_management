class BootStrap {
    def userManagementService

    def init = { servletContext ->
        //Bootstrapping System Roles
        userManagementService.bootstrapSystemRoles()
    }
    def destroy = {
    }
}
