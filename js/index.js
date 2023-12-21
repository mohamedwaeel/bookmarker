"use strict"

let siteName = document.querySelector("#sitename");
let siteUrl = document.querySelector("#siteurl");
let sbmtBtn = document.querySelector("#submitButton");
let siteNameValidation=document.querySelector("#sitename");
let siteUrlValidation=document.querySelector("#siteurl");
let sitesList = [];



if (localStorage.getItem("allSites")) {
    sitesList = JSON.parse(localStorage.getItem("allSites"));
    displaySites(sitesList);
}

function displaySites(list) {
    let blackBox = " ";
    for (let i = 0; i < list.length; i++) {
        blackBox += `<tr>
  <th scope="row">${i + 1}</th>
  <td class="text-capitalize">${list[i].name}</td>
  <td><button id="visitbtn" class="btn" onclick="visitSite('${list[i].url}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
  <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
  </td>
</tr>`
    }
    document.querySelector("tbody").innerHTML = blackBox;
}

function deleteSite(index) {
    sitesList.splice(index, 1);
    localStorage.setItem("allSites", JSON.stringify(sitesList));
    displaySites(sitesList);
}

function addSites() {
    if (validSiteUrl() && validSiteName()) {
        let sites = {
            name: siteName.value,
            url: siteUrl.value
        };
        sitesList.push(sites);
        localStorage.setItem("allSites", JSON.stringify(sitesList));
        clearForm();
    }

}
function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
    document.getElementById("validName").classList.add("d-none");
    document.getElementById("validUrl").classList.add("d-none");
    document.getElementById("sitename").classList.remove("is-valid");
    document.getElementById("siteurl").classList.remove("is-valid");



}
function visitSite(url) {
    window.open(url, '_blank');
}

function validSiteName() {
    let regex =/^(?!\s+$)[a-zA-Z\s]+$/;
    let isValid = regex.test(siteName.value);
    if (isValid) {
        document.getElementById("sitename").classList.add("is-valid");
        document.getElementById("sitename").classList.remove("is-invalid");
        document.getElementById("validName").classList.remove("d-none");
        document.getElementById("inValidName").classList.add("d-none");


    }
    else {
        document.getElementById("sitename").classList.remove("is-valid");
        document.getElementById("sitename").classList.add("is-invalid");
        document.getElementById("inValidName").classList.remove("d-none");
        document.getElementById("validName").classList.add("d-none");


    }
    return isValid;
}

function validSiteUrl() {
 
    let regex = /^(https:\/\/|http:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i;
    let isValid = regex.test(siteUrl.value);

    if (isValid) {
        document.getElementById("siteurl").classList.add("is-valid");
        document.getElementById("siteurl").classList.remove("is-invalid");
        document.getElementById("validUrl").classList.remove("d-none");
        document.getElementById("inValidUrl").classList.add("d-none");


    }
    else {
        document.getElementById("siteurl").classList.remove("is-valid");
        document.getElementById("siteurl").classList.add("is-invalid");
        document.getElementById("inValidUrl").classList.remove("d-none");
        document.getElementById("validUrl").classList.add("d-none");


    }
    return isValid;

}
sbmtBtn.addEventListener('click', () => {
    addSites();
    displaySites(sitesList);

})
siteNameValidation.addEventListener('input',()=>{return validSiteName()})
siteUrlValidation.addEventListener('input',()=>{return validSiteUrl()})