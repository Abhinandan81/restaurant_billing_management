package com.restaurant.service

import com.restaurant.domain.auth.User
import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.BranchGrocery
import com.restaurant.domain.management.BranchMenu
import com.restaurant.domain.management.Menu
import com.restaurant.domain.management.Restaurant
import grails.transaction.Transactional

import java.lang.reflect.MalformedParameterizedTypeException

@Transactional
class RestaurantManagementService {
    def userManagementService
    def commonUtilService

    /**
     * New branch creation
     * @param name
     * @param address
     * @param contactNumber
     * @return : newBranchCreationStatusMap
     */
    Map newBranchCreation(String name, String address, String contactNumber, String restaurantId){
        Map newBranchCreationStatusMap  =   [:]
        Boolean menuAddStatus   =   false
        String successMessage
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Branch branch   = Branch.findByNameAndRestaurant(name, restaurant)
                if (branch){
                    newBranchCreationStatusMap << [ status: false, message: "Branch with the name ${name} already exist.Please choose another name"]
                }else {
                    Branch newBranch    =   new Branch(name: name, address: address, contactNumber: contactNumber, restaurant: restaurant)
                    newBranch.save(flush: true, failOnError: true)

                    menuAddStatus   = addMenusToBranch(restaurant, newBranch.id as String)
                    if (menuAddStatus){
                        successMessage  =   "Branch ${name} created and Menus are added successfully to the branch."
                    }else {
                        successMessage = "Branch ${name} created successfully.No menu added the branch"
                    }

                    newBranchCreationStatusMap << [ status: true, message: successMessage]
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
        Boolean branchRelatedMenuDeletion = false
        Boolean branchRelatedUserDeletion = false
        String branchName
        String branchDeletionMessage
        try {
            Branch branch   =   Branch.findById(branchId)
            if (branch){
                branchName = branch.name
                branch.delete(flush: true)

                branchRelatedMenuDeletion = deleteBranchRelatedMenus(branch.id as String)
                branchRelatedUserDeletion = deleteUserOnBranchDelete(branch.id as String)

                if (branchRelatedMenuDeletion && branchRelatedUserDeletion){
                    branchDeletionMessage = "Branch ${branchName} , it's related users and menus are deleted successfully"
                }else {
                    branchDeletionMessage = "Branch ${branchName} is deleted successfully"
                }

                branchDeletionStatus << [status: true, message: branchDeletionMessage]
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

    /**
     * New menu creation
     * @param restaurantId
     * @param name
     * @return
     */
    Map createMenu(String restaurantId, String name){
        Map menuCreationStatusMap   =   [:]
        Boolean menuBranchAssociationStatus = false
        String menuCreationStatusMessage
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Menu menu   =   Menu.findByName(name)
                if (menu){
                    menuCreationStatusMap << [status: false, message: "Menu with the name ${name} already exist.Please choose another name"]
                }else {
                    Menu newMenu    =   new Menu(name: name, restaurant: restaurant)
                    newMenu.save(flush: true, failOnError: true)

                    menuBranchAssociationStatus = addMenuToBranches(restaurant, newMenu.id as String)
                    if (menuBranchAssociationStatus){
                        menuCreationStatusMessage = "Menu with the name ${name} created successfully and added to all existing brances"
                    }else {
                        menuCreationStatusMessage = "Menu with the name ${name} created successfully"
                    }

                    menuCreationStatusMap << [status: true, message: menuCreationStatusMessage]
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

    /**
     * Menu deletion
     * @param menuId
     * @return
     */
    Map deleteMenu(String menuId){
        Map menuDeleteStatusMap   =   [:]
        String menuName
        String menuDeleteStatusMessage
        Boolean menuDeletionFromBranchStatus = false
        try {
            Menu menu   =   Menu.findById(menuId)
            if (menu){
                menuName    =   menu.name
                menu.delete()
                menuDeletionFromBranchStatus    =    deleteMenuFromBranches(menu.id as String)
                if(menuDeletionFromBranchStatus){
                    menuDeleteStatusMessage = "Menu ${menuName} deleted successfully from restaurant and all the branches"
                }else {
                    menuDeleteStatusMessage = "Menu ${menuName} deleted successfully from restaurant"
                }
                menuDeleteStatusMap << [status: true, message: menuDeleteStatusMessage]
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
                        menuList = [menu.name, menu.id]
                        allMenuList << menuList
                    }
                }
            }
            return allMenuList
        }catch (Exception e){
            println "Error in fetching menu"+e.printStackTrace()
        }
    }

    /**
     * Adding menus to the given branch
     * @param restaurant
     * @param branchId
     * @return
     */
    Boolean addMenusToBranch(Restaurant restaurant, String branchId){
        Boolean menuAdditionStatus  =   false
        try {
            List menus  =  Menu.findAllByRestaurant(restaurant)

            if (menus){
                menus.each { menu ->
                    try {
                        new BranchMenu(branchId: branchId, menuId: menu.id).save(flush: true, failOnError: true)
                    }catch (Exception e){
                        println "Error in adding menu to the menu"
                    }

                }
                menuAdditionStatus = true
            }
            return menuAdditionStatus
        }catch (Exception e){
            println "Error in adding menus to the branch"
        }
    }

    /**
     * Menu deletion
     * @param branchId
     * @return
     */
    Boolean deleteBranchRelatedMenus(String branchId){
        Boolean menuDeletionStatus  =   false
        List branchMenuList =   []
        try {
            branchMenuList  =   BranchMenu.findAllByBranchId(branchId)

            if (branchMenuList){
                branchMenuList.each { branchMenu ->
                    branchMenu.delete(flush: true)
                }
                menuDeletionStatus = true
            }
            return menuDeletionStatus
        }catch (Exception e){
            println "Error in deleting menus from the branch"
        }
    }

    /**
     * addMenuToBranches
     * @param restaurant
     * @param menuId
     * @return
     */
    Boolean addMenuToBranches(Restaurant restaurant, String menuId){
        Boolean menuAddStatus    =   false

        try {
            List branches   =   Branch.findAllByRestaurant(restaurant)

            if (branches){
                branches.each { branch ->
                    new BranchMenu(branchId: branch.id, menuId: menuId).save(flush: true, failOnError: true)
                }
                menuAddStatus   =   true
            }
            return  menuAddStatus
        }catch (Exception e){
            println "Error in adding menu to the Branches"
        }
    }

    /**
     * deleteMenuFromBranches
     * @param menuId
     * @return
     */
    Boolean deleteMenuFromBranches(String menuId){
        Boolean menuDeletionStatus    =   false
        List branchMenuList =   []

        try {
            branchMenuList  =   BranchMenu.findAllByMenuId(menuId)

            if (branchMenuList){
                branchMenuList.each { branchMenu ->
                    branchMenu.delete(flush: true)
                }
                menuDeletionStatus = true
            }
            return  menuDeletionStatus
        }catch (Exception e){
            println "Error in adding menu to the Branches"
        }
    }

    /**
     * deleteUserOnBranchDelete
     * @return
     */
    Boolean deleteUserOnBranchDelete(String branchId){
        Boolean userDeletionStatus  =   false
        Map userDeletionStatusMap   =   [:]

        try {
            List users  =   User.findAllByBranchId(branchId)

            if(users){
                users.each { user ->
                    userDeletionStatusMap = userManagementService.deleteUser(user.id as String)
                }
                userDeletionStatus = true
            }
            return userDeletionStatus
        }catch (Exception e){
            println "Error in user deletion"
        }
    }

    List fetchBranchWiseMenuDetails(String branchId){
        List allMenuDetails =   []
        List menuDetails
        String menuName = ""

        try {
            List menus  =   BranchMenu.findAllByBranchId(branchId)
            if (menus){
                menus.each { menu ->
                    menuName    =   commonUtilService.fetchMenuNameByMenuId(menu.menuId as String)

                    if (menuName != ""){
                        menuDetails = []
                        menuDetails = [menuName, menu.price, menu.id]
                        allMenuDetails << menuDetails
                    }
                }
            }
            return allMenuDetails
        }catch (Exception e){
            println "Error in fetching branch wise menu information"+e.printStackTrace()
        }

    }

    Map updateBranchWiseMenuPrice(String branchMenuId, Float price){
        Map priceUpdateStatusMap    =   [:]

        try {
            BranchMenu branchMenu   =   BranchMenu.findById(branchMenuId)

            if (branchMenu){
                branchMenu.price    =   price
                branchMenu.save(flush: true, failOnError: true)
                priceUpdateStatusMap << [status: true]
            }else {
                priceUpdateStatusMap << [status: false]
            }
        }catch (Exception e){
            println "Error in updating price"
        }
    }

    Map addGrocery(String branchId, String groceryId, String operationType, String quantity, String price, Date date){
        Map addGroceryStatusMap =   [:]
        Boolean grocerySummaryUpdateStatus

        try {

            BranchGrocery branchGrocery =   new BranchGrocery(branchId: branchId, groceryId: groceryId, quantity: quantity,
            price: price, operationType: operationType, date: date)
            branchGrocery.save(flush: true, failOnError: true)

            grocerySummaryUpdateStatus = grocerySummaryUpdate(branchId, groceryId, quantity, operationType)
            if (grocerySummaryUpdateStatus){
                addGroceryStatusMap << [status: true, message: "Grocery successfully added to the stock"]
            }

            return  addGroceryStatusMap
        }catch (Exception e){
            println "Error in making grocery entry"
        }
    }

    Boolean grocerySummaryUpdate(String branchId, String goceryId, Float quantity, String operationType){

    }
}
