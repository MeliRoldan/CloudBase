window.addEventListener('load', () => {
  // Check if this is the first visit using localStorage
  if (!localStorage.getItem('firstVisitDone')) {
    // Show the loader with animations for the first visit
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');

    image1.classList.remove('hidden'); // Show first image

    setTimeout(() => {
      image2.classList.remove('hidden'); // Show second image
      image2.style.animation = 'appearAbove 1s forwards';
    }, 1000);

    setTimeout(() => {
      image3.classList.remove('hidden'); // Show third image
      image3.style.animation = 'appearBelow 1s forwards';
    }, 2000);

    // Wait for the page to fully load and ensure the loader lasts at least 3 seconds
    setTimeout(() => {
      if (document.readyState === 'complete') {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        // Store in localStorage to prevent loader on future visits
        localStorage.setItem('firstVisitDone', 'true');
      }
    }, 3000); // Ensure the loader is visible for at least 3 seconds
  } else {
    // If it's not the first visit, just show the content immediately
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".nav-link");
  
  // Get the current page URL path
  const currentPath = window.location.pathname;

  // Iterate over each nav link to apply the active class based on the current path
  navLinks.forEach(function(navLink) {
    // Check if the nav link's href matches the current path
    if (navLink.getAttribute("href") === currentPath) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
});