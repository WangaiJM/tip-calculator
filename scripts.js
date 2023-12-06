const billField = document.querySelector("#bill-amount");
const btntip5 = document.querySelector("#btn-5");
const btntip10 = document.querySelector("#btn-10");
const btntip15 = document.querySelector("#btn-15");
const btntip25 = document.querySelector("#btn-25");
const btntip50 = document.querySelector("#btn-50");
const tipCustomField = document.querySelector("#btn-custom");
const numPeopleField = document.querySelector("#number-of-people");
const tipSingleField = document.querySelector("#tip-single");
const tipAllField = document.querySelector("#tip-all");
const btnReset = document.querySelector("#btn-reset");
const billError = document.querySelector("#bill-error");
const peopleError = document.querySelector("#people-error");
const tipButtons = document.querySelectorAll(".btn-primary");

let bill, people, tip, total, tipAmount, tipTotal;

//   error handling

const validateBill = () => {
  bill = parseFloat(billField.value).toFixed(2);

  if (isNaN(bill)) {
    billError.textContent = "Must be a number";
    billError.style.display = "block";
  } else if (bill <= 0) {
    billError.textContent = "Must be greater than zero";
    billError.style.display = "block";
  } else {
    billError.style.display = "none";
  }
};

const validatePeople = () => {
  people = parseFloat(numPeopleField.value).toFixed(2);

  if (isNaN(bill)) {
    peopleError.textContent = "Must be a number";
    peopleError.style.display = "block";
  } else if (bill <= 0) {
    peopleError.textContent = "Must be greater than zero";
    peopleError.style.display = "block";
  } else {
    peopleError.style.display = "none";
  }
};
// remove active
const removeActive = () => {
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });
};
// Assign Tip

tip = 0;
btntip5.addEventListener("click", () => {
  tip = btntip5.value;
  removeActive();
  btntip5.classList.add("active");
});
btntip10.addEventListener("click", () => {
  tip = btntip10.value;
  removeActive();
  btntip10.classList.add("active");
});
btntip15.addEventListener("click", () => {
  tip = btntip15.value;
  removeActive();
  btntip15.classList.add("active");
});
btntip25.addEventListener("click", () => {
  tip = btntip25.value;
  removeActive();
  btntip25.classList.add("active");
});
btntip50.addEventListener("click", () => {
  tip = btntip50.value;
  removeActive();
  btntip50.classList.add("active");
});
tipCustomField.addEventListener("change", () => {
  tip = parseFloat(tipCustomField.value / 100).toFixed(2);
});

// Calculate tip
const calcTip = () => {
  tipAmount = parseFloat(((bill / people) * tip).toFixed(2));
  tipSingleField.textContent = tipAmount;
};

// calculate total
const calcTotal = () => {
  tipTotal = (bill / people + tipAmount).toFixed(2);
  tipAllField.textContent = tipTotal;
};

const displayTip = () => {
  validateBill();
  validatePeople();
  calcTip();
  calcTotal();
};

numPeopleField.addEventListener("change", () => {
  displayTip();
});

btnReset.addEventListener("click", () => {
  tip = 0;
  billField.textContent = "";
  removeActive();
  numPeopleField.textContent = "";
  displayTip();
});
