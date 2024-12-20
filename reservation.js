// ლოკაციების სია და გამოატანა სელექთის დროფდაუნად, ამ ეტაპზე მხოლოდ 1 ლოკაციაა
const locations = [{ eng: "Gudauri", geo: "გუდაური" }];
let options = document.getElementById("options");
if (options) {
  locations.forEach(location => {
    const option = document.createElement("option");
    option.value = location.eng; // Use the English name as the value
    option.setAttribute("data-option-eng", location.eng);
    option.setAttribute("data-option-geo", location.geo);
    option.textContent = location.eng; // Default to English text
    options.appendChild(option);
  });
}

//ფასის განსაზღვრა არჩეული ლოაკციის მიხედვით, ამ ეტაპზე ჩათიშულია ფასის გამოატანა რადგან ერთი ლოკაციაა
// const getPrice = (myPrice) => {
//   let text = options.options[options.selectedIndex].text;
//   // let locationShow = document.getElementById('locationTag');
//   // locationShow.innerText = text + ":";
//   switch (text) {
//     case "Gudauri":
//       myPrice = 250;
//     break;
//     case "Svaneti":
//       myPrice = 350;
//     break;
//     case "Tbilisi":
//       myPrice = 150;
//     break;
//     case "Gonio":
//       myPrice = 60;
//     break;
//     case "Sighnaghi":
//       myPrice = 100;
//     break;
//     default:
//       myPrice = 0;
//     break;
//   };
//   // let priceShow = document.getElementById('priceTag');
//   // priceShow.innerText = myPrice + " GEL";
//   return myPrice;
// };

// ეს კოდი იყო ფასის დასათვლელად და გამოსატანად, ამ ეტაპზე არაა საჭირო
// const getQuantity = (myQuantity) => {
//   let personInput = document.getElementById('tentacles');
//   let personNum = personInput.value;
//   if (personNum === 0 || personNum === '') {
//     personNum = 0;
//   };
//   myQuantity = personNum;
//   let totalPrice = getPrice();
//   let total = myQuantity * totalPrice;
//   let quantityShow = document.getElementById('quantityTag');
//   quantityShow.innerText = `Quantity: x${personNum}`;
//   let bookCostShow = document.getElementById('bookCost');
//   bookCostShow.innerText = total + ' GEL';
//   return total;
// };

function onLocationChange() {
  if (!location || location === "Location:" || location === "ლოკაცია:") {
    document.getElementById("options").style.borderColor = "red";
    error = true;
  } else {
    document.getElementById("options").style.borderColor = "";
  }
  //getPrice();
  // getQuantity(); ეს კოდი იყო ფასის დასათვლელად და გამოსატანად, ამ ეტაპზე არაა საჭირო
};

// თარიღის ფლეისჰოლდერის ფორმატირება
function onFocusHandler(event) {
  const input = event.target;
  if (input.placeholder === "Date: dd/mm/yy") {
      input.placeholder = "dd/mm/yy";
  }
}

// თარიღის ფლეისჰოლდერის ფორმატირება თარიღის შეყვანის დროს
function formatDateInput(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, '');

  let formattedValue = 'dd/mm/yy';

  // თარიღის ფორმატის ჩვენება და თან შეყვანილი ინფორმაციის დამატება
  if (value.length > 0) {
      formattedValue = formattedValue.replace('dd', value.slice(0, 2));
  }
  if (value.length > 2) {
      formattedValue = formattedValue.replace('mm', value.slice(2, 4));
  }
  if (value.length > 4) {
      formattedValue = formattedValue.replace('yy', value.slice(4, 6));
  }

  input.value = formattedValue;

  // კურსორის ადგილის შესწორება
  let cursorPosition;
  if (value.length <= 2) {
      cursorPosition = value.length;
  } else if (value.length <= 4) {
      cursorPosition = value.length + 1;
  } else if (value.length <= 6) {
      cursorPosition = value.length + 2;
  } else {
      cursorPosition = formattedValue.length;
  }

  input.setSelectionRange(cursorPosition, cursorPosition);
}

// თარიღის ინფუთის ივენთები
const dateInput = document.getElementById("date");
if (dateInput) {
  dateInput.addEventListener('focus', onFocusHandler);
  dateInput.addEventListener('input', formatDateInput);
}

