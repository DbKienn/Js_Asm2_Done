"use strict";
const sidebar = document.getElementById("sidebar");

// const petArr = [];
// event click nav
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// gan du lieu vi du ban dau
const data1 = {
  id: "D001",
  petName: "Tom",
  age: 2,
  type: "Dog",
  weight: 3,
  length: 30,
  color: "#000000",
  breed: "Phóc Sóc",
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  fulldate: "21/03/2023",
};
const data2 = {
  id: "D002",
  petName: "Misa",
  age: 4,
  type: "Cat",
  weight: 7,
  length: 25,
  color: "#000000",
  breed: "Tam Thể",
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  fulldate: "21/04/2023",
};
const databreed = {
  inputBreed: "Phú Quốc",
  inputBreedType: "Dog",
};
const databreed2 = {
  inputBreed: " Tam Thể",
  inputBreedType: "Cat",
};
// neu khong co du lieu nao o trong local storage thi hien thi nhung du lieu nay
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [databreed, databreed2]);
}
const breedArr = getFromStorage("breedArr");
// save data
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// luu du lieu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
