  // this is the skeleton for the fetch function
  // fetch all the names of breeds so that breedNames is not an empty array
  // you may have to use Object.keys() method...
  // each breed should then be the title of the card and the alt of the image (which will come in the following task)
  // the code for the card has already been written for you
  function getDogs() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        const breedNames = Object.keys(data.message);
        const imagePromises = breedNames.map(breed => {
          return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(({ message: img }) => ({ breed, img }));
        });
  
        Promise.all(imagePromises).then(images => {
          const container = document.querySelector('.container-grid');
          container.innerHTML = images.map(({ breed, img }) => `
            <div class="card-body">
              <img class="card-img-top" src="${img}" alt="${breed}" style="object-fit: cover; object-position: center;" height="300px" />
              <h5 class="card-title">${breed}</h5>
            </div>
          `).join('');
        });
      })
      .catch(error => console.error(error));
  }
  
  getDogs();
  