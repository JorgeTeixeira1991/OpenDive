window.onload = function() {
    fillSectionWithContent();
  };
  
  function createCard(imageUrl, title, description, link) {
    // Create the elements
    var card = document.createElement('div');
    var image = document.createElement('img');
    var cardTitle = document.createElement('h2');
    var cardDescription = document.createElement('p');
    var seeMoreLink = document.createElement('a');

    card.classList.add('card');
  
    // Set the attributes and content
    image.src = imageUrl;
    cardTitle.textContent = title;
    cardDescription.textContent = description;
    seeMoreLink.textContent = 'See More';
    seeMoreLink.href = link;
  
    // Append the elements to the card
    card.appendChild(image);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(seeMoreLink);
  
    // Append the card to the section
    var section = document.getElementById('cardSection');
    section.appendChild(card);
  }
  
  function fillSectionWithContent() {
    // Define the desired number of cards to fill the visible section
    var cardsPerSection = 6;
  
    for (var i = 0; i < cardsPerSection; i++) {
      // Generate the card content dynamically
      var imageUrl = 'https://picsum.photos/200';
      var title = 'Card Title ' + (i +1);
      var description = 'This is the description of Card ' + i;
      var link = 'https://example.com/' + i;
  
      // Create and append the card
      createCard(imageUrl, title, description, link);
    }
  }
  
  // Load more content as you scroll down
  window.addEventListener('scroll', function() {
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
  
  

  