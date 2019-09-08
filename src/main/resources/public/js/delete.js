function displayDelete() {

    sessionStorage.setItem("source", "delete");

    if (localStorage.getItem('token') == null) {
        document.getElementById("details").innerHTML = document.getElementById("loginform").innerHTML;

        return;
    }
    document.getElementById("details").innerHTML = document.getElementById("deleteform").innerHTML;
    document.getElementById("typesDropdownDeleteDiv").innerHTML = document.getElementById("typesDropdownCommonComponent").innerHTML;
    document.getElementById("keysDropdownDeleteDiv").innerHTML = document.getElementById("keysDropdownCommonComponent").innerHTML;
    document.getElementById("typesDropDownCommon").onchange = function () {
        getDataToDelete()
    };


    populateTypesDropdown("typesDropDownCommon");
}

function getDataToDelete() {

    let category = document.getElementById("typesDropDownCommon");
    let selectedOption = category.options[category.selectedIndex].value;

    getDatabyType(selectedOption, "update", createDropdownKeys);
}

function createDropdownKeys(dataArray) {
    document.getElementById("keysDropDownCommon").innerHTML = "";
    createSelectDropdown("---", "keysDropDownCommon");
    let dataMap = new Map();
    for (let i = 0; i < dataArray.length; i++) {

        let key = dataArray[i].key;
        let value = dataArray[i].value;
        dataMap.set(key, value);
        createSelectDropdown(key, "keysDropDownCommon");
    }

    localStorage.dataMap = JSON.stringify(Array.from(dataMap.entries()));

}

function showValue() {
    let dataMap = new Map(JSON.parse(localStorage.dataMap));
    let key = document.getElementById("keysDropDownCommon");
    let selectedKey = key.options[key.selectedIndex].value;
    let value = dataMap.get(selectedKey);
    document.getElementById("deleteVal").value = value;
    console.log(value);
}

function deleteCategory() {
    let key = document.getElementById("keysDropDownCommon");
    let selectedKey = key.options[key.selectedIndex].value;
    let category = document.getElementById("typesDropDownCommon");
    let selectedType = category.options[category.selectedIndex].value;
    console.log(selectedKey);
    console.log(selectedType);
    let url = domainName + "/types";
    let body = "{\"name\" : \"" + selectedType + "\"}";


    let postreq = new XMLHttpRequest();
    postreq.open('DELETE', url, true);
    postreq.setRequestHeader("Authorization", localStorage.getItem('token'));
    postreq.setRequestHeader('Content-type', 'application/json');
    postreq.send(body);

    postreq.onreadystatechange = function () {//Call a function when the state changes.
        if (postreq.readyState === 4 && postreq.status === 200) {
            document.getElementById("typesDropDownCommon").innerHTML = "";
            document.getElementById("keysDropDownCommon").innerHTML = "";
            document.getElementById("deleteVal").value = "";
            populateTypesDropdown("typesDropDownCommon");
        }
    };
}

function deleteKey() {
    let key = document.getElementById("keysDropDownCommon");
    let selectedKey = key.options[key.selectedIndex].value;
    let category = document.getElementById("typesDropDownCommon");
    let selectedType = category.options[category.selectedIndex].value;
    console.log(selectedKey);
    console.log(selectedType);
    let url = domainName + "/data";
    let body = "{\"type\" : \"" + selectedType + "\",\"key\" : \"" + selectedKey + "\"}";


    let postreq = new XMLHttpRequest();
    postreq.open('DELETE', url, true);
    postreq.setRequestHeader("Authorization", localStorage.getItem('token'));
    postreq.setRequestHeader('Content-type', 'application/json');
    postreq.send(body);

    postreq.onreadystatechange = function () {//Call a function when the state changes.
        if (postreq.readyState === 4 && postreq.status === 200) {
            document.getElementById("typesDropDownCommon").innerHTML = "";
            document.getElementById("keysDropDownCommon").innerHTML = "";
            document.getElementById("deleteVal").value = "";
            populateTypesDropdown("typesDropDownCommon");
        }
    };
}