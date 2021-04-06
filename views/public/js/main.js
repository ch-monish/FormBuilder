id = 1
sectionid = 1
var formelements = {}
console.log(uniqueid)
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
                console.log("working")

            }
            else {
                // console.log(JSON.parse(data.formelements))
                console.log("working1")
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
    document.getElementById("formtitle").value = data.value

}
function createTextBox(data) {
    if (data.method == undefined) {
        id = data.id
        label = data.label
        placeholder = data.placeholder
        required = data.required
        type = data.type
        allowattach = data.allowattach
    }
    else {
        var label = document.getElementById("textboxmodal-label").value
        console.log(label)
        var placeholder = document.getElementById("textboxmodal-placeholder").value
        var allowattach = document.getElementById("switch1").value
        var required = document.getElementById("switch0").value
        console.log(placeholder)
        var texttype = document.querySelectorAll('input[name="type"]')
        var type;
        for (const t of texttype) {
            if (t.checked) {
                type = t.value
                break;
            }
        }
    }


    console.log(type)
    console.log(required)
    console.log(allowattach)




    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild");
    newdiv.setAttribute("id", "form-group formchild" + id);
    newdiv.setAttribute("draggable", "true");
    // newdiv.setAttribute("ondragstart", "handleDragStart('form-group formchild' + " + id + "')")

    var customize = document.createElement("div")
    customize.setAttribute("class", "customize")
    customize.innerHTML = "x"
    customize.setAttribute("onclick", "deletefun('form-group formchild" + id + "','" + id + "')")
    newdiv.appendChild(customize)

    var foo = document.getElementById("formparent");
    foo.appendChild(newdiv);



    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", "id_from_input");
    newlabel.setAttribute("class", "label")
    newlabel.innerHTML = label;
    if (required == "on") {
        newlabel.innerHTML = label + "*"
    }
    newdiv.appendChild(newlabel);

    var element = document.createElement("input");
    element.setAttribute("type", type);
    element.setAttribute("value", "");
    element.setAttribute("class", "form-control");
    element.setAttribute("id", "textbox-id-" + id);
    element.setAttribute("placeholder", placeholder);
    element.setAttribute("name", "textbox-" + id);
    if (required == "on") {
        element.required = true;
        console.log("required is true")
    }
    newdiv.appendChild(element);

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
        newattachcomp.setAttribute("name", label + "-message" + id);
        newattach.appendChild(newattachcomp)

        var newattachcomp = document.createElement("label");
        newattachcomp.innerHTML = "Upload file"
        newattach.appendChild(newattachcomp)
        var newattachcomp = document.createElement("input");
        newattachcomp.setAttribute("class", "form-control-file")
        newattachcomp.setAttribute("type", "file");
        newattachcomp.setAttribute("id", label + "file-id-" + id);
        newattachcomp.setAttribute("name", label + "-file-id-" + id);
        newattach.appendChild(newattachcomp)

        var newattachcomp = document.createElement("label");
        newattachcomp.innerHTML = "Upload image"
        newattach.appendChild(newattachcomp)
        var newattachcomp = document.createElement("input");
        newattachcomp.setAttribute("class", "form-control-file")
        newattachcomp.setAttribute("type", "file");
        newattachcomp.setAttribute("id", label + "image-id-" + id);
        newattachcomp.setAttribute("name", label + "image-id-" + id);
        newattachcomp.setAttribute("accept", "image/*");
        newattach.appendChild(newattachcomp)



    }

    formelements[id] = { "id": id, "element": "textbox", "label": label, "placeholder": placeholder, "type": type, "required": required, "allowattach": allowattach };
    id++
}
function createButton() {
    var button = document.getElementById("buttonmodal-button").value

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild");
    newdiv.setAttribute("id", "form-group formchild" + id)
    newdiv.setAttribute("draggable", "true");
    var customize = document.createElement("div")
    customize.setAttribute("class", "customize")
    customize.innerHTML = "x"
    customize.setAttribute("onclick", "deletefun('form-group formchild" + id + "','" + id + "')")
    newdiv.appendChild(customize)



    var foo = document.getElementById("formparent");
    foo.appendChild(newdiv);




    var newbutton = document.createElement("button");
    newbutton.setAttribute("class", "btn btn-primary");
    newbutton.setAttribute("type", "button");
    newbutton.setAttribute("id", "button-id-" + id);
    newbutton.setAttribute("name", "button-" + id);
    // newbutton.setAttribute("text", "button");
    newbutton.innerHTML = button
    newdiv.appendChild(newbutton);
    formelements[id] = { "id": id, "element": "button", "label": button }
    id++
}

