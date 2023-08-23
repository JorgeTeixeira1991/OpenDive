// Constants
const BASE_URL = "http://localhost:8080/api/image";
const MAX_WIDTH = 800;

// Get saved images from local storage
const savedImages = localStorage.getItem("base64Images");
let imgs_loaded_flag = false;

// Toggle images on initial load
toggleImages(savedImages);

// Add an event listener to the upload form
document.getElementById("uploadForm").addEventListener("submit", uploadImage);

// Function to handle the image upload
function uploadImage(event) {
  event.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const descInput = document.getElementById("desc");
  const file = fileInput.files[0];

  // Resize the image before sending
  resizeImage(file, (resizedBlob) => {
    const formData = new FormData();
    formData.append("file", resizedBlob);
    formData.append("description", descInput.value);

    // Send the resized image and description to the server
    fetch(`${BASE_URL}/upload`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });
}

// Function to resize an image
function resizeImage(file, callback) {
  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const scaleFactor = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleFactor;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a blob and pass it to the callback
      canvas.toBlob((blob) => callback(blob), file.type);
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

// Function to fetch a specific image
function fetchImage() {
  const imageId = document.getElementById("imageId").value;
  const imageContainer = document.getElementById("displayImage");

  // Fetch the image from the server
  fetch(`${BASE_URL}/${imageId}`)
    .then((response) => {
      if (response.status !== 200)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then((base64Image) => {
      // Create and display the image
      const img = createImageElement(base64Image);
      imageContainer.appendChild(img);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      imageContainer.innerHTML = "";
    });
}

// Function to toggle images
function toggleImages(saved_images) {
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.innerHTML = imgs_loaded_flag ? "Unload Images" : "Load Images";

  if (saved_images) {
    populateImages(JSON.parse(saved_images));
    imgs_loaded_flag = true;
    toggleButton.innerHTML = "Unload Images";
  }

  toggleButton.addEventListener("click", function () {
    if (imgs_loaded_flag) {
      unloadImages();
      imgs_loaded_flag = false;
      this.innerText = "Load Images";
    } else {
      document.getElementById("container").style.transition.height =
        "0.5s ease;";
      fetchImages(() => {
        this.innerText = "Unload Images";
      });
      imgs_loaded_flag = true;
    }
  });
}

// Function to clear images
function unloadImages() {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  localStorage.removeItem("base64Images");
}

// Function to fetch all images
function fetchImages(callback) {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((base64Images) => {
      localStorage.setItem("base64Images", JSON.stringify(base64Images));
      populateImages2(base64Images);
      if (callback) callback();
    })
    .catch((error) => console.error("Error fetching images:", error));
}

// Function to populate the images
function populateImages(base64Images) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  let imageId = 1;

  // Create and append each image
  base64Images.forEach((base64Image) => {
    setTimeout(() => {
      const img = createImageElement(base64Image);
      const linkToImage = document.createElement("a");
      linkToImage.href = `${BASE_URL}/${imageId}/img`;
      linkToImage.appendChild(img);
      imageContainer.appendChild(linkToImage);
      imageId++;
    }, 200);
  });
}

function populateImages2(base64Images) {
  const imageContainer = document.getElementById("imageContainer");

  // Clear previous images
  imageContainer.innerHTML = "";
  let imageId = 1;

  // Append each image to the container
  base64Images.forEach((base64Image) => {
    setTimeout(() => {
      const img = createImageElement(base64Image);
      const linktoimage = document.createElement("a");
      linktoimage.href = "http://localhost:8080/api/image".concat(
        `/${imageId}/img`
      );
      imageId++;

      linktoimage.appendChild(img);
      imageContainer.appendChild(linktoimage);
      img.classList.add("fade-in");
    }, 200);
    setTimeout(() => {});
  });
}

// Function to create an image element
function createImageElement(base64Image) {
  const img = new Image();
  img.src = "data:image/jpeg;base64," + base64Image;
  img.style.width = "200px";
  img.style.margin = "10px";
  return img;
}
