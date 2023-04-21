"use strict";
const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.querySelector(".btn-danger");
const bmiBtn = document.getElementById("bmi-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const formEL = document.getElementById("container-form");
let healthyCheck = true;
// ngay thang nam
let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
const fulldate = date + "/" + month + "/" + year;
// hien thi danh sach thu cung da nhap
renderTableData(petArr);
// hien thi loai giong khi nhan vao type input
typeInput.addEventListener("click", renderBreed);

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr.filter(
    (breedItem) => breedItem.inputBreedType === "Dog"
  );
  const breedCats = breedArr.filter(
    (breedItem) => breedItem.inputBreedType === "Cat"
  );
  // dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.inputBreed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.inputBreed}`;
      breedInput.appendChild(option);
    });
  }
}
// hien thi thu cung vao bang
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); // creat element tr
    row.innerHTML = `
                <th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].petName}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight}kg</td>
                <td>${petArr[i].length}cm</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color:${
                    petArr[i].color
                  }"></i>
                </td>
            
                <td><i class="bi ${
                  petArr[i].vaccinated
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].dewormed
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].sterilized
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td>${petArr[i].fulldate}</td>
                            <td>
                <button class="btn btn-warning" onclick="editPet('${
                  petArr[i].id
                }')">Edit</button>
              </td>`;
    tableBodyEl.appendChild(row);
  }
}
// validate data
const validateData = function (data) {
  // kieerm tra du lieu
  let isValidate = true;
  if (data.id.trim() == "") {
    alert("please enter ID!");
    isValidate = false;
  } else if (data.petName.trim() == "") {
    alert("please enter Name!");
    isValidate = false;
  } else if (data.age > 15 || data.age < 1) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  } else if (data.type == "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  } else if (data.weight > 15 || data.weight < 1) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  } else if (data.length > 100 || data.length < 1) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  } else if (data.breed == "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
};
// reset gia tri sau khi submit
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
// edit thu cung
const editPet = function (petID) {
  // hien thi form sau khi nhan edit
  formEL.classList.remove("hide");
  // tim den du liewu thu cung can edit
  const pet = petArr.find((petItem) => petItem.id === petID);
  // hien thi nhung thong tin cua thu cung len form nhap
  idInput.value = petID;
  nameInput.value = pet.petName;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  renderBreed();
  breedInput.value = `${pet.breed}`;
};
// Submit button
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    fulldate,
  };
  const validate = validateData(data);
  if (validate) {
    // them thi cung vao bang va local Storage
    const index = petArr.findIndex((pet) => pet.id === data.id);
    //giu ngay them thu cung nhu cu
    data.fulldate = petArr[index].fulldate;
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    // an form
    formEL.classList.add("hide");

    renderTableData(petArr);
  }
});
