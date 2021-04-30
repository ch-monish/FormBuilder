function getInfo() {
    console.log("function")
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value


    if (username == "" || password == "") {
        alert("Incorrect Username or Password")
    }
    else {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/login", requestOptions)
            .then(response => response.text())
            .then(async result => {
                console.log(result)
                await location.replace(`http://localhost:3001/Dashboard/${username}`)
            })
            .catch(error => console.log('error', error));



    }
}