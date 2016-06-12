
package com.restaurant.service

import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.Restaurant
import grails.transaction.Transactional

@Transactional
class CommonUtilService {

    String fetchBranchNameByBranchId(String branchId){
        String branchName = ""
        try {
            Branch branch = Branch.findById(branchId)
            if (branch){
                branchName  =   branch.name
            }
            return branchName
        }catch (Exception e){
            println "Error in fetching BranchName By BranchId"
        }
    }

    String fetchBranchIdByNameAndRestaurantId(String restaurantId, String branchName){
        String branchId =   ""
        try{
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant){
                Branch branch  =   Branch.findByRestaurantAndName(restaurant, branchName)
                if(branch){
                    branchId    =    branch.id
                }
            }
            return branchId
        }catch (Exception e){
            println "Error while fetching branch details"
        }

    }
}