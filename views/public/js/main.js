id = 1
sectionid = 1
var formelements = {}
var x = document.getElementById("formparent")
sortedarray = []
sortedformelements = {}
var responsesarr = []
var finalresponesarr = []
console.log(username)
console.log(uniqueid)
// getform()
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
        .then(async result => {
            // console.log(result)

            var data = await JSON.parse(result)
            // console.log(data)
            if (data.formelements == "Not valid url") {
                console.log("working")

            }
            else {
                console.log(JSON.parse(data.formelements))
                console.log("working1")
                parse(JSON.parse(data.formelements))
            }

        })
        .catch(error => console.log('error', error));



}
i = 0
// data = JSON.parse(data)
async function parse(data) {
    var formelements = data
    var orderid = 1
    while (formelements[i] != undefined) {
        console.log(formelements[i])
        if (formelements[i].element == "formtitle")
            await createTitle(formelements[i])

        if (formelements[i].element == "textbox") {
            await createTextBox(formelements[i])
            if (formelements[i].id > orderid) { orderid = formelements[i].id }
        }
        if (formelements[i].element == "button")
            console.log("")
        if (formelements[i].element == "checkbox") {
            createcheckbox(formelements[i])
            if (formelements[i].id > orderid) { orderid = formelements[i].id }
        }
        if (formelements[i].element == "radio") {
            createradio(formelements[i])
            if (formelements[i].id > orderid) { orderid = formelements[i].id }
        }
        if (formelements[i].element == "textarea") {
            createtextarea(formelements[i])
            if (formelements[i].id > orderid) { orderid = formelements[i].id }

        }
        if (formelements[i].element == "select") {
            createselect(formelements[i])
            if (formelements[i].id > orderid) { orderid = formelements[i].id }
        }
        i = i + 1

    }

    id = orderid + 1
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
        name = data.name
        if (data.allowattach == "on") {
            describename = data.describename
        }
    }
    else {
        var name = ""
        var describename = ""
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
    newdiv.setAttribute("id", "" + id);
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
    var name = "textbox-" + id
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
        newattachcomp.setAttribute("name", label + "message" + id);
        describename = label + "message" + id
        newattach.appendChild(newattachcomp)

        var newattachcomp = document.createElement("label");
        newattachcomp.innerHTML = "Upload file"
        newattach.appendChild(newattachcomp)
        var newattachcomp = document.createElement("input");
        newattachcomp.setAttribute("class", "form-control-file")
        newattachcomp.setAttribute("type", "file");
        newattachcomp.setAttribute("id", label + "file-id-" + id);
        newattachcomp.setAttribute("name", label + "-fileid-" + id);
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
    if (allowattach == "on") {
        formelements[id] = { "id": id, "element": "textbox", "name": name, "describename": describename, "filename": label + "-fileid-" + id, "imagename": label + "-imageid-" + id, "label": label, "placeholder": placeholder, "type": type, "required": required, "allowattach": allowattach };

    }
    else {
        formelements[id] = { "id": id, "element": "textbox", "name": name, "label": label, "placeholder": placeholder, "type": type, "required": required, "allowattach": allowattach };

    }
    if (data.method != undefined) {
        id++
    }
}


function createcheckbox(data) {

    if (data.method == undefined) {
        id = data.id
        label = data.label
        name = data.name
    }
    else {
        var name = ""
        var label = document.getElementById("checkboxmodal-text").value
        console.log(label)
    }



    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild form-check");
    newdiv.setAttribute("id", "" + id)
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
    name = "checkbox-" + id
    newdiv.appendChild(element);


    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", "id_from_input");
    newlabel.setAttribute("class", "form-check-label")
    newlabel.style.marginLeft = "45px"
    newlabel.setAttribute("for", "checkbox-id-" + id)
    newlabel.innerHTML = label;
    newdiv.appendChild(newlabel);
    formelements[id] = { "id": id, "element": "checkbox", "name": name, "label": label }
    if (data.method != undefined) {
        id++
    }
}
function createselect(data) {
    if (data.method == undefined) {
        id = data.id
        label = data.label
        selects = data.options
        name = data.name
    }
    else {
        var name = ""
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
    newdiv.setAttribute("id", "" + id);
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
    element.setAttribute("name", label + id);
    name = label + id
    newdiv.appendChild(element);


    for (const s of selects) {
        s1 = s.trim()
        var option = document.createElement("option");
        option.setAttribute("class", "form-control");
        option.value = s1;
        option.text = s1;
        element.appendChild(option);

    }


    formelements[id] = { "id": id, "element": "select", "label": label, "name": name, "options": selects }
    if (data.method != undefined) {
        id++
    }
}

function createtextarea(data) {
    if (data.method == undefined) {
        id = data.id
        label = data.label
        name = data.name
    }
    else {
        var name = ""
        label = document.getElementById("textarea-input").value
    }

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "form-group formchild");
    newdiv.setAttribute("id", "" + id);
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
    name = "textarea" + id

    newtextarea.setAttribute("rows", "3")
    newdiv.appendChild(newtextarea)
    formelements[id] = { "id": id, "element": "textarea", "name": name, "label": label }
    if (data.method != undefined) {
        id++
    }

}

