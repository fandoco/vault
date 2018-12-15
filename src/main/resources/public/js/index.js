function getTypes() {
    let url2 = "https://fandoco-vault.herokuapp.com/types";

    //Fetch the content of the url using the XMLHttpRequest object
    let req2 = new XMLHttpRequest();
    req2.open("GET", url2);
    req2.send(null);


    //register an event handler function
    req2.onreadystatechange = function () {
        if (req2.readyState === 4 && req2.status === 200) {
            var response = req2.responseText;
            var types = JSON.parse(response);

            var list = "";
            console.log(response);
            for (let i = 0; i < types.length; i++) {
                console.log("types", types[i]);
                CreateSelectDropDown(types[i])

            }
        }
    }
}

function CreateSelectDropDown(type) {
    let dropdownOptions;
    let item;

    dropdownOptions = document.createElement("option");
    dropdownOptions.setAttribute("value", type);
    item = document.createTextNode(type);
    dropdownOptions.appendChild(item);
    document.getElementById("bankname").appendChild(dropdownOptions);
}

function getDatabyType(type) {
    let url1 = "https://fandoco-vault.herokuapp.com/data?type=" + type;

    //Fetch the content of the url using the XMLHttpRequest object
    let req1 = new XMLHttpRequest();
    req1.open("GET", url1);
    req1.send(null);

    //register an event handler function
    req1.onreadystatechange = function () {
        if (req1.readyState === 4 && req1.status === 200) {
            let response = req1.responseText;
            let listOfSecureDetails = JSON.parse(response);

            let list = "";
            for (let i = 0; i < listOfSecureDetails.length; i++) {
                console.log("details", listOfSecureDetails[i]);
                console.log(listOfSecureDetails.length);
                let key = listOfSecureDetails[i].key;
                let value = listOfSecureDetails[i].value;

            }
        }
    }
}

function myFunction() {
    var table = document.getElementById("dataTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}

function showDetails() {
    let e = document.getElementById("bankname");
    let value = e.options[e.selectedIndex].value;
    let selectedOption = e.options[e.selectedIndex].text;
    getDatabyType(selectedOption);

    /*switch (selectedOption) {
        case "Post Bank Prasad":
            document.getElementById("id").innerHTML = "id1";
            document.getElementById("password").innerHTML = "password1";
            break;
        case "Post Bank Chanya":
            document.getElementById("id").innerHTML = "id2";
            document.getElementById("password").innerHTML = "password2";
            break;
        case "Rakuten Bank Prasad":
            document.getElementById("id").innerHTML = "id3";
            document.getElementById("password").innerHTML = "password3";
            break;
        case "Mizuho":
            document.getElementById("id").value = "id4";
            document.getElementById("password").innerHTML = "password4";
            break;
        case "North Pacific Prasad":
            document.getElementById("id").innerHTML = "No Internet Banking";
            document.getElementById("password").innerHTML = "";
            break;
        case "North Pacific Chanya":
            document.getElementById("id").innerHTML = "No Internet Banking...";
            document.getElementById("password").innerHTML = "";
            break;
        default:
            document.getElementById("id").innerHTML = "id..";
            document.getElementById("password").innerHTML = "password..";

    }
    */
}

function clearInformation() {

    document.getElementById("bankname").selectedIndex = "0";
    document.getElementById("id").innerHTML = "";
    document.getElementById("password").innerHTML = "";
}