function createcheckbox(data) {

    if (data.method == undefined) {
        id = data.id
        label = data.label
    }
    else {
        var label = document.getElementById("checkboxmodal-text").value
        console.log(label)
    }



    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild form-check");
    newdiv.setAttribute("id", "form-group formchild form-check" + id)
    newdiv.setAttribute("draggable", "true");
    var customize = document.createElement("div")
    customize.setAttribute("class", "customize")
    customize.innerHTML = "x"
    customize.setAttribute("onclick", "deletefun('form-group formchild form-check" + id + "','" + id + "')")
    newdiv.appendChild(customize)


    // newdiv.setAttribute("class", "form-check");
    var foo = document.getElementById("formparent");
    foo.appendChild(newdiv);





    var element = document.createElement("input");
    element.setAttribute("type", "checkbox");
    element.setAttribute("value", "");
    element.style.marginLeft = "20px"
    element.setAttribute("class", "form-check-input");
    element.setAttribute("id", "checkbox-id-" + id);
    element.setAttribute("name", "checkbox-" + id);
    newdiv.appendChild(element);


    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", "id_from_input");
    newlabel.setAttribute("class", "form-check-label")
    newlabel.style.marginLeft = "45px"
    newlabel.setAttribute("for", "checkbox-id-" + id)
    newlabel.innerHTML = label;
    newdiv.appendChild(newlabel);
    formelements[id] = { "id": id, "element": "checkbox", "label": label }
    id++
}
function createselect(data) {
    if (data.method == undefined) {
        id = data.id
        label = data.label
        selects = data.options
    }
    else {
        label = document.getElementById("selectmodal-input").value
        console.log(label)
        var selectss = document.getElementById("selectmodal-Textarea").value
        selects = selectss.split(",")
    }
    for (const s of selects) {
        console.log(s)

    }

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild");
    newdiv.setAttribute("id", "form-group formchild" + id);
    newdiv.setAttribute("draggable", "true");
    var customize = document.createElement("div")
    customize.setAttribute("class", "customize")
    customize.innerHTML = "x"
    customize.setAttribute("onclick", "deletefun('form-group formchild" + id + "','" + id + "')")
    newdiv.appendChild(customize)



    var foo = document.getElementById("formparent");
    foo.appendChild(newdiv);



    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", "id_from_input");
    newlabel.setAttribute("class", "label")

    newlabel.innerHTML = label;
    newdiv.appendChild(newlabel);

    var element = document.createElement("select");

    element.setAttribute("value", "");
    element.setAttribute("class", "form-control");

    element.setAttribute("id", "selecttag-id-" + id);
    element.setAttribute("name", label);
    newdiv.appendChild(element);


    for (const s of selects) {
        s1 = s.trim()
        var option = document.createElement("option");
        option.setAttribute("class", "form-control");
        option.value = s1;
        option.text = s1;
        element.appendChild(option);

    }


    formelements[id] = { "id": id, "element": "select", "label": label, "options": selects }
    id++
}


function createtextarea(data) {
    if (data.method == undefined) {
        id = data.id
        label = data.label
    }
    else {
        label = document.getElementById("textarea-input").value
    }

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild");
    newdiv.setAttribute("id", "form-group formchild" + id);
    newdiv.setAttribute("draggable", "true");
    var customize = document.createElement("div")
    customize.setAttribute("class", "customize")
    customize.innerHTML = "x"
    customize.setAttribute("onclick", "deletefun('form-group formchild" + id + "','" + id + "')")
    newdiv.appendChild(customize)


    var foo = document.getElementById("formparent");
    foo.appendChild(newdiv);


    var newlabel = document.createElement("label")
    newlabel.innerHTML = label
    newdiv.appendChild(newlabel)

    var newtextarea = document.createElement("textarea")
    newtextarea.setAttribute("class", "form-control")
    newtextarea.setAttribute("id", "textarea" + id)
    newtextarea.setAttribute("name", "textarea" + id)

    newtextarea.setAttribute("rows", "3")
    newdiv.appendChild(newtextarea)
    formelements[id] = { "id": id, "element": "textarea", "label": label }
    id++

}

