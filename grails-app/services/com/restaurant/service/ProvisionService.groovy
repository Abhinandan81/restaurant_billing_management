package com.restaurant.service

import com.restaurant.domain.management.Restaurant
import grails.transaction.Transactional

@Transactional
class ProvisionService {

    /**
     * New restaurant creation s
     * @param name
     * @param address
     * @param contactNumber
     * @param ownerFirstName
     * @param ownerLastName
     * @param licenseNumber
     * @param image
     * @return : newRestaurantCreationStatusMap
     */
   def newRestaurantCreation(String name, String address, String contactNumber, String ownerFirstName,
           String ownerLastName, String licenseNumber, String image){
       Map newRestaurantCreationStatusMap   =   [:]

       try {
           Restaurant restaurant    =   Restaurant.findByName(name)

           if (restaurant){
               newRestaurantCreationStatusMap << [status : false, message : "Restaurant with the name ${name} already exist"]
           }else {
               new Restaurant(name: name, address: address, contactNumber: contactNumber, ownerFirstName: ownerFirstName,
               ownerLastName: ownerLastName, licenseNumber: licenseNumber, image: image).save(flush: true, failOnError: true)

               newRestaurantCreationStatusMap << [status : true, message : "Restaurant  ${name} added successfully"]
           }
       }catch (Exception e){
           println "Error in creating a new restaurant"
       }
   }
}
