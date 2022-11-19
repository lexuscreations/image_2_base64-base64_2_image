function setElImage2Base64(file, el) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => (el.value = reader.result);
}

const dataToBlob = async (imageData) => await (await fetch(imageData)).blob();

window.addEventListener("load", () => {
  const selectImageBtn = document.querySelector("#selectImageBtn");
  const downloadBtn = document.querySelector("#downloadBtn");
  const imgEl = document.querySelector(".preview > img");
  const pElPlaceholder = document.querySelector(".preview > p");
  const fileUploadInpEl = document.querySelector("#file-upload");
  const base64TextArea = document.querySelector("#base64TextArea");

  imgEl.addEventListener("error", function (event) {
    downloadBtn.setAttribute("class", "disabled");
  });

  fileUploadInpEl.addEventListener("change", function (event) {
    pElPlaceholder.style.display = "none";
    selectImageBtn.textContent = "Re-Select Image";
    imgEl.src = URL.createObjectURL(event.target.files[0]);
    imgEl.style.display = "block";
    setElImage2Base64(event.target.files[0], base64TextArea);
  });

  base64TextArea.addEventListener("input", async function (event) {
    try {
      if (!event.target.value) {
        imgEl.src = "";
        imgEl.style.display = "none";
        pElPlaceholder.style.display = "block";
        selectImageBtn.textContent = "Select Image";
        downloadBtn.setAttribute("class", "disabled");
        return false;
      }
      const blob = await dataToBlob(event.target.value);
      const blobUrl = URL.createObjectURL(blob);
      pElPlaceholder.style.display = "none";
      imgEl.src = blobUrl;
      imgEl.style.display = "block";
      downloadBtn.setAttribute("href", blobUrl);
      downloadBtn.setAttribute("class", "active");
      downloadBtn.setAttribute(
        "download",
        `image.${event.target.value.split(";")[0].split("/")[1]}`
      );
    } catch (error) {
      downloadBtn.setAttribute("class", "disabled");
    }
  });
});
