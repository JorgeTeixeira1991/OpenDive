document.getElementById('uploadForm').addEventListener('submit', uploadImage);

function uploadImage(event) {

    event.preventDefault(); // To prevent the form from submitting the default way

    let fileInput = document.getElementById('fileInput');
    let descInput = document.getElementById('desc');

    console.log(fileInput.value)
    console.log(descInput.value)
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('description', descInput.value);
    
    console.log(formData)

    fetch('http://localhost:8080/api/image/upload', {
      method: 'POST',
      mode: "no-cors",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}   

function fetchImage() {
    let imageId = document.getElementById('imageId').value;

    if (imageId) {
        let imageUrl = `http://localhost:8080/api/image/${imageId}`;
        
        // Update the src attribute of the img tag
        document.getElementById('displayImage').src = imageUrl;
        document.getElementById('displayImage').style.width = '200px';
        document.getElementById('displayImage').style.margin = '10px';

    } else {
        alert('Please enter an Image ID.');
    }
}

function fetchImages() {
    fetch('http://localhost:8080/api/image')
    .then(response => response.json())
    .then(base64Images => {
        const imageContainer = document.getElementById('imageContainer');
        
        // Clear previous images
        imageContainer.innerHTML = '';

        // Append each image to the container
        base64Images.forEach(base64Image => {
            const img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + base64Image;
            img.style.width = '200px';  // Set width for better visualization, adjust as needed
            img.style.margin = '10px';  // Add some margin between images
            imageContainer.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Error fetching images:', error);
    });
}
function unloadImages() {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';  // Clear the contents of the container
}








