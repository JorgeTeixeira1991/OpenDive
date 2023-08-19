document.getElementById("uploadForm").addEventListener("submit", uploadImage);
document.addEventListener("DOMContentLoaded", (event) => {
  const savedImages = localStorage.getItem("base64Images");
  if (savedImages) {
    populateImages(JSON.parse(savedImages)); // Load from Local Storage
  }
});

function uploadImage(event) {
  event.preventDefault();

  let fileInput = document.getElementById("fileInput");
  let descInput = document.getElementById("desc");

  const file = fileInput.files[0];

  // Resize the image first
  resizeImage(file, function (resizedBlob) {
    const formData = new FormData();
    formData.append("file", resizedBlob); // Use the resized image blob
    formData.append("description", descInput.value);

    fetch("http://localhost:8080/api/image/upload", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

function resizeImage(file, callback) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 800;
      const scaleFactor = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(function (blob) {
        callback(blob);
      }, file.type);
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

/*function fetchImage() {


    let imageId = document.getElementById('imageId').value;


    if (imageId) {

        let imageUrl = `http://localhost:8080/api/image/${imageId}`;

        
        // Update the src attribute of the img tag
        document.getElementById('displayImage').src = imageUrl;
        document.getElementById('displayImage').style.width = '200px';
        document.getElementById('displayImage').style.height = 'fit-content';
        document.getElementById('displayImage').style.margin = '10px';
        document.getElementById('displayImage').style.display = '';
        

    } else {
        document.getElementById('displayImage').style.display = 'none';
    }
}*/

/*function fetchImages() {
  const url = "http://localhost:8080/api/image";

  fetch(url)
    .then((response) => response.json())
    .then((base64Images) => {
      const imageContainer = document.getElementById("imageContainer");

      // Clear previous images
      imageContainer.innerHTML = "";
      let imageId = 1;

      // Append each image to the container
      base64Images.forEach((base64Image) => {
        let img = new Image(); // Create a new image element
        img.src = "data:image/jpeg;base64," + base64Image;
        img.style.width = "200px"; // Set width for better visualization, adjust as needed
        img.style.margin = "10px"; // Add some margin between images

        const linktoimage = document.createElement("a");
        linktoimage.href = url.concat(`/img/${imageId}`);
        console.log(imageId);
        imageId = imageId + 1;

        linktoimage.appendChild(img); // Append the image to the anchor element
        imageContainer.appendChild(linktoimage); // Append the anchor element (which now contains the image) to the container
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}*/

function fetchImages() {
  const url = "http://localhost:8080/api/image";

  fetch(url)
    .then((response) => response.json())
    .then((base64Images) => {
      localStorage.setItem("base64Images", JSON.stringify(base64Images)); // Save to Local Storage
      populateImages(base64Images);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

function populateImages(base64Images) {
  const imageContainer = document.getElementById("imageContainer");

  // Clear previous images
  imageContainer.innerHTML = "";
  let imageId = 1;

  // Append each image to the container
  base64Images.forEach((base64Image) => {
    let img = new Image();
    img.src = "data:image/jpeg;base64," + base64Image;
    img.style.width = "200px";
    img.style.margin = "10px";

    const linktoimage = document.createElement("a");
    linktoimage.href = "http://localhost:8080/api/image".concat(
      `/img/${imageId}`
    );
    console.log(imageId);
    imageId = imageId + 1;

    linktoimage.appendChild(img);
    imageContainer.appendChild(linktoimage);
  });
}

function fetchImage() {
  const imageId = document.getElementById("imageId").value;
  const imageContainer = document.getElementById("displayImage");

  fetch(`http://localhost:8080/api/image/${imageId}`)
    .then((response) => {
      // Check if the status is 200
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(` Success! Status: ${response.status}`);
      return response.json();
    })
    .then((base64Image) => {
      imageContainer.innerHTML = "";
      const img = document.createElement("img");
      img.src = "data:image/jpeg;base64," + base64Image;
      img.style.width = "200px"; // Set width for better visualization, adjust as needed
      img.style.margin = "10px"; // Add some margin between images
      imageContainer.appendChild(img);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      imageContainer.innerHTML = "";
    });
}

function unloadImages() {
  let imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = ""; // Clear the contents of the container
  localStorage.removeItem("base64Images");
}
