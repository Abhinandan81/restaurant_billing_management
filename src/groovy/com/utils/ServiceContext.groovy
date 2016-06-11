package com.utils

/**
 * Created by abhi on 25/5/16.
 */
class ServiceContext {
    String  userId
    String  userName
    String  mainRole
    String  restaurantId
    String  restaurantName
    String  branchId
    String  branchName
    boolean forceUserToResetPassword
    Date    triggeredPasswordReset
    String  userAgent
    String  userDevice
    String  host


    @Override
    public String toString() {
        return "ServiceContext{" +
                "userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", mainRole='" + mainRole + '\'' +
                ", restaurantId='" + restaurantId + '\'' +
                ", restaurantName='" + restaurantName + '\'' +
                ", branchId='" + branchId + '\'' +
                ", branchName='" + branchName + '\'' +
                ", forceUserToResetPassword=" + forceUserToResetPassword +
                ", triggeredPasswordReset=" + triggeredPasswordReset +
                ", userAgent='" + userAgent + '\'' +
                ", userDevice='" + userDevice + '\'' +
                ", host='" + host + '\'' +
                '}';
    }
}
