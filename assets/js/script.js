const billInputEl = document.querySelector("#bill");
const tipBtnsEl = document.querySelectorAll(".btn");
const customInputEl = document.querySelector("#custom");
const peopleInputEl = document.querySelector("#people");

const tipAmountEl = document.querySelector("#tip-amount");
const totalAmountEl = document.querySelector("#total-amount");

const billErrorEl = document.querySelector("#bill-error");
const customErrorEl = document.querySelector("#custom-error");
const peopleErrorEl = document.querySelector("#people-error");

const resetBtn = document.querySelector("#reset");

const initialState = {
  bill: 0,
  tip: 0,
  people: 0,
};

let state = { ...initialState };

// handleInput
const handleInputBlur = (el, elError, key) => {
  el.addEventListener("input", (e) => {
    const result = isInputValid(e.target.value);

    if (!result.valid) {
      elError.innerHTML = `${result.error}`;
      elError.classList.add("error");
      return;
    }

    elError.classList.remove("error");
    state[key] = result.value;

    calcTip(state);
  });
};

handleInputBlur(billInputEl, billErrorEl, "bill");
handleInputBlur(peopleInputEl, peopleErrorEl, "people");
handleInputBlur(customInputEl, customErrorEl, "tip");

// billInputEl.addEventListener("blur", (e) => {
//   const billInput = isInputValid(e.target.value);
//   if (!billInput.valid) return error;
//   return billInput;
// });

// peopleInputEl.addEventListener("blur", (e) => {
//   const peopleInput = isInputValid(e.target.value);
//   if (!peopleInput.valid) return error;
//   return peopleInput;
// });

// customInputEl.addEventListener("blur", (e) => {
//   const customInput = isInputValid(e.target.value);
//   if (!customInput.valid) return error;
//   return customInput;
// });

tipBtnsEl.forEach((tipBtn) => {
  tipBtn.addEventListener("click", (e) => {
    const result = isInputValid(e.target.dataset.tip);
    if (!result.valid) return;

    state.tip = result.value;

    calcTip(state);
  });
});

// validateInput
const isInputValid = (input) => {
  const trimmed = input.trim();
  if (trimmed === "") return { valid: false, error: "Input cannot be empty" };

  const value = Number(trimmed);
  if (Number.isNaN(value))
    return { valid: false, error: "Input must be a number" };

  if (value <= 0)
    return { valid: false, error: "Input must be greater than 0" };
  return { valid: true, value };
};

// Display

const displayTip = (total) => {
  tipAmountEl.innerHTML = total;
};
const displayTotal = (total) => {
  totalAmountEl.innerHTML = total;
};

// Calculate
const calcTip = (state) => {
  const bill = state.bill;
  const tip = state.tip;
  const people = state.people;

  const totalTip = bill * (tip / 100);
  const totalAmount = bill + totalTip;

  if (people <= 0) return 1;

  const tipPerPerson = totalTip / people;
  const totalAmountPerPerson = totalAmount / people;

  displayTip(tipPerPerson.toFixed(2));
  displayTotal(totalAmountPerPerson.toFixed(2));
};
// reset
resetBtn.addEventListener("click", () => {
  state = { ...initialState };
  billInputEl.value = "";
  peopleInputEl.value = "";
  calcTip(state);
});

calcTip(state);
