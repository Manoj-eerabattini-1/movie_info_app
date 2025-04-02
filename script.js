// Your OMDb API key
const apiKey = '72bf011'; // Replace with your actual OMDb API key

// Attach click event listener to the search button
document.getElementById('searchButton').addEventListener('click', function () {
  const mediaTitle = document.getElementById('searchBar').value;

  if (mediaTitle) {
    fetchMediaData(mediaTitle);
  } else {
    alert('Please enter a title to search.');
  }
});

// Add a listener for the "Enter" key press in the search bar
document.getElementById('searchBar').addEventListener('keydown', function (event) {
  // Check if the pressed key is "Enter" (key code 13)
  if (event.key === 'Enter') {
    const mediaTitle = document.getElementById('searchBar').value;

    if (mediaTitle) {
      fetchMediaData(mediaTitle);
    } else {
      alert('Please enter a title to search.');
    }
  }
});

// Function to fetch media data from OMDb API
function fetchMediaData(title) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        displayMediaData(data);
      } else {
        alert('No results found. Please try again with a different title.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    });
}

// Function to display fetched media data
function displayMediaData(data) {
    // Display media title
    document.getElementById('mediaTitle').innerText = data.Title || 'No title available';
  
    // Display media plot (summary)
    document.getElementById('mediaPlot').innerText = data.Plot || 'No plot available';
  
    // Display genre (if available)
    document.getElementById('mediaGenre').innerText = 'Genre: ' + (data.Genre || 'N/A');
  
    // Display year of release (if available)
    document.getElementById('mediaYear').innerText = 'Year: ' + (data.Year || 'N/A');
  
    // Display IMDB and Rotten Tomatoes ratings
    let imdbRating = data.imdbRating ? `IMDb: ${data.imdbRating}/10` : 'IMDb: N/A';
    let rtRating = 'Rotten Tomatoes: ' + (data.Ratings && data.Ratings.find(r => r.Source === "Rotten Tomatoes") ? data.Ratings.find(r => r.Source === "Rotten Tomatoes").Value : 'N/A');
    document.getElementById('mediaRating').innerText = `${imdbRating} | ${rtRating}`;
  
    // Display cast (if available)
    document.getElementById('mediaCast').innerText = 'Cast: ' + (data.Actors || 'No cast available');
  
    // Display director (if available)
    document.getElementById('mediaDirector').innerText = 'Director: ' + (data.Director || 'No director available');
  
    // Display awards (if available)
    document.getElementById('mediaAwards').innerText = 'Awards: ' + (data.Awards || 'N/A');
  
    // Display box office (if available)
    document.getElementById('mediaBoxOffice').innerText = 'Box Office: ' + (data.BoxOffice || 'N/A');
  
    // Display runtime (if available)
    document.getElementById('mediaRuntime').innerText = 'Runtime: ' + (data.Runtime || 'N/A');
  
    // Display language (if available)
    document.getElementById('mediaLanguage').innerText = 'Language: ' + (data.Language || 'N/A');
  
    // Display country (if available)
    document.getElementById('mediaCountry').innerText = 'Country: ' + (data.Country || 'N/A');
  
    // Display production (if available)
    document.getElementById('mediaProduction').innerText = 'Production: ' + (data.Production || 'N/A');
  
    // Display website (if available and valid)
    if (data.Website && data.Website !== 'N/A') {
      document.getElementById('mediaWebsite').innerText = 'Official Website';
      document.getElementById('mediaWebsite').setAttribute('href', data.Website);
      document.getElementById('mediaWebsite').setAttribute('target', '_blank');
    } else {
      document.getElementById('mediaWebsite').innerText = '';
    }
  
    // Display poster image (if available)
    const poster = data.Poster !== 'N/A' ? data.Poster : '';
    const imagePlaceholder = document.getElementById('imagePlaceholder');
  
    // Clear any content in the placeholder before search
    imagePlaceholder.innerHTML = '';
  
    if (poster) {
      // If poster exists, show the image
      const img = document.createElement('img');
      img.src = poster;
      img.alt = data.Title + ' Poster';
      img.classList.add('rounded-lg', 'w-full', 'md:w-48', 'md:h-72', 'object-cover');
      imagePlaceholder.appendChild(img);  // Add the image to the placeholder
    } else {
      // If no poster, show the "No Image Available" text
      imagePlaceholder.innerHTML = 'No Image Available';
      imagePlaceholder.classList.add('bg-gray-600', 'text-white', 'font-bold', 'text-lg', 'flex', 'items-center', 'justify-center');
    }
  }
  
  
