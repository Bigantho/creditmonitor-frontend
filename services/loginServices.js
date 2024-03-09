
document.write('<script type="text/javascript" src="../constants.js"></script>');

function login(params) {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    // Make a GET request using Axios
    axios.post(`${URL_API}/v1/login`, { user: params.user, password: params.password }, { headers })
        .then(function (response) {
            // Handle the successful response
            document.cookie = `userLogged=${response.data.user.id}`;
            document.cookie = `userLoggedEmail=${response.data.user.email}`;
            window.location.href = 'savePayment.html'
        })
        .catch(function (error) {
            // Handle errors
            alert("Información no valida.")
        });
}