document.write('<script type="text/javascript" src="../constants.js"></script>');
document.write('<script type="text/javascript" src="../js/loading.js"></script>');


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

function openView(view) {
    alert
    window.location.href = view
}

function cerrarSesion() {
    clearCookies()
    window.location.href = 'index.html'
}

function getData(userID) {
    showLoader()
    axios.get(`${URL_API}/v1/payment/total`)
        .then(function (response) {
            setData(response.data)
            hideLoader()
            // Agregamos el datatable para los filtros
            $('#tblPayments').DataTable({
                deferRender: true,
            });
        })
        .catch(function (error) {
            // Handle errors 
            console.log(error)
            hideLoader()

            alert(`Error: ${error.response.data.mainError}. \nMensaje: ${error.response.data.errors[0].error} \nCampo: ${error.response.data.errors[0].field}   `);
        });
}

function setData(payments) {
    const table = $('#tblPayments tbody')
    payments.forEach((x, i) => {
        let row = $('<tr><td class="text-center">' + (i + 1) + '</td><td class="text-center">' + x.trx_id + '</td><td class="text-center">' + x.client_name + '</td><td class="text-center">'+x.phone_number+'</td><td class="text-center">'+x.type_payment+'</td><td class="text-center">' + x.amount + '</td><td class="text-center">' + x.date_created + '</td><td class="text-center">'+x.user_name_charged+'</td></tr>')
        table.append(row)
    });
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
