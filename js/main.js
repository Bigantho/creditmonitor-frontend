
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('#btnLogin').on('click', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });

    let inputPayment = $('.main-container .input100')
    $('#btnProcessPayment').on('click', function () {
        var check = true;
        for (var i = 0; i < inputPayment.length; i++) {
            if (validate(inputPayment[i]) == false) {
                showValidate(inputPayment[i]);
                check = false;
            }
        }

        // return check;
        if (check) {
            sendPayment(true)
        } else {
            alert("Debes completar todos los campos correctamente")
        }
    });



    // ====================================================================
    // 
    //  ************** CAPTURA EL EVENTO PARA CUANDO SE QUIERE  *************
    //  **************           SUSCRIBIR A CREDITMON          *************
    // 
    // ====================================================================
    $('#btnProcessSubscription').on('click', function(){
        let check = true;
        for (var i = 0; i < inputPayment.length; i++) {
            if (validate(inputPayment[i]) == false) {
                showValidate(inputPayment[i]);
                check = false;
            }
        }
        let amountToBill = document.getElementById("amount").value
        if (check) {
            if (amountToBill == "0.01") {
                sendCheckPayment()
            } else {
                sendPayment(true)
            }
        } else {
            alert("Debes completar todos los campos correctamente")
        }
    })

    function sendPayment(val){
        if (val) {
            let activatedTrial = document.getElementById('isTrialPeriod')
                if (activatedTrial.checked) {
                    callProcessPaymentWithTrialPeriod()
                } else {
                    callProcessPayment()
                }
        }
    }

    function sendCheckPayment(){
        callCheckPayment();
    }
    
    $('.main-container .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {

        if ($(input).attr('name') == 'email' || $(input).attr('name') == 'shipEmail' ) {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } 
        else if($(input).attr('name') == 'cardNumber'){
            if ($(input).val().trim().match(/^.{16}$/) == null) {
                return false;
            }
        }else if($(input).attr('name') == 'expDate'){
            if ($(input).val().trim().match(/^\d{4}$/) == null) {
                return false;
            }
        }else if($(input).attr('name') == 'cvc'){
            if ($(input).val().trim().match(/^\d{3}$/) == null) {
                return false;
            }
        }else if($(input).attr('name') == 'zipCode' || $(input).attr('name') == 'shipZipCode'){
            if ($(input).val().trim().match(/^\d{5}$/) == null) {
                return false;
            }
        }else if($(input).attr('name') == 'state' || $(input).attr('name') == 'shipState'){
            if ($(input).val().trim().match(/^[A-Z]{2}$/) == null) {
                return false;
            }
        }else if($(input).attr('name') == 'phone' || $(input).attr('name') == 'shipPhone'){
            if ($(input).val().trim().match(/^\d{10}$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);