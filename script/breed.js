"use strict";
const breedInputType = document.getElementById("input-type");
const breedInputBreed = document.getElementById("input-breed");
const breedSubmitBtn = document.getElementById("submit-btn");
const breedTable = document.querySelector("#tbody");
// const breedArr = getFromStorage("breedArr");
// hien thi du lieu  breed
saveToStorage("breedArr", breedArr);
renderTableData(breedArr);
breedSubmitBtn.addEventListener("click", function () {
  const breedData = {
    inputBreed: breedInputBreed.value,
    inputBreedType: breedInputType.value,
  };
  const validate = validateData(breedData);
  if (validate) {
    // add pet in array
    breedArr.push(breedData);
    // luu du lieu
    saveToStorage("breedArr", breedArr);

    renderTableData(breedArr);
    clearInputBreed();
  }
  console.log(breedArr);
});
const validateData = function (Data) {
  let isValidate = true;

  if (breedInputBreed.value.trim().length == 0) {
    alert("please enter Breed!");
    isValidate = false;
  }
  if (Data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  return isValidate;
};
const clearInputBreed = function () {
  breedInputBreed.value = "";
  breedInputType.value = "Select Type";
};
// xoa du lieu breed
function deleteBreed(breed) {
  const deleteDataBreed = confirm(" Are you sure delete this ?");
  if (deleteDataBreed) {
    // xoa du lieu
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].inputBreed) {
        // xoa khoi mang
        breedArr.splice(i, 1);
        //cap nhat local storage
        saveToStorage("breedArr", breedArr);
        renderTableData(breedArr);
        break;
      }
    }
  }
}

function renderTableData() {
  breedTable.innerHTML = "";
  breedArr.forEach(function (breedItem, i) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td scope='col'>${i + 1} </td>
                    <td scope='col'>${breedItem.inputBreed}</td>
                    <td scope='col'>${breedItem.inputBreedType}</td>
                    <td> <button class="btn btn-danger" onclick="deleteBreed('${
                      breedItem.inputBreed
                    }')">Delete</button></td>`;
    breedTable.appendChild(row);
  });
}