function createradio(data) {
    if (data.method == undefined) {

        id = data.id
        label = data.label
        options = data.options
    }
    else {
        label = document.getElementById("selectradio-input").value
        console.log(label)
        var optionss = document.getElementById("selectradio-Textarea").value
        options = optionss.split(",")
    }
    for (const s of options) {
        console.log(s)

    }

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild");
    newdiv.setAttribute("id", "form-group formchild" + id);
    newdiv.setAttribute("draggable", "true");
    var customize = document.createElement("div")
    customize.setAttribute("class", "customize")
    customize.innerHTML = "x"
    customize.setAttribute("onclick", "deletefun('form-group formchild" + id + "','" + id + "')")
    newdiv.appendChild(customize)



    var foo = document.getElementById("formparent");
    foo.appendChild(newdiv);

    var newlabel = document.createElement("label")
    newlabel.innerHTML = label
    newdiv.appendChild(newlabel)

    for (const s of options) {
        s1 = s.trim()
        var element = document.createElement("div");
        element.setAttribute("class", "form-check")
        newdiv.appendChild(element)
        var element1 = document.createElement("input")
        element1.setAttribute("class", "form-check-input")
        element1.setAttribute("type", "radio")
        element1.setAttribute("name", label)
        element1.setAttribute("id", "radio" + s1)
        element1.setAttribute("value", s1)
        element.appendChild(element1)

        var element2 = document.createElement("label")
        element2.setAttribute("class", "form-check-label")
        element2.innerHTML = s1
        element.appendChild(element2)

    }
    formelements[id] = { "id": id, "element": "radio", "label": label, "options": options }
    id++
}

function deletefun(a, id) {
    console.log(a)
    var myobj = document.getElementById(a);
    myobj.remove();
    // console.log(delete formelements[a])
    console.log(formelements[id] = {})
}



function createsection() {
    console.log("new section")
    var formsection = document.getElementById("formgroup")

    section = document.createElement("div")
    section.setAttribute("class", "dropzone")
    section.setAttribute("id", "section" + sectionid)
    // section.setAttribute("ondblclick", "document.getElementById('section+" + sectionid + "').remove()")
    section.setAttribute("ondblclick", "document.getElementById('section" + sectionid + "').remove()")

    formsection.appendChild(section)
    sectionid++
}




var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;

    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {

    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {

    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {

    if (event.target.className == "dropzone") {
        event.target.style.background = "pink";
    }

}, false);

document.addEventListener("dragleave", function (event) {

    if (event.target.className == "dropzone") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function (event) {

    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }
}, false);

function usersview() {
    // location.replace("./userview.html")
    // var user = document.getElementById("userform")
    // console.log(user)
    formtitle = document.getElementById('formtitle').value
    formelements[0] = { "id": 0, "element": "formtitle", "value": formtitle }

    var pageContent = document.getElementById("formparent").innerHTML;
    localStorage.setItem("page1content", pageContent);
    var user = document.getElementById("userform")

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // console.log(formelements)
    var raw = JSON.stringify({ "username": "monish", "formelements": formelements, "uniqueid": JSON.parse(uniqueid) });
    // console.log(raw)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3001/api/recieve", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            if (result.message = "success") {
                result1 = JSON.parse(result)
                if (document.getElementById("responseslink") != null) {
                    document.getElementById("responseslink").remove()
                }
                var element = document.createElement("a")
                element.innerHTML = "http://localhost:3001/form/" + result1["uniqueid"] + ""
                element.href = "http://localhost:3001/form/" + result1["uniqueid"] + ""
                element.setAttribute("id", "responseslink")
                element.target = "_blank"
                var foo = document.getElementById("formgroup");
                foo.appendChild(element);


            }
        })
        .catch(error => console.log('error', error));



}
async function fetchResponses() {
    console.log(uniqueid)


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
    await fetch("http://localhost:3001/api/fetchresponses", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)

            var data = JSON.parse(result)
            console.log(data)
            if (data.message.length == []) {
                console.log("no responses yet")
                document.getElementById("responsestatus").innerHTML = "No Responses yet"
            }
            else {
                document.getElementById("responsestatus").innerHTML = "" + data.message.length + " Responses Recieved"
            }


        })
        .catch(error => console.log('error', error));




}

