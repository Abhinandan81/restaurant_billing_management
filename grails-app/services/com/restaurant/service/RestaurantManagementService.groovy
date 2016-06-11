package com.restaurant.service

import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.Restaurant
import grails.transaction.Transactional

@Transactional
class RestaurantManagementService {

    /**
     * New branch creation
     * @param name
     * @param address
     * @param contactNumber
     * @return : newBranchCreationStatusMap
     */
    Map newBranchCreation(String name, String address, String contactNumber, String restaurantId){
        Map newBranchCreationStatusMap  =   [:]
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Branch branch   = Branch.findByNameAndRestaurant(name, restaurant)
                if (branch){
                    newBranchCreationStatusMap << [ status: false, message: "Branch with the name ${name} already exist"]
                }else {
                    new Branch(name: name, address: address, contactNumber: contactNumber, restaurant: restaurant)
                            .save(flush: true, failOnError: true)
                    newBranchCreationStatusMap << [ status: true, message: "Branch with the name ${name} created successfully"]
                }
            }else {
                newBranchCreationStatusMap << [ status: false, message: "Invalid restaurant"]
            }
        }catch (Exception e){
            println "Error in branch creation"+e
        }
    }

    /**
     * Branch Update
     * @param branchId
     * @param detailsToUpdate
     * @return : branchUpdateStatusMap
     */
    Map updateBranchDetails(String branchId, String branchName, String restaurantId, Map detailsToUpdate){
        Map branchUpdateStatusMap   =   [:]
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Branch existingBranch  =   Branch.findByNameAndRestaurant(branchName, restaurant)
                if (existingBranch){
                    branchUpdateStatusMap << [status: false, message: "Branch name already exist.Please choose another branch name"]
                }else {
                    Branch branch   =   Branch.findById(branchId)
                    if (branch){
                        detailsToUpdate.each { key, value->
                            branch."${key}" =   value
                        }

                        branch.save(flush: true, failOnError: true)
                        branchUpdateStatusMap << [status: true, message: "Branch details updated successfully"]
                    }else {
                        branchUpdateStatusMap << [status: false, message: "Invalid branch details"]
                    }
                }
            }else {
                branchUpdateStatusMap << [status: false, message: "Invalid restaurant"]
            }
            return branchUpdateStatusMap
        }catch (Exception e){
            println "Error in branch update"+e.printStackTrace()
        }
    }

    /**
     * Fetch all branch details
     * @return : List of branchDetails
     */
    List branchDetails(String restaurantId){
        List branchesDetailsList   =   []
        List branchDetailLists      =   []
        try{
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant){
                def branches  =   Branch.findAllByRestaurant(restaurant)
                branches.each { branch->
                    branchDetailLists = [branch.name, branch.address, branch.contactNumber]
                    branchesDetailsList << branchDetailLists
                }
            }
            return branchesDetailsList
        }catch (Exception e){
            println "Error while fetching branch details"
        }
    }

    /**
     * Branch deletion
     * @param branchId
     * @return : branch deletion status
     */
    Map deleteBranch(String branchId){
        Map branchDeletionStatus    =   [:]
        try {
            Branch branch   =   Branch.findById(branchId)
            if (branch){
                branch.delete(flush: true)
                branchDeletionStatus << [status: true, message: "Branch has been deleted successfully"]
            }else {
                branchDeletionStatus << [status: false, message: "Invalid branch details"]
            }
            return branchDeletionStatus
        }catch (Exception e){
            println "Error in branch deletion"
        }
    }
}
