// console.log(data)
console.log(typeof uniqueid)
var actionurl = "/api/formresponse/" + uniqueid + ""
document.getElementById("formgroup").setAttribute('action', "/api/formresponse/" + uniqueid + "");
getform()
async function getform() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "uniqueid": JSON.parse(uniqueid)
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    await fetch("http://localhost:3001/api/getform", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)

            var data = JSON.parse(result)
            // console.log(data)
            if (data.formelements == "Not valid url") {
                console.log("Not a valid form url")
                var parent = document.getElementById("formgroup")
                var obj = document.getElementById("submit-button")
                obj.remove()
                var errorpage = document.createElement("h1")
                errorpage.innerHTML = "Not a Valid form url"
                parent.appendChild(errorpage)

            }
            else {
                // console.log(JSON.parse(data.formelements))

                parse(JSON.parse(data.formelements))
            }

        })
        .catch(error => console.log('error', error));



}
i = 0
// data = JSON.parse(data)
// console.log(data)
function parse(data) {
    var formelements = data
    while (formelements[i] != undefined) {
        console.log(formelements[i])
        if (formelements[i].element == "formtitle")
            createTitle(formelements[i])
        if (formelements[i].element == "textbox")
            createTextBox(formelements[i])
        if (formelements[i].element == "button")
            createButton(formelements[i])
        if (formelements[i].element == "checkbox")
            createcheckbox(formelements[i])
        if (formelements[i].element == "radio")
            createradio(formelements[i])
        if (formelements[i].element == "textarea")
            createtextarea(formelements[i])
        if (formelements[i].element == "select")
            createselect(formelements[i])
        i = i + 1

    }
}
function createTitle(data) {
    id = data.id
    value = data.value

    var parent = document.getElementById("userform")
    var newdiv = document.createElement("div")
    newdiv.setAttribute("class", "formchild")
    parent.appendChild(newdiv);



    var element = document.createElement("h3")
    element.setAttribute("class", "form-group")
    element.style.marginLeft = "25px";
    element.innerHTML = value
    newdiv.appendChild(element)

}
function createTextBox(data) {
    id = data.id
    label = data.label
    placeholder = data.placeholder
    required = data.required
    type = data.type
    allowattach = data.allowattach
    var name = data.name
    if (allowattach == "on") {
        describename = data.describename
    }




    var parent = document.getElementById("userform")
    var newdiv = document.createElement("div")
    newdiv.setAttribute("class", "formchild")
    parent.appendChild(newdiv);



    var element = document.createElement("label")
    element.setAttribute("for", "textbox" + id)
    element.setAttribute("class", "form-label")
    element.style.marginLeft = "20px";
    element.innerHTML = label
    if (required == "on") {
        element.innerHTML = label + "*"
    }
    newdiv.appendChild(element)

    var element = document.createElement("input")
    element.setAttribute("class", "form-control")
    element.setAttribute("id", "textbox" + id)
    element.setAttribute("placeholder", placeholder)
    element.setAttribute("name", name)
    if (required == "on") {
        element.required = true
    }
    element.setAttribute("type", type)
    newdiv.appendChild(element)

    if (allowattach == "on") {

        var newattach = document.createElement("button");
        newattach.setAttribute("class", "accordion-button");
        newattach.setAttribute("type", "button");
        newattach.setAttribute("data-toggle", "collapse");
        newattach.setAttribute("data-target", "#collapseExample" + id);
        newattach.innerHTML = "Add additional info"
        newdiv.appendChild(newattach)

        var newattach = document.createElement("div");
        newattach.setAttribute("class", "collapse");
        newattach.setAttribute("id", "collapseExample" + id);
        // newdiv.innerHTML = "no html"
        newdiv.appendChild(newattach)


        var newattachcomp = document.createElement("div");
        newattachcomp.innerHTML = "Description"
        newattach.appendChild(newattachcomp)

        var newattachcomp = document.createElement("textarea");
        newattachcomp.setAttribute("class", "form-control textarea");
        newattachcomp.setAttribute("rows", "4");
        newattachcomp.setAttribute("cols", "35");
        // newdiv.innerHTML = "message"
        newattachcomp.setAttribute("id", label + "message" + id);
        newattachcomp.setAttribute("name", describename);
        newattach.appendChild(newattachcomp)

        var newattachcomp = document.createElement("label");
        newattachcomp.innerHTML = "Upload file"
        newattach.appendChild(newattachcomp)
        var newattachcomp = document.createElement("input");
        newattachcomp.setAttribute("class", "form-control-file")
        newattachcomp.setAttribute("type", "file");
        newattachcomp.setAttribute("name", label + "-fileid-" + id);
        newattachcomp.setAttribute("id", label + "file-id-" + id);
        newattach.appendChild(newattachcomp)

        var newattachcomp = document.createElement("label");
        newattachcomp.innerHTML = "Upload image"
        newattach.appendChild(newattachcomp)
        var newattachcomp = document.createElement("input");
        newattachcomp.setAttribute("class", "form-control-file")
        newattachcomp.setAttribute("type", "file");
        newattachcomp.setAttribute("id", label + "image-id-" + id);
        newattachcomp.setAttribute("name", label + "-imageid-" + id);
        newattachcomp.setAttribute("accept", "image/*");
        newattach.appendChild(newattachcomp)



    }




}
// function createButton(data) {
//     label = data.label
//     var parent = document.getElementById("userform")
//     var newdiv = document.createElement("div")
//     newdiv.setAttribute("class", "formchild")
//     parent.appendChild(newdiv);