function createradio(data) {
    if (data.method == undefined) {

        id = data.id
        label = data.label
        options = data.options
        name = data.name
    }
    else {
        var name = ""
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
    newdiv.setAttribute("id", "" + id);
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
        element1.setAttribute("name", label + id)
        name = label + id
        element1.setAttribute("id", "radio" + s1)
        element1.setAttribute("value", s1)
        element.appendChild(element1)

        var element2 = document.createElement("label")
        element2.setAttribute("class", "form-check-label")
        element2.innerHTML = s1
        element.appendChild(element2)

    }
    formelements[id] = { "id": id, "element": "radio", "label": label, "name": name, "options": options }
    if (data.method != undefined) {
        id++
    }
}

function deletefun(a, id) {
    console.log(a)
    var myobj = document.getElementById(id);
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
// document.addEventListener("drag", function (event) {

// }, false);

// document.addEventListener("dragstart", function (event) {
//     // store a ref. on the dragged elem
//     dragged = event.target;

//     event.target.style.opacity = .5;
// }, false);

// document.addEventListener("dragend", function (event) {

//     event.target.style.opacity = "";
// }, false);

// /* events fired on the drop targets */
// document.addEventListener("dragover", function (event) {

//     event.preventDefault();
// }, false);

// document.addEventListener("dragenter", function (event) {

//     if (event.target.className == "dropzone") {
//         event.target.style.background = "pink";
//     }

// }, false);

// document.addEventListener("dragleave", function (event) {

//     if (event.target.className == "dropzone") {
//         event.target.style.background = "";
//     }

// }, false);

// document.addEventListener("drop", function (event) {

//     event.preventDefault();
//     // move dragged elem to the selected drop target
//     if (event.target.className == "dropzone") {
//         event.target.style.background = "";
//         dragged.parentNode.removeChild(dragged);
//         event.target.appendChild(dragged);
//     }
// }, false);

async function usersview() {
    // location.replace("./userview.html")
    // var user = document.getElementById("userform")
    // console.log(user)
    await sorted()
    formtitle = document.getElementById('formtitle').value
    formelements[0] = { "id": 0, "element": "formtitle", "value": formtitle }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // console.log(formelements)
    var raw = JSON.stringify({ "username": JSON.parse(username), "formelements": formelements, "uniqueid": JSON.parse(uniqueid) });
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
                responsesarr = []
                document.getElementById("responsestatus").innerHTML = "" + data.message.length + " Responses Recieved"
                element1 = document.createElement("button")
                element1.setAttribute("class", "btn btn-primary")
                element1.setAttribute("onclick", "converttoexcel()")
                element1.innerHTML = "download excel"
                element1.setAttribute("aria-label", "download")
                element1.style.float = "right"
                document.getElementById("responsestatus").appendChild(element1)
                for (let i of data.message) {
                    console.log(i.response)
                    responsesarr.push(JSON.parse(i.response))
                }
                showResponses()
            }


        })
        .catch(error => console.log('error', error));




}

function sorted() {
    // x.forEach(element => {
    //     console.log(x["childNodes"][element].id)

    // });
    sortedformelements = {}
    sortedarray = []
    var keyid = 1
    var x = document.getElementById("formparent")
    var sortedformelements = {}
    var sortedarr = []
    console.log(x["childNodes"])
    for (i of x["childNodes"]) {
        sortedarr.push(i.id)
    }
    console.log(sortedarr)
    sortedarray = sortedarr;
    console.log(formelements)

    var formelementsarr = []
    var keys = Object.keys(formelements);
    keys.forEach(function (key) {
        formelementsarr.push(formelements[key]);
    });
    console.log(formelementsarr);


    for (i in sortedarr) {
        // console.log(sortedarr[i])
        console.log(formelementsarr.find(x => x.id == sortedarr[i]))
        sortedformelements[keyid] = formelementsarr.find(x => x.id == sortedarr[i])
        keyid = keyid + 1;
    }

    console.log(sortedformelements)
    formelements = sortedformelements
    console.log(formelements)
}

