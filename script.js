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
let healthyCheck = true;
// ngay thang nam
let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
const fulldate = date + "/" + month + "/" + year;
// hien thi danh sach thu cung da nhap
renderTableData(petArr);
renderBreed();
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
// Submit button
submitBtn.addEventListener("click", function () {
  // input data
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
    petArr.push(data);
    saveToStorage("petArr", petArr);
    clearInput();
    renderTableData(petArr);
  }
});
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
                <button class="btn btn-danger" onclick="deletePet('${
                  petArr[i].id
                }')">Delete</button>
              </td>`;
    tableBodyEl.appendChild(row);
  }
}
// validate data
const validateData = function (data) {
  // check ID
  let isValidate = true;
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
  }
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
const deletePet = function (petID) {
  const deleted = confirm("Are you sure ?");
  if (deleted) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        // cap nhat du lieu local storage
        saveToStorage("petArr", petArr);
        // hien thi pet
        renderTableData(petArr);
        break;
      }
    }
  }
};
// heathy btn
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});