// ვალიდაცია რეზერვაციის ფორმის
function process(event) {
  event.preventDefault();

  document.getElementById("error-message").style.display = "none";
  
  let location = document.getElementById("options") ? document.getElementById("options").value : "";
  console.log(location)
  let name = document.getElementById("name") ? document.getElementById("name").value : "";
  let email = document.getElementById("email") ? document.getElementById("email").value : "";
  let phone = document.getElementById("phone") ? document.getElementById("phone").value : "";
  let totalPersons = document.getElementById("tentacles") ? document.getElementById("tentacles").value : "";
  let date = document.getElementById("date") ? document.getElementById("date").value : "";
  let termsChecked = document.getElementById("flexCheckDefault").checked;

  let error = false;

  let fields = [
      { value: name, id: "name" },
      { value: email, id: "email" },
      { value: phone, id: "phone" },
      { value: totalPersons, id: "tentacles" },
      { value: date, id: "date" }
  ];

  fields.forEach(field => {
    let input = document.getElementById(field.id);
      if (!field.value) {
          document.getElementById(field.id).style.borderColor = "red";
          error = true;
      } else {
        input.style.borderColor = "";
    }
  });

  if (!location || location === "Location:" || location === "ლოკაცია:") {
    document.getElementById("options").style.borderColor = "red";
    error = true;
  } else {
    document.getElementById("options").style.borderColor = "";
  }

  if (!termsChecked) {
      document.getElementById("flexCheckDefault").style.borderColor = "red";
      error = true;
  } else {
      document.getElementById("flexCheckDefault").style.borderColor = "";
  }

  let datePattern = /^\d{2}\/\d{2}\/\d{2}$/;
  if (!datePattern.test(date)) {
      document.getElementById("date").style.borderColor = "red";
      error = true;
  } else {
      document.getElementById("date").style.borderColor = "";
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
      document.getElementById("email").style.borderColor = "red"; 
      error = true;
  } else {
    document.getElementById("email").style.borderColor = "";
  }

  let phonePattern = /^[\d\s\+\(\)-]+$/;
  if (!phonePattern.test(phone)) {
      document.getElementById("phone").style.borderColor = "red"; 
      error = true;
  } else {
    document.getElementById("phone").style.borderColor = ""; 
  }

  if (error) {
      document.getElementById("error-message").style.display = "block";
  } else {
      sendFormData(name, email, phone, totalPersons, date, location);

      document.getElementById("reservationForm").reset();
      fields.forEach(field => {
          document.getElementById(field.id).style.borderColor = "";
      });
      document.getElementById("flexCheckDefault").style.borderColor = "";
      document.getElementById("error-message").style.display = "none";
  }
}

// Function to send form data to PHP using fetch
function sendFormData(name, email, phone, totalPersons, date, location) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('totalPersons', totalPersons);
  formData.append('date', date);
  formData.append('location', location); 

  fetch('send_email.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    if (result.includes("Success")) {
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
      document.getElementById('successModal').focus();
    } else {
      const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
      errorModal.show();
      document.getElementById('errorModal').focus();
    }
  })
  .catch(error => {
    alert('Error: ' + error);
  });
}

// წითელი ბორდერების მოშორება ბეჭდვის დროს
function clearError(event) {
  event.target.style.borderColor = "";
}

function clearCheckboxError(event) {
  event.target.style.borderColor = "";
}

// შეცდომის შეტყობინებების წაშლა 
const fields = ["name", "email", "phone", "tentacles", "date"];
fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener("input", clearError);
    }
});

const checkbox = document.getElementById("flexCheckDefault");
if (checkbox) {
    checkbox.addEventListener("change", clearCheckboxError);
}

// ფორმის დასაბმიტიების დროს ვალიდაციის გამოძახება
const form = document.querySelector("form");
if (form) {
    form.onsubmit = process;
}

// ბეჭდვისას აკრძალული სიმბოლოების შეზღუდვა
const tentaclesField = document.getElementById("tentacles");
if (tentaclesField) {
    tentaclesField.addEventListener("input", function(event) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

const phoneField = document.getElementById("phone");
if (phoneField) {
    phoneField.addEventListener("input", function(event) {
        this.value = this.value.replace(/[^0-9\+\(\)\-\s]/g, '');
    });
}

const nameField = document.getElementById("name");
if (nameField) {
    nameField.addEventListener("input", function(event) {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });
}