function showResponses() {
    document.getElementById("table-body").innerHTML = ""
    // sorted()
    var finalresponearr = []
    finalresponesarr = []
    // console.log(responsesarr)
    formquestionsarr = Object.values(formelements)
    console.log(formquestionsarr)

    for (i = 0; i < responsesarr.length; i++) {
        console.log(responsesarr[i])
        for (e in formelements) {
            // console.log(formelements[e].name)
            propertyobj = Object.assign({}, formelements[e]);
            console.log(propertyobj)
            for (var property in responsesarr[i]) {
                if (property == formelements[e].name) {
                    temp = property

                    // propertyobj = JSON.parse(JSON.stringify(formelements))
                    propertyobj["answer"] = responsesarr[i][property]
                    if (formelements[e].allowattach == "on") {
                        // console.log(formelements[e])
                        // console.log(formelements[e][describename])
                        for (var p in formelements[e]) {
                            if (p == "describename") {

                                console.log(formelements[e]["describename"])
                                tempdescribe = formelements[e]["describename"]
                                if (responsesarr[i].hasOwnProperty(tempdescribe)) {
                                    console.log(responsesarr[i][tempdescribe])
                                    propertyobj["describeanswer"] = responsesarr[i][tempdescribe]
                                }
                            }
                        }
                        for (var p in formelements[e]) {
                            if (p == "filename") {

                                console.log(formelements[e]["filename"])
                                tempfile = formelements[e]["filename"]
                                if (responsesarr[i].hasOwnProperty(tempfile)) {
                                    console.log(responsesarr[i][tempfile])
                                    propertyobj["filenameanswer"] = responsesarr[i][tempfile]
                                }
                            }
                        }
                        for (var p in formelements[e]) {
                            if (p == "imagename") {

                                console.log(formelements[e]["imagename"])
                                tempimage = formelements[e]["imagename"]
                                if (responsesarr[i].hasOwnProperty(tempimage)) {
                                    console.log(responsesarr[i][tempimage])
                                    propertyobj["imagenameanswer"] = responsesarr[i][tempimage]
                                }
                            }
                        }
                    }

                    //   finalresponearr.push()
                }

            }
            finalresponearr.push(propertyobj)

        }
        console.log("")
        finalresponesarr.push(finalresponearr)
        console.log(finalresponearr)
        finalresponearr = []



    }
    console.log(finalresponesarr)


    var state = {
        'querySet': finalresponesarr,

        'page': 1,
        'rows': 1,
        'window': 5,
    }

    buildTable()

    function pagination(querySet, page, rows) {

        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = querySet.slice(trimStart, trimEnd)

        var pages = Math.round(querySet.length / rows);

        return {
            'querySet': trimmedData,
            'pages': pages,
        }
    }

    function pageButtons(pages) {
        var wrapper = document.getElementById('pagination-wrapper')

        wrapper.innerHTML = ``
        console.log('Pages:', pages)
        console.log("page : " + state.page)

        var maxLeft = (state.page - Math.floor(state.window / 2))
        var maxRight = (state.page + Math.floor(state.window / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.window
        }

        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1)

            if (maxLeft < 1) {
                maxLeft = 1
            }
            maxRight = pages
        }



        for (var page = maxLeft; page <= maxRight; page++) {
            wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-primary">${page}</button>`
        }

        if (state.page != 1) {
            wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-primary">&#171; First</button>` + wrapper.innerHTML
        }

        wrapper.innerHTML = `<button value=${state.page > 1 ? state.page - 1 : state.page} class="page btn btn-sm btn-primary">&#171;  </button>` + wrapper.innerHTML

        if (state.page != pages) {
            wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-primary">Last &#187;</button>`
        }
        wrapper.innerHTML += `<button value=${state.page > pages - 1 ? state.page : state.page + 1} class="page btn btn-sm btn-primary"> &#187;</button>`
        $('.page').on('click', function () {
            $('#table-body').empty()
            if (state.page > 0 || state.page <= pages) {
                state.page = Number($(this).val())
            }
            buildTable()
        })

    }


    async function buildTable() {

        var table = $('#table-body')

        var data = pagination(state.querySet, state.page, state.rows)
        var myList = data.querySet

        for (var i = 1 in myList) {
            var row = ``
            for (var j in myList[i]) {
                // document.getElementById("table-body").innerHTML = ""

                // <div class="card" ></div>
                row = row + `<div style="margin-bottom:10px;background-color:white;border-radius:8px;padding:5px;" ><div> <tr>
                <td>${myList[i][j].label}</td></tr></div>` + `<tr><div style="color:blue;">
                <td>${myList[i][j].answer != undefined ? myList[i][j].answer : "---Not Answered---"}</td></div></tr></div>`
                if (myList[i][j].allowattach) {
                    if (myList[i][j].describeanswer != undefined) {
                        row = row + `<div style="margin-bottom:10px;background-color:white;border-radius:8px;padding:5px;" ><div> <tr>
                        <td>Description</td></tr></div>` + `<tr><div style="color:blue;">
                        <td>${myList[i][j].describeanswer}</td></div></tr></div>`
                    }
                    if (myList[i][j].filenameanswer != undefined) {
                        row = row + `<div style="margin-bottom:10px;background-color:white;border-radius:8px;padding:5px;" ><div> <tr>
                        <td ><a href='http://localhost:3001/api/download/${JSON.parse(uniqueid)}/"${myList[i][j].filenameanswer}"/' download >${myList[i][j].filenameanswer}</a></td></tr></div></div>`
                    }
                    if (myList[i][j].imagenameanswer != undefined) {
                        row = row + `<div style="margin-bottom:10px;background-color:white;border-radius:8px;padding:5px;" ><div > <tr>
                        <td ><a href='http://localhost:3001/api/download/${JSON.parse(uniqueid)}/"${myList[i][j].imagenameanswer}"/' download >${myList[i][j].imagenameanswer}</a></td></tr></div></div>`
                    }

                }

                // row = row + `<div class="card" > <h5 class="card-title">${myList[i][j].label}</h5><p>${myList[i][j].answer}</p></div>`
            }
            table.append(row)
        }

        pageButtons(data.pages)
    }



    //endpagination

}

