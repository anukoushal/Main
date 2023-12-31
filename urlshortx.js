      
   // Function to shorten a URL
async function shortenURL(url) {
  const apiEndpoint = "https://urlshortx.com/api?api=4b17f6a264b2bbe471bf6b71ae3cd28dfc36ae90&url="; // Replace YOUR_API_KEY with your actual API key

  try {
    const response = await fetch(apiEndpoint + encodeURIComponent(url));
    const data = await response.json();

    if (data.shortenedUrl) {
      return data.shortenedUrl;
    }
  } catch (error) {
    console.error("Error fetching short link:", error);
  }

  return url; // Return the original URL if shortening fails
}


// Function to replace old links with new links, preserve query parameters, and then shorten the resulting link
async function replaceAndShortenLinks() {
  const oldLink = "https://xyz1234xd.blogspot.com/p/player.html";
  const newLink = "https://devanshop12.github.io/lak/player.html";

  // Select all elements with an onclick attribute
  const elements = document.querySelectorAll('[onclick]');

  // Loop through the selected elements
  for (const element of elements) {
    const onclickAttribute = element.getAttribute('onclick');

    // Check if the onclick attribute contains the oldLink
    if (onclickAttribute.includes(oldLink)) {
      // Extract the query parameters from the old link
      const queryParameters = onclickAttribute.split(oldLink)[1];

      // Build the new URL with the query parameters
      const newURL = newLink + queryParameters;

      // Shorten the new URL
      const shortNewLink = await shortenURL(newURL);

      // Replace the entire onclick attribute value with the shortened URL
      element.setAttribute('onclick', `window.location.href='${shortNewLink}'`);
    }
  }
}

// Call the replaceAndShortenLinks function to replace and shorten the links in the onclick attributes
replaceAndShortenLinks();
