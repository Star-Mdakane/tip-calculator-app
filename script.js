const form = document.querySelector("#form");

// Inputs
const tipOption = document.querySelectorAll("input[name='tip']");
const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const customInput = document.querySelector("#custom");

// Outputs
const tipAmount = document.querySelector("#tip-amount");
const total = document.querySelector("#total-amount");
const reset = document.querySelector("#reset");

// functions
const calculateTip = (bill, tip, people) => {
    let totBill = (bill * (tip / 100)) / people;
    return totBill
    // showbill
}

const calculateTotal = (bill, tip, people) => {
    let totAmount = (bill / people) + (bill * (tip / 100)) / people;
    return totAmount
}

const rendorError = (input) => {
    // input.parentElement.style.borderColor = 'rgb(225, 112, 82)';
    input.parentElement.classList.add('err');
}

const clearError = (input) => {
    // input.parentElement.style.borderColor = 'rgb(243, 249, 250)'
    input.parentElement.classList.remove('err');
}

const validateField = (input) => {
    // const errEl = input.closest(".form-group").querySelector('#error');

    if (!input.validity.valid) {
        rendorError(input);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

const calcOutputs = () => {

    // the inputs
    const billInput = document.querySelector("#bill");
    const peopleInput = document.querySelector("#people");
    const customInput = document.querySelector("#custom");


    // the outputs
    const tipAmount = document.querySelector("#tip-amount");
    const total = document.querySelector("#total-amount");

    let totBill;
    let totAmount;

    // grabbing the values of the inpputs
    const billVal = Number(billInput.value);
    const tipOption = document.querySelectorAll("input[name='tip']");
    const radio = document.querySelectorAll("input[name='radio]");


    let tipVal = 1;
    tipOption.forEach((val) => {
        if (val.checked) {
            tipVal = val.value
        } else {
            if (!tipVal && val.classList.contains('custom')) {
                tipVal = val.value;
            }
        }
    })
    const peopleVal = Number(peopleInput.value);

    customInput.addEventListener('focus', () => {
        document.querySelectorAll('input[type="radio"]').forEach(check => check.checked = false);
    })

    radio.forEach(r => {
        r.addEventListener('change', () => {
            if (r.checked) {
                document.querySelector("#custom").placeholder = 'Custom';
            }
        })
    })

    totBill = calculateTip(billVal, tipVal, peopleVal);
    totAmount = calculateTotal(billVal, tipVal, peopleVal);

    console.log(calculateTip(billVal, tipVal, peopleVal));
    console.log(calculateTotal(billVal, tipVal, peopleVal))

    tipAmount.textContent = isNaN(totBill) ? '$0.00' : `$${totBill.toFixed(2)}`
    total.textContent = isNaN(totAmount) ? '$0.00' : `$${totAmount.toFixed(2)}`

}

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
    input.addEventListener("blur", calcOutputs);
})

// events

peopleInput.addEventListener('blur', () => {
    const error = document.querySelector("#error");
    console.log(peopleInput.value)
    if (Number(peopleInput.value) === 0) {
        error.textContent = "Can't be zero";
        reset.disabled = true;
    } else {
        error.textContent = " ";
        reset.disabled = false;

    }

})


form.addEventListener("submit", (e) => {
    let isValid = true;

    const reset = document.querySelector("#reset");

    const inputs = form.querySelectorAll('input[type=text]');
    console.log(inputs)
    inputs.forEach((input) => {
        if (!validateField(input)) {
            rendorError(input);
            isValid = false;
        }
        clearError(input)
    })

    if (isValid) {
        reset.disabled = false;
    } else {
        form.querySelector(':invalid').focus();
    }
})


