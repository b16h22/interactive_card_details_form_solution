const cardNumber = document.getElementById("card-number");
const cardName = document.getElementById("card-name");
const cardValidity = document.getElementById("card-validity");
const cardCvc = document.getElementById("card-cvc");

const inputCardNumber = document.getElementById("input-card-number");
const inputCardName = document.getElementById("input-card-name");
const inputValidityMonth = document.getElementById("input-validity-month");
const inputValidityYear = document.getElementById("input-validity-year");
const inputCvc = document.getElementById("input-cvc");

const errorMessageName = document.getElementById("error-msg-name");
const errorMessageNumber = document.getElementById("error-msg-number");
const errorMessageValidity = document.getElementById("error-msg-validity");
const errorMessageCvc = document.getElementById("error-msg-cvc");

errorMessageName.style.display = "none";
errorMessageNumber.style.display = "none";
errorMessageValidity.style.display = "none";
errorMessageCvc.style.display = "none";

const formLayout = document.querySelector("#card-form");
const thankYouLayout = document.querySelector(".thank-you-layout");
thankYouLayout.style.display = "none";

inputCardNumber.addEventListener('input', function (event) {
  if(event.inputType == "deleteContentBackward") {
    if(this.value.length == 5 || this.value.length == 10 || this.value.length == 15) {
      this.value = this.value;
    }
  } else {
    if(this.value.length < 19) {
      this.value = this.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    }
  }
});

inputCardNumber.onkeyup = function() {}
inputValidityMonth.oninput= function() {this.value = this.value.slice(0, this.maxLength)};
inputValidityYear.oninput= function() {this.value = this.value.slice(0, this.maxLength)};
inputCvc.oninput= function() {this.value = this.value.slice(0, this.maxLength)};

const confirmButton = document.getElementById("confirm-button");
const continueButton = document.getElementById("continue-button");
continueButton.style.display = "none";

confirmButton.onclick = updateCardDetails;

function updateCardDetails() {
  let numberInputValue = inputCardNumber.value;
  let nameInputValue = inputCardName.value;
  let monthInputValue = "00";
  let yearInputValue = "00";
  let cvcInputValue = inputCvc.value;

  //let numberSectOne = numberInputValue.substr(0,4);
  //let numbersSectTwo = numberInputValue.substr(4,4);
  //let numbersSectThree = numberInputValue.substr(8,4);
  //let numbersSectFour = numberInputValue.substr(4,4);

  let cardNameValid = false;
  let cardNumberValid = false;
  let monthValid = false;
  let yearValid = false;
  let cvcValid = false;

  function checkCardName() {
    if(inputCardName.validity.valueMissing) {
      inputCardName.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      cardNameValid = false;
      errorMessageName.style.display = "block";
      errorMessageName.innerHTML = "Can't be blank";
    } else {
      inputCardName.style.setProperty("--input-border-color", "hsl(270, 3%, 87%)");
      cardNameValid = true;
      cardName.innerHTML = nameInputValue;
      errorMessageName.style.display = "none";
      errorMessageName.innerHTML = "";
    }
  }

  function checkCardNumberInput() {
    if(inputCardNumber.validity.valueMissing) {
      inputCardNumber.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      cardNumberValid = false;
      errorMessageNumber.style.display = "block";
      errorMessageNumber.innerHTML = "Can't be blank";
    } else if(inputCardNumber.value.replace(/\s/g, "").match(/[^0-9]/g)) {
      inputCardNumber.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      cardNumberValid = false;
      errorMessageNumber.style.display = "block";
      errorMessageNumber.innerHTML = "Wrong format, number only";
    } else {
      inputCardNumber.style.setProperty("--input-border-color", "hsl(270, 3%, 87%)");
      cardNumberValid = true;
      cardNumber.innerHTML =  numberInputValue;
      errorMessageNumber.style.display = "none";
      errorMessageNumber.innerHTML = "";
    }
  }

  function checkCardValidityInput() {
    if(inputValidityMonth.validity.valueMissing) {
      inputValidityMonth.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      monthValid = false;
      errorMessageValidity.style.display = "block";
      errorMessageValidity.innerHTML = "Can't be blank";
    } else if(inputValidityMonth.value > 12) {
      inputValidityMonth.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      monthValid = false;
      errorMessageValidity.style.display = "block";
      errorMessageValidity.innerHTML = "Invalid month";
    } else {
      inputValidityMonth.style.setProperty("--input-border-color", "hsl(270, 3%, 87%)"); 
      monthValid = true;
      monthInputValue = inputValidityMonth.value;
    }

    if(inputValidityYear.validity.valueMissing) {
      inputValidityYear.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      yearValid = false;
      errorMessageValidity.style.display = "block";
      errorMessageValidity.innerHTML = "Can't be blank";
    } else if(inputValidityYear.validity.typeMismatch) {
      inputValidityYear.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      yearValid = false;
      errorMessageValidity.style.display = "block";
      errorMessageValidity.innerHTML = "Wrong format";
    } else {
      inputValidityYear.style.setProperty("--input-border-color", "hsl(270, 3%, 87%)");
      yearValid = true;
      yearInputValue = inputValidityYear.value;
    }

    if(monthInputValue < 10) {
      cardValidity.innerHTML = "0" + monthInputValue + "/" + yearInputValue;
    } else {
      cardValidity.innerHTML = monthInputValue + "/" + yearInputValue;
    }

    if(monthValid === true && yearValid === true) {
      errorMessageValidity.style.display = "none";
      errorMessageValidity.innerHTML = "";
    }
  }

  function checkCardCvcInput() {
    if(inputCvc.validity.valueMissing) {
      inputCvc.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      cvcValid = false;
      errorMessageCvc.style.display = "block";
      errorMessageCvc.innerHTML = "Can't be blank";
    } else if(inputCvc.validity.typeMismatch) {
      inputCvc.style.setProperty("--input-border-color", "hsl(0, 100%, 66%)");
      cvcValid = false;
      errorMessageCvc.style.display = "block";
      errorMessageCvc.innerHTML = "Wrong format";
    } else {
      inputCvc.style.setProperty("--input-border-color", "hsl(270, 3%, 87%)");
      cvcValid = true;
      cardCvc.innerHTML = cvcInputValue;
      errorMessageCvc.style.display = "none";
      errorMessageCvc.innerHTML = "";
    }
  }

  function showThankYouLayout() {
    if(cardNameValid === true && cardNumberValid === true && monthValid === true && yearValid === true && cvcValid === true) {
      formLayout.style.display = "none";
      thankYouLayout.style.display = "block";
      confirmButton.style.display = "none";
      continueButton.style.display = "block";
    }
    console.log("done");
  }

  checkCardName();
  checkCardNumberInput();
  checkCardValidityInput();
  checkCardCvcInput();
  showThankYouLayout();
}
