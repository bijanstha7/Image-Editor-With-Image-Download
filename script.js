let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let downloadButton = document.getElementById("download");
let aspectRatioBtns = document.querySelectorAll(".aspect-ratio-btns");
const rotateRightButton = document.getElementById("rotate-right");
const rotateLeftButton = document.getElementById("rotate-left");
const scaleXButton = document.getElementById("scale-X-button");
const scaleYButton = document.getElementById("scale-Y-button");
const previewButton = document.getElementById("preview");
const previewImage = document.getElementById("preview-image");
const options = document.querySelector(".options-btn");
let cropper = "";
let fileName = "";
let scaleXClick = false,
  scaleYClick = false;
let rotateRightValue = -45,
  rotateLeftValue = 45;

//Function on window load
window.onload = () => {
  downloadButton.classList.add("hide");
  options.classList.add("hide");
  previewButton.classList.add("hide");
};

fileInput.onchange = () => {
  //The FileReader object helps tp read contents of file stored on computer
  let reader = new FileReader();
  //readAsDataURL read the content of input file
  reader.readAsDataURL(fileInput.files[0]);
  reader.onload = () => {
    //onload is triggered after file reading operation is successfully completed
    //set src attribute of image to the result/input file
    image.setAttribute("src", reader.result);
    //set filename for setting downloaded file name later
    //initialize cropper
    if (cropper) {
      cropper.destroy();
    }
    cropper = new Cropper(image);
    options.classList.remove("hide");
    previewButton.classList.remove("hide");
  };
  fileName = fileInput.files[0].name.split(".")[0];
};

//Change Aspect Ratio
aspectRatioBtns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText == "Free") {
      cropper.setAspectRatio(NaN);
    } else {
      cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
    }
  });
});

//Function for rotate buttons
rotateRightButton.addEventListener("click", () => {
  cropper.rotate(rotateRightValue);
});

rotateLeftButton.addEventListener("click", () => {
  cropper.rotate(rotateLeftValue);
});

//Flip Vertically and flip horizontally
scaleXButton.addEventListener("click", () => {
  if (scaleXClick) {
    cropper.scaleX(1);
    scaleXClick = false;
  } else {
    cropper.scaleX(-1);
    scaleXClick = true;
  }
});

scaleYButton.addEventListener("click", () => {
  if (scaleYClick) {
    cropper.scaleY(1);
    scaleYClick = false;
  } else {
    cropper.scaleY(-1);
    scaleYClick = true;
  }
});

//Function to preview output image
previewButton.addEventListener("click", () => {
  downloadButton.classList.remove("hide");
  let imgSrc = cropper.getCroppedCanvas({}).toDataURL();
  previewImage.src = imgSrc;
});

//Function to download the edited image
downloadButton.addEventListener("click", (e) => {
  //get cropped result
  let imgSrc = cropper.getCroppedCanvas({}).toDataURL();
  //Download name
  downloadButton.download = `cropped_${fileName}.png`;
  downloadButton.setAttribute("href", imgSrc);
});
