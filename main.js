// // validate emails info
// const email = document.getElementById("email");

// email.addEventListener("input", function (event) {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("This is not a valid email address");
//     email.reportValidity();
//   } else {
//     email.setCustomValidity("");
//   }
// });

// variable that stores json data if avaiable or is empty
let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}

// display json data in table form
const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const acceptTerms = `<td>${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }

  var table = `<h1 class="block text-gray-700 font-bold text-3xl mb-4">
  Entries
</h1>
  <table class="w-full border-black text-sm text-center">
  <thead class="text-sm text-gray-700 uppercase">
  <tr>
  <th class="p-3">Name</th>
  <th class="p-3">Email</th>
  <th class="p-3">Password</th>
  <th class="p-3">Dob</th>
  <th class="p-3">Accepted terms?</th>
  </tr></thead> ${entries} </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

// save form data in json file in local storge on clicking submit
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  userEntries.push(userDetails);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

let form = document.getElementById("user-form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();

const calcAge = (dob) => {
  birthDate = new Date(dob);
  currentDate = new Date();

  var age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() == birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const dob = document.getElementById("dob");

dob.addEventListener("change", function (event) {
  let age = calcAge(dob.value);
  if (age < 18 || age > 55) {
    dob.setCustomValidity(
      "For registration, you must be between ages 18 and 55"
    );
    dob.reportValidity();
  } else {
    dob.setCustomValidity("");
  }
});
