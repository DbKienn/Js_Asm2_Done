"use strict";
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");
// const [file] = document.querySelector("input[type = file]").files;

// bat su kien click vao button export
exportBtn.addEventListener("click", function () {
  const isExport = confirm(" Are you sure Export the file ?");
  if (isExport) {
    exportDataToFile();
  }
});
function exportDataToFile() {
  // tao du lieu de luu xuong file
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  // luu file
  saveAs(blob, "petArr.json");
}
// bat su kien click vao nut import
importBtn.addEventListener("click", function () {
  if (!fileInput.value) {
    alert("Please select the file you want to upload !!!");
  } else {
    const file = fileInput.files[0];
    const reader = new FileReader();
    // load du lieu tu file
    reader.addEventListener(
      "load",
      function () {
        // luu du lieu xuong local Storage
        saveToStorage("petArr", JSON.parse(reader.result));
        // thong bao import thanh cong
        alert(" Import Completed !!!");
      },
      false
    );
    // doc file
    if (file) {
      reader.readAsText(file);
    }
    //reset file input
    fileInput.value = "";
  }
});
