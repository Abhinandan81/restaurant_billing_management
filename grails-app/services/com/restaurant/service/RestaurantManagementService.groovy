package com.restaurant.service

import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.Menu
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
                    newBranchCreationStatusMap << [ status: false, message: "Branch with the name ${name} already exist.Please choose another name"]
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
    Map updateBranchDetails(String branchId, String restaurantId, Map detailsToUpdate){
        Map branchUpdateStatusMap   =   [:]
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
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
                    branchDetailLists = [branch.name, branch.address, branch.contactNumber, branch.id]
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

    /**
     * Fetch all branch details
     * @return : List of branchDetails
     */
    List branchNameByRestaurantId(String restaurantId){
        List branchesDetailsList   =   []
        try{
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant){
                def branches  =   Branch.findAllByRestaurant(restaurant)
                branches.each { branch->
                    branchesDetailsList << branch.name
                }
            }
            return branchesDetailsList
        }catch (Exception e){
            println "Error while fetching branch details"
        }
    }

    Map createMenu(String restaurantId, String name){
        Map menuCreationStatusMap   =   [:]
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Menu menu   =   Menu.findByName(name)
                if (menu){
                    menuCreationStatusMap << [status: false, message: "Menu with the name ${name} already exist.Please choose another name"]
                }else {
                    new Menu(name: name, restaurant: restaurant).save(flush: true, failOnError: true)
                    menuCreationStatusMap << [status: true, message: "Menu with the name ${name} created successfully."]
                }
            }else {
                menuCreationStatusMap << [status: false, message: "Invalid restaurantId"]
            }

            return menuCreationStatusMap
        }catch (Exception e){
            println "Error in creating menu"+e
        }
    }

    Map updateMenu(String menuId, String name){
        Map menuUpdateStatusMap   =   [:]
        try {
            Menu menu   =   Menu.findById(menuId)
            if (menu){
                menu.name   =   name
                menu.save(flush: true, failOnError: true)
                menuUpdateStatusMap << [status: true, message: "Menu with the name ${name} updated successfully."]
            }else {
                menuUpdateStatusMap << [status: false, message: "Menu doesn't exist"]
            }
            return menuUpdateStatusMap
        }catch (Exception e){
            println "Error in updating menu"+e
        }
    }

    Map deleteMenu(String menuId){
        Map menuDeleteStatusMap   =   [:]
        String menuName
        try {
            Menu menu   =   Menu.findById(menuId)
            if (menu){
                menuName    =   menu.name
                menu.delete()
                menuDeleteStatusMap << [status: true, message: "Menu with the name ${menuName} deleted successfully."]
            }else {
                menuDeleteStatusMap << [status: false, message: "Menu doesn't exist"]
            }
            return menuDeleteStatusMap
        }catch (Exception e){
            println "Error in updating menu"+e
        }
    }

    List fetchMenuList(String restaurantId){
        List allMenuList   =   []
        List menuList   =   []
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant) {
                List menus = Menu.findAllByRestaurant(restaurant)
                if (menus){
                    menus.each { menu->
                        menuList = []
                        menuList << menu.name
                        allMenuList << menuList
                    }
                }
            }
            return allMenuList
        }catch (Exception e){
            println "Error in fetching menu"+e.printStackTrace()
        }
    }
}
