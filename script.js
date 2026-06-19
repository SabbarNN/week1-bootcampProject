// 1. Grab the elements we need from the page
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
console.log(tipButtons.length);
const tipAmountEl = document.getElementById('tip-amount');
const totalEl = document.getElementById('total-amount');
const perPersonEl = document.getElementById('per-person');

//2. Keep track of the currently selected tip percentage
let selectedTip = 0;

//3. The function that does the math and updates the screen
function calculate() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;

    const tipAmount = bill * (selectedTip / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;

    tipAmountEl.textContent = '$' + tipAmount.toFixed(2);
    totalEl.textContent = '$' + total.toFixed(2);
    perPersonEl.textContent = '$' + perPerson.toFixed(2);


}
//4. When a tip button is clicked: mark it active, store its value, recalculate
tipButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        //Remove 'active' from all buttons
        tipButtons.forEach(b => b.classList.remove('active'));
        //Add 'active' to the one that was clicked
        button.classList.add('active');
        //Read the tip value from the data-tip attribute
        selectedTip = parseFloat(button.dataset.tip);
        calculate();
    });
});

//5. When the bill or people count changes, recalculate
billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

//6. Run once on load so the screen starts correct
calculate();