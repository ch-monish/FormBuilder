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
                resultjson = JSON.parse(result)
                if (resultjson.message == "login successfull") {
                    await location.replace(`http://localhost:3001/Dashboard/${username}`)
                }
                else {
                    console.log(result.message)
                    alert("Incorrect Username or Password")
                    location.reload()
                }
            })
            .catch(error => console.log('error', error));



    }
}