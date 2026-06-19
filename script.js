// 1. Grab the elements we need from the page
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');

const tipPercentInput = document.getElementById('custom-tip');
const savedTip = localStorage.getItem('lastTip');

const tipButtons = document.querySelectorAll('.tip-btn');
const tipAmountEl = document.getElementById('tip-amount');
const totalEl = document.getElementById('total-amount');
const perPersonEl = document.getElementById('per-person');
const extraTipEl = document.getElementById('extra-tip');
const errorMessageEl = document.getElementById('error-message');
//2. Keep track of the currently selected tip percentage
let selectedTip = 0;
if(savedTip != null) {
    selectedTip = parseFloat(savedTip);
     tipButtons.forEach(function (button) {
        if (parseFloat(button.dataset.tip) === selectedTip) {
            button.classList.add('active');
        }
    });
}


//3. The function that does the math and updates the screen
function calculate() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;

    const tipAmount = bill * (selectedTip / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    const perPersonRounded = Math.round(total / people);
    const extraTip = (perPersonRounded * people) - total;
    if(billInput.value < 0 || people <= 0) {
        errorMessageEl.textContent = 'Please enter a bill amount and number of people.';
    }
    else {
        errorMessageEl.textContent = '';
    }
    
    tipAmountEl.textContent = '$' + tipAmount.toFixed(2);
    totalEl.textContent = '$' + total.toFixed(2);
    perPersonEl.textContent = '$' + perPersonRounded.toFixed(2);
    extraTipEl.textContent = '$' + extraTip.toFixed(2);

}

tipPercentInput.addEventListener('input', function() {
    tipButtons.forEach(b => b.classList.remove('active'));
    selectedTip = parseFloat(tipPercentInput.value) || 0;
    localStorage.setItem('lastTip', selectedTip);
    calculate();
});

//4. When a tip button is clicked: mark it active, store its value, recalculate
tipButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        //Remove 'active' from all buttons
        tipButtons.forEach(b => b.classList.remove('active'));
        //Add 'active' to the one that was clicked
        button.classList.add('active');
        //Read the tip value from the data-tip attribute
        selectedTip = parseFloat(button.dataset.tip);

        localStorage.setItem('lastTip', selectedTip);
        calculate();
    });
});



//5. When the bill or people count changes, recalculate
billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

//6. Run once on load so the screen starts correct
calculate();



/*Change the colors. 
    Edit the :root variables. Make a light theme. Make it match your favorite team's colors.

2. Add a 25% tip button. One line of HTML, and it just works (the JS already handles any tip button). 
    Notice how the code was built to make this easy — that's not an accident.

3. Change the title and add your name somewhere: 
    "Built by [you]."

4. Add a "custom tip" input 
    a number box where the user types their own percentage instead of clicking a preset. 
    Hint: it's another input with an addEventListener, and you'd set selectedTip from its value. 

5. Round up the per-person amount to the nearest dollar and show how much extra that adds. 
    ("Round up to $25 each, leaves $1.68 extra tip.") 

6. Disable the calculation and show a gentle message if the bill is empty or people is less than 1.

7. Add a "number of people" stepper with − and + buttons next to the input instead of typing. 

8. Show the total tip per person separately from the bill per person. 

9. Save the last-used tip % so it's pre-selected next time. 
    (Hint: look up localStorage.setItem and localStorage.getItem 
    this is a real browser feature, totally fair game, and a sneak peek at something you'll use a lot later.)*/
