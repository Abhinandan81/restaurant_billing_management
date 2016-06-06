package com.restaurant.service

import com.constants.CodeConstants
import com.restaurant.domain.auth.Role
import com.restaurant.domain.auth.User
import com.restaurant.domain.auth.UserRole
import com.utils.ServiceContext
import grails.transaction.Transactional

@Transactional
class UserManagementService {

    void bootstrapSystemRoles(){
        /* Create the SUPER_ADMIN user role. */
        if(!Role.findByAuthority(CodeConstants.ROLE_SUPER_ADMIN)) {
            def superAdminRole = new Role(authority: CodeConstants.ROLE_SUPER_ADMIN).save(flush: true)
        }

        /* Create the ADMIN user role. */
        if(!Role.findByAuthority(CodeConstants.ROLE_ADMIN)) {
            def adminRole = new Role(authority: CodeConstants.ROLE_ADMIN).save(flush: true)
        }


        /* Create a super admin user. */
        User superAdmin = User.findByUsername(CodeConstants.SUPER_ADMIN_USER_NAME)
        if(!superAdmin) {
            superAdmin = new User(
                    username    : CodeConstants.SUPER_ADMIN_USER_NAME,
                    password    : CodeConstants.SUPER_ADMIN_USER_NAME,
                    enabled     : true
            )
            superAdmin.save(flush: true)
            def superAdminRole = Role.findByAuthority(CodeConstants.ROLE_SUPER_ADMIN)
            UserRole superAdminUserRole = UserRole.get(superAdmin.id, superAdminRole.id)
            if(!superAdminUserRole) {
                UserRole.create(superAdmin, superAdminRole, true)
            }
        }

        /* Create an admin user. */
        User admin = User.findByUsername(CodeConstants.ADMIN_USER_NAME)
        if(!admin) {
            admin = new User(
                    username    : CodeConstants.ADMIN_USER_NAME,
                    password    : CodeConstants.ADMIN_USER_NAME,
                    enabled     : true
            )


            admin.save(flush: true)
            def adminRole = Role.findByAuthority(CodeConstants.ROLE_ADMIN)
            UserRole adminUserRole = UserRole.get(admin.id, adminRole.id)
            if(!adminUserRole) {
                UserRole.create(admin, adminRole, true)
            }
        }

    }

    User findUserByUsername(ServiceContext sCtx, String userName) {
        return User.findByUsername(userName)
    }

    /**
     * New user creation
     * @param userName
     * @param password
     * @param firstName
     * @param lastName
     * @param mobileNumber
     * @param roleOfUser
     * @return : userCreationStatusMap
     */
    Map newUserCreation(String userName, String password, String firstName, String lastName, String mobileNumber, String roleOfUser){
        Map userCreationStatusMap  =   [:]
        try {

            User user   =   User.findByUsername(userName)

            if (user){
                userCreationStatusMap  << [status : false, successMessage : "User with the username ${userName} already exist"]
            }else{
                user     =   new User(username: userName, password: password, firstName : firstName,
                        lastName : lastName, mobileNumber : mobileNumber)
                user.save(flush: true, failOnError: true)

                def role = Role.findByAuthority(roleOfUser)
                UserRole  userRole = UserRole.get(user.id, role.id)

                if(!userRole) {
                    UserRole.create(user, role, true)
                }
                userCreationStatusMap  << [status : true, successMessage : "User ${firstName} ${lastName} created successfully"]
            }
            return userCreationStatusMap
        }catch (Exception e){
            println "Error in new user creation"
            userCreationStatusMap  << [status : false, errorMessage : "User ${firstName} ${lastName} creation failed"]
            return userCreationStatusMap
        }
    }

    /**
     * Updating the existing user information
     * @return : User information update status map
     */
    Map updateUserInformation(String userId, Map detailsToUpdateMap){
        Map userUpdateStatusMap =   [:]

        try {
            User user   =   User.findById(userId)
            if (user){
                detailsToUpdateMap.each { key, value ->
                    user."${key}"   =   value
                }

                user.save(flush: true, failOnError: true)
                userUpdateStatusMap <<  [status: true, successMessage: "User details updated successfully"]
                return userUpdateStatusMap
            }else {
                userUpdateStatusMap <<  [status: false, errorMessage: "User not found"]
                return userUpdateStatusMap
            }
        }catch (Exception e){
            println "Error while updating user information"
            userUpdateStatusMap <<  [status: false, errorMessage: "Error while updating user information"]
            return userUpdateStatusMap
        }
    }

    /**
     * Error while deleting the user
     * @param userId
     * @return : userDeletionStatusMap
     */
    Map deleteUser(String userId){
        Map userDeletionStatusMap   =   [:]
        try {
            User user   =   User.findById(userId)

            if (user){
                def userRoles   =   UserRole.findAllByUser(user)
                userRoles*.delete()
                user.delete()
                userDeletionStatusMap   <<  [status: true, successMessage: "User deleted successfully"]
                return userDeletionStatusMap
            }else {
                userDeletionStatusMap   <<  [status: false, errorMessage: "User you are trying to delete does not exist"]
                return userDeletionStatusMap
            }

        }catch (Exception e){
            println "Error while deleting the user"
            userDeletionStatusMap   <<  [status: false, errorMessage: "Error while deleting the User"]
            return userDeletionStatusMap
        }
    }
}
