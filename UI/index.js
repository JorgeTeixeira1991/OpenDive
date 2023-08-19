window.onload = function () {
  fillSectionWithContent();
};

function createCard(imageUrl, title, description, link) {
  // Create the elements
  var card = document.createElement("div");
  var img_frame = document.createElement("div");
  var image = document.createElement("img");
  var cardTitle = document.createElement("h2");
  var cardDescription = document.createElement("p");
  var seeMoreLink = document.createElement("a");

  card.classList.add("card");

  // Set the attributes and content

  img_frame.style.overflow = "hidden";
  img_frame.style.width = "200px";
  img_frame.style.height = "200px";
  img_frame.style.display = "flex";
  img_frame.style.justifyContent = "center";
  img_frame.style.alignItems = "center";
  image.src = imageUrl;
  image.style.height = "200px";
  image.style.width = "fit-content";
  cardTitle.textContent = title;
  cardDescription.textContent = description;
  seeMoreLink.textContent = "See More";
  seeMoreLink.href = link;

  // Append the elements to the card
  img_frame.appendChild(image);
  card.appendChild(img_frame);
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(seeMoreLink);

  // Append the card to the section
  var section = document.getElementById("cardSection");
  section.appendChild(card);
}

function fillSectionWithContent() {
  // Define the desired number of cards to fill the visible section
  var cardsPerSection = 7;

  for (var i = 1; i < cardsPerSection; i++) {
    // Generate the card content dynamically
    var imageUrl = `http://localhost:8080/api/image/img/${i}`;
    var title = "Dish Title ";
    var description = "This is the description of Card " + i;
    var link = `http://localhost:8080/api/image/img/${i}`;

    // Create and append the card
    createCard(imageUrl, title, description, link);
  }
}

// Load more content as you scroll down
window.addEventListener("scroll", function () {
  // Calculate the scroll position, visible height, and full height of the document
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  var windowHeight = window.innerHeight;
  var fullHeight = document.documentElement.offsetHeight;

  // Determine if the user has scrolled to the bottom of the visible section
  if (scrollPosition + windowHeight >= fullHeight) {
    // Load more content
    fillSectionWithContent();
  }
});