//     var element = document.createElement("button")
//     element.setAttribute("class", "btn btn-primary btn-block")
//     element.setAttribute("type", "button")
//     element.innerHTML = label
//     element.setAttribute("id", "button" + id)
//     newdiv.appendChild(element)
// }
function createcheckbox(data) {
    id = data.id
    label = data.label
    var name = data.name

    var parent = document.getElementById("userform")
    var newdiv = document.createElement("div")
    newdiv.setAttribute("class", "formchild")
    parent.appendChild(newdiv);

    var element = document.createElement("input")
    element.setAttribute("class", "form-check-input")
    element.setAttribute("type", "checkbox")
    element.setAttribute("defaultValue", "")
    element.setAttribute("name", name)
    element.style.marginLeft = "20px";
    element.setAttribute("id", "checkbox" + id)
    newdiv.appendChild(element)

    var element = document.createElement("label")
    element.setAttribute("class", "form-check-label")
    element.setAttribute("for", "checkbox" + id)
    element.style.marginLeft = "45px";
    element.innerHTML = label
    newdiv.appendChild(element)

}
function createradio(data) {

    id = data.id
    label = data.label
    var name = data.name
    options = data.options
    console.log(options)
    var parent = document.getElementById("userform")
    var newdiv = document.createElement("div")
    newdiv.setAttribute("class", "formchild")
    parent.appendChild(newdiv);



    var newlabel = document.createElement("label")
    newlabel.innerHTML = label
    newlabel.style.marginLeft = "20px";
    newdiv.appendChild(newlabel)

    for (const s of options) {
        s1 = s.trim()
        var element = document.createElement("div");
        element.setAttribute("class", "form-check")
        element.style.marginLeft = "20px";
        newdiv.appendChild(element)
        var element1 = document.createElement("input")
        element1.setAttribute("class", "form-check-input")
        element1.setAttribute("type", "radio")
        element1.setAttribute("name", name)
        element1.setAttribute("id", "radio" + s1)
        element1.setAttribute("value", s1)
        element.appendChild(element1)

        var element2 = document.createElement("label")
        element2.setAttribute("class", "form-check-label")
        element2.setAttribute("for", "radio" + s1)
        element2.innerHTML = s1
        element.appendChild(element2)

    }
}
function createtextarea(data) {

    label = data.label
    var name = data.name


    var parent = document.getElementById("userform")
    var newdiv = document.createElement("div")
    newdiv.setAttribute("class", "md-form formchild")
    parent.appendChild(newdiv);



    var element = document.createElement("label")
    element.setAttribute("for", "textarea" + id)
    element.style.marginLeft = "20px";
    element.innerHTML = label
    newdiv.appendChild(element)

    var element = document.createElement("textarea")
    element.setAttribute("class", "md-textarea form-control")
    element.setAttribute("id", "textarea" + id)
    element.setAttribute("name", name)
    element.rows = 3
    newdiv.appendChild(element)



}
function createselect(data) {

    id = data.id
    label = data.label
    select = data.options
    var name = data.name


    var parent = document.getElementById("userform")
    var newdiv = document.createElement("div")
    newdiv.setAttribute("class", "formchild")
    parent.appendChild(newdiv);

    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", "id_from_input");
    newlabel.setAttribute("class", "label")
    newlabel.style.marginLeft = "20px"
    newlabel.innerHTML = label;
    newdiv.appendChild(newlabel);

    var element = document.createElement("select");

    element.setAttribute("value", "");
    element.setAttribute("class", "form-control");

    element.setAttribute("id", "selecttag-id-" + id);
    element.setAttribute("name", name);
    newdiv.appendChild(element);


    for (const s of select) {
        s1 = s.trim()
        var option = document.createElement("option");
        option.setAttribute("class", "form-control");
        option.value = s1;
        option.text = s1;
        element.appendChild(option);

    }



}
function sendresponse() {
    console.log($('form').serializeArray())


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "uniqueid": JSON.parse(uniqueid),
        "response": $('form').serializeArray()
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log(uniqueid)
    console.log(raw)
    fetch("http://localhost:3001/api/formresponse", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}