// async function downloadfiles(filename) {
//     console.log(filename)
//     console.log(uniqueid)
//     url = 'http://localhost:3001/api/download/' + JSON.parse(uniqueid) + '/"' + filename + '"/'
//     console.log(url)
//     window.open(
//         url, "_blank");

//     await fetch(url, {
//         method: "GET"
//     })
//         .then(response => response.text())
//         .then(async result => {
//             // console.log(result)
//             documentresult = result
//             console.log(result)

//             return result

//         })

//     // console.log(b)
// }
async function converttoexcel() {
    var toexcell = []
    var toexcel = {}
    var excellobject = {}
    var toexcelobject = {}
    if (finalresponesarr.length != 0) {
        console.log("convert to excel")
        console.log(finalresponesarr)
        for (o of finalresponesarr) {
            // console.log(o)
            var i = 0
            for (e in o) {
                for (f in e) {

                    // console.log(o[e])
                    if (o[e].answer != undefined) {
                        excellobject["label"] = o[e].label
                        excellobject["answer"] = o[e].answer
                        // excellobject[o[e].label] = o[e].answer
                        if (o[e].required == "on") {
                            excellobject["Description"] = "Description"
                            excellobject["describeanswer"] = o[e].describeanswer
                        }
                    }
                    else {
                        excellobject["label"] = o[e].label
                        // excellobject["answer"] = undefined
                    }

                }

                console.log(excellobject)

                // toexcel.push(excellobject)
                toexcel[excellobject["label"]] = excellobject["answer"]
                if (excellobject["Description"] != undefined) {
                    toexcel["Description"] = excellobject["describeanswer"]
                }
                i = i++
                excellobject = {}
            }

            console.log(toexcel)
            // toexcelobject = Object.assign({}, toexcel)
            toexcell.push(toexcel)
            toexcel = {}
            toexcelobject = {}
        }
        console.log(toexcell)

    }


    jsondata =
    {
        color: "red",
        value: "#f00"
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "data": toexcell
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    await fetch("http://localhost:3001/api/jsontoexcel/" + uniqueid + "", requestOptions)
        .then(response => response.text())
        .then(async result => {
            // console.log(result) 
        })
    url = `http://localhost:3001/api/download/${JSON.parse(uniqueid)}/"${JSON.parse(uniqueid)}output.xlsx"`
    console.log(url)
    window.open(url)

}