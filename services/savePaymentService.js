

function copyData() {
    const elementsToCopy = [
        'firstName', 'lastName',
        'address', 'city', 'state',
        'zipCode', 'phone',
        'email'
    ]
    const elementsToPaste = [
        'shipFirstName', 'shipLastName',
        'shipAddress', 'shipCity', 'shipState',
        'shipZipCode', 'shipPhone',
        'shipEmail'
    ]
    for (let i = 0; i < elementsToCopy.length; i++) {
        let d = document.getElementById(`${elementsToCopy[i]}`).value;
        let b = document.getElementById(`${elementsToPaste[i]}`)
        b.value = d
    }
}

function deleteData() {
    const elementsToPaste = [
        'shipFirstName', 'shipLastName', 'shipCompany',
        'shipAddress', 'shipCity', 'shipState',
        'shipZipCode', 'shipCountry', 'shipPhone',
        'shipEmail', 'shipFax'
    ]
    for (let i = 0; i < elementsToPaste.length; i++) {
        let b = document.getElementById(`${elementsToPaste[i]}`)
        b.value = ""
    }
}

function checkboxChanged() {
    let checkbox = document.getElementById("copyDataCbox");
    // This function will be called whenever the checkbox changes its state
    if (checkbox.checked) {
        copyData()
        $(".main-container input").trigger("blur");
    } else {
        deleteData()
        $(".main-container input").trigger("blur");
    }
}

function clearInput() {
    $('.input100').each(function () {
        $(this).val("")
        $(".main-container input").trigger("blur");
    })
}


function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
            return cookie.substring(cookieName.length + 1); // +1 to skip the '=' character
        }
    }
    return null; // Cookie not found
}

function clearCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

function cerrarSesion() {
    clearCookies()
    window.location.href = 'index.html'
}

function openView(view) {
    window.location.href = view
}

function processPayment(params) {
    const data = {
        user_id: params.userID,
        card: {
            number: params.cardNumber,
            expiration: params.expDate,
            cvc: params.cvc,
            type: ""
        },
        invoice: {
            number: params.invoice,
            description: params.descOrder,
            amount: params.amount,
        },
        billing: {
            first_name: params.firstName,
            last_name: params.lastName,
            company: params.company,
            address: params.address,
            city: params.city,
            state: params.state,
            zip_code: params.zipCode,
            country: params.country,
            phone_number: params.phone,
            // fax: "",
            email: params.email
        },
        shipping: {
            first_name: params.shipFirstName,
            last_name: params.shipLastName,
            company: params.shipCompany,
            address: params.shipAddress,
            city: params.shipCity,
            state: params.shipState,
            zip_code: params.shipZipCode,
            country: params.shipCountry
        }
    }

    // Make a GET request using Axios
    axios.post('http://localhost:3000/api/v1/payment', data)
        .then(function (response) {
            // Handle the successful response
            console.log(response)
            alert(`Pago procesado con exito: ${response.data.message}`)
            clearInput()
        })
        .catch(function (error) {
            // Handle errors 
            // console.log(error)

            if (error.response.data.errors && error.response.data.errors.length > 0) {
                alert(`Error: ${error.response.data.mainError}. \nMensaje: ${error.response.data.errors[0].error} \nCampo: ${error.response.data.errors[0].field}   `);
            } else {
                alert(`Error: ${error.response.data.mainError} \nError Code: ${error.response.data.errorCode}` )
            }
        });
}

function processPaymentWithTrialPeriod(params) {

    const data = {
        user_id: params.userID,
        card: {
            number: params.cardNumber,
            expiration:params.expDate,
            cvc: params.cvc,
            type: ""
        },
        invoice: {
            number: params.invoice,
            description: params.descOrder,
            amount: params.amount,
        },
        billing: {
            first_name: params.firstName,
            last_name: params.lastName,
            company: params.company,
            address: params.address,
            city: params.city,
            state: params.state,
            zip_code: params.zipCode,
            country: params.country,
            phone_number: params.phone,
            // fax: "",
            email: params.email
        },
        shipping: {
            first_name: params.shipFirstName,
            last_name: params.shipLastName,
            company: params.shipCompany,
            address: params.shipAddress,
            city: params.shipCity,
            state: params.shipState,
            zip_code: params.shipZipCode,
            country: params.shipCountry
        }
    }

    // Make a GET request using Axios
    axios.post('http://localhost:3000/api/v1/paymentWithTrial', data)
        .then(function (response) {
            // Handle the successful response
            console.log(response)
            alert(`Pago procesado con exito: ${response.data.message}`)
            clearInput()
        })
        .catch(function (error) {
            // Handle errors 
            console.log(error)
            if (error.response.data.errors && error.response.data.errors.length > 0) {
                alert(`Error: ${error.response.data.mainError}. \nMensaje: ${error.response.data.errors[0].error} \nCampo: ${error.response.data.errors[0].field}   `);
            } else {
                alert(`Error: ${error.response.data.mainError} \nError Code: ${error.response.data.errorCode}` )
            }
        });
}
