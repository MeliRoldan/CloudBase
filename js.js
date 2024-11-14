window.addEventListener('load', () => {
  // პირველი ვიზიტია თუა არა ამის შემოწმება
  if (!localStorage.getItem('firstVisitDone')) {
    // ლოადერის გამოატანა
    const image1 = document.getElementById('image1');

    setTimeout(() => {
      image1.classList.add('reveal');
    }, 500);

    setTimeout(() => {
      if (document.readyState === 'complete') {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        localStorage.setItem('firstVisitDone', 'true');
      }
    }, 2000);
  } else {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".nav-link");
  
  const currentPath = window.location.pathname;

  // მენიუს ლინკებისთვის აქტიური სტატუსის მინიჭება
  navLinks.forEach(function(navLink) {
    if (navLink.getAttribute("href") === currentPath) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
});

// Translation functions
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function setCurLanguage(lang) {
  if (!lang) lang = getCookie('cur_lang'); 
  if (!lang || (lang !== 'eng' && lang !== 'geo')) lang = 'eng'; 
  setCookie('cur_lang', lang, 30);

  document.querySelectorAll(".translatable-text").forEach(function(value) {
      value.innerHTML = value.getAttribute(`data-tran-${lang}`);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  setCurLanguage(); 
});