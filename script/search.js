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
const findBtn = document.getElementById("find-btn");
let healthyCheck = true;
// ngay thang nam
let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
const fulldate = date + "/" + month + "/" + year;
// hien thi danh sach thu cung da nhap
renderTableData(petArr);
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
                `;
    tableBodyEl.appendChild(row);
  }
}
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  // tim theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) =>
      pet.petName.includes(nameInput.value)
    );
  }
  // theo theo loai
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type.includes(typeInput.value));
  }
  // tim theo giong
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) =>
      pet.breed.includes(breedInput.value)
    );
  }
  // tim theo thu cung da duoc tiem vaccin
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated == true);
  }
  // tim theo thu cung da duoc tiem dewormed
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed == true);
  }
  // tim theo thu cung da duoc tiem sterilized
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized == true);
  }
  // hien thi cac thu cung thoa man dieu kien
  renderTableData(petArrFind);
});
