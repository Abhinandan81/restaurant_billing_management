/**
 * Created by KS148 on 11/05/16.
 */

/**
 * For validating mobile number with only 10 digits
 * @type {RegExp}
 */
var phoneno = /^\d{10}$/;
$.validator.addMethod("checkContactNumber", function (value, element) {
    if ($("#mobileNumber").val().match(phoneno)) {
        return true;
    }
    else {
        return false
    }
    return true;
}, $.format(""));


/**
 * For validating exact length of element
 */
$.validator.addMethod("exactLength", function (value, element, param) {
    return this.optional(element) || value.length == param;
}, $.format(""));


/**
 * For validating the letters only(with spaces) elements
 */
$.validator.addMethod("lettersOnly", function (value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, $.format(""));


$.validator.addMethod("checkOptionalValue", function(value, element, param){
    if( $("#"+param).val() == "" &&  value == "") {
        return false
    } else if(value != "") {
        return true
    }
    return true
}, $.format(""));

