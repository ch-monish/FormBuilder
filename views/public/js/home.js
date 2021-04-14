var username = "monish"

i = 0
formtitle = ""
async function getallforms() {
    // console.log("working")

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": username
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:3001/api/getallforms", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result))
            // console.log(typeof result)
            forms = JSON.parse(result)

        })
        .catch(error => console.log('error', error));



    form = forms["forms"]
    while (form[i] != undefined) {
        // console.log(form[i].formelements)
        formelement = JSON.parse(form[i].formelements)
        formtitle = formelement[0].value
        link = form[i].uniqueid
        time = form[i].time
        // time = Date.parse(timestring)
        var dt = new Date(time);
        createview(formtitle, link, dt)

        i++;
    }

}
async function createview(formtitle, uniqueid, time) {
    console.log("new div")
    var parent = document.getElementById("group")

    var card = document.createElement("div")
    card.setAttribute("class", "col-md-3 ")
    parent.appendChild(card)

    var newcard = document.createElement("div")
    newcard.setAttribute("class", "card")
    // newcard.innerHTML = formtitle
    card.appendChild(newcard)

    var cardbody = document.createElement("div")
    cardbody.setAttribute("class", "card-body")
    newcard.appendChild(cardbody)

    var cardtitle = document.createElement("h6")
    cardtitle.setAttribute("class", "card-title")
    cardtitle.innerHTML = formtitle
    cardbody.appendChild(cardtitle)

    var para = document.createElement("label")
    para.setAttribute("class", "card-text")
    para.innerHTML = username
    para.style.color = "blue"
    cardbody.appendChild(para)

    var para = document.createElement("p")
    para.setAttribute("class", "card-text")
    para.innerHTML = "Responses recieved: " + await fetchResponses(uniqueid)
    para.style.color = "blue"
    cardbody.appendChild(para)

    var para = document.createElement("p")
    para.setAttribute("class", "card-text")
    para.innerHTML = "Created on: " + time.getDate() + "-" + (time.getMonth() + 1) + "-" + time.getFullYear();
    para.style.color = "blue"
    cardbody.appendChild(para)


    var para = document.createElement("p")
    para.setAttribute("class", "btn btn-light")
    para.innerHTML = "Goto Form"
    para.setAttribute("onclick", "GotoForm('" + uniqueid + "')")
    para.style.color = "blue"
    cardbody.appendChild(para)

    var para = document.createElement("p")
    cardbody.appendChild(para)


    var anchor = document.createElement("button")
    anchor.setAttribute("class", "btn btn-primary")
    anchor.innerHTML = "Delete This Form"
    anchor.setAttribute("onclick", "DeleteForm('" + uniqueid + "')")
    cardbody.appendChild(anchor)

}
function DeleteForm(uniqueid) {
    console.log(uniqueid)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "uniqueid": uniqueid
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3001/api/deleteform", requestOptions)
        .then(response => response.text())
        .then(result => { console.log(result); location.reload() })
        .catch(error => console.log('error', error));
}

function GotoForm(uniqueid) {
    console.log(uniqueid)
    console.log(username)

    // window.open("https://localhost:3001/formbuilder/" + username + "/" + uniqueid + "", '_blank');
    location.replace("http://localhost:3001/formbuilder/" + username + "/" + uniqueid + "")
    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    // };

    // fetch("http://localhost:3001/formbuilder/" + username + "/" + uniqueid + ", requestOptions")
    //     .then(response => response.text())
    //     .then(result => {console.log(result);location.})
    //     .catch(error => console.log('error', error));
}
async function fetchResponses(uniqueid) {
    console.log(uniqueid)
    var noofresponses = 0

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "uniqueid": uniqueid
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        let response = await fetch("http://localhost:3001/api/fetchresponses", requestOptions);


        const res = await response.text()
        return JSON.parse(res).message.length

    }
    catch (e) {
        console.log(e)
    }

}