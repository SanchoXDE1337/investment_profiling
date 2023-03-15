const dropdownButton = document.getElementById('btn_dropdown')
const dropdownBtnContainer = document.querySelector('.dropdown__menu')
const dropdownLink = document.querySelector('.dropdown')
const dropdownLinkContainer = document.querySelector('.dropdown-container')
const startButton = document.getElementById('btn_start');
const profSteps = document.querySelectorAll('.content__step')
const stepsContainer = document.querySelector('.steps__container')
const dividerBar = document.querySelector('.divider-bar')
const progressBar = document.querySelector('.bar')
const progressContainer = document.querySelector('.progress')
const buttonContainer = document.querySelector('.button-container')
const stepCounter = document.getElementById('progress-counter')
const yearsSlider = document.getElementById('years')
const investAmountSlider = document.getElementById('invest_amount')
const startupCapitalSlider = document.getElementById('start_up_capital')
const profitSlider = document.getElementById('profitability')
const profitSliderValue = document.getElementById('profit_value')
const profitAvgLossValue = document.querySelector('.avg-loss')
const yearSliderValue = document.getElementById('year_value')
const amountSliderValue = document.getElementById('invest_amount_value')
const startupCapitalSliderValue = document.getElementById('start_up_capital_value')
const continueButton = document.getElementById('btn_continue')
const backButton = document.getElementById('btn_back')
const resetButton = document.getElementById('btn_reset')
const resultContainer = document.querySelector('.results')
const prompt2 = document.getElementById('prompt_2')
const prompt51 = document.getElementById('prompt_51');
const prompt52 = document.getElementById('prompt_52');
const prompt8 = document.getElementById('prompt_8');
const footerArrow = document.querySelector('.footer__bottom-arrow');
const avgSpendInput = document.getElementById('avg_spend');
const avgIncomeInput = document.getElementById('avg_income');
const avgObligationInput = document.getElementById('avg_obligation');
const ageInput = document.getElementById('age');
const helpIcons = document.querySelectorAll('.help__icon')
const tooltipOverlay = document.querySelector('.tooltip__overlay')

const STEPS_COUNT = 14;

let currentStep = 0;

dropdownButton.addEventListener('click', () => dropdownBtnContainer.classList.toggle('dropdown__menu_visible'))

dropdownLinkContainer.addEventListener('click', () => dropdownLink.classList.toggle('active'))

footerArrow.addEventListener('click', function () {
    window.scroll({
        top: 0, left: 0, behavior: 'smooth'
    });
});

startButton.addEventListener('click', () => {
    currentStep++;
    profSteps.forEach((profStep) => {
        profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
        profSteps[currentStep].classList.add('active_step')
    });
    progressContainer.classList.add('progress_visible');
    buttonContainer.classList.add('button-container_visible');
    progressBar.style.width = 100 / STEPS_COUNT * currentStep + '%';
    stepCounter.innerHTML = `${currentStep}`;

    if (!isAnyChecked(currentStep)) {
        continueButton.disabled = true;
    }
});

function isAnyChecked(currStep) {
    return !!profSteps[currStep].querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked').length
}

function isAboveZero(currStep) {
    const inputArray = Array.from(profSteps[currStep].querySelectorAll('input[type="text"]'))
    return inputArray.length > 0 ? inputArray.every(input => +input.value.replace(/\s+/g, "") > 0) : false;
}

continueButton.addEventListener('click', () => {
    if (isAnyChecked(currentStep) || isAboveZero(currentStep) || currentStep === 7 || currentStep === 9 || currentStep === 10) {
        currentStep++;
    } else {
        return;
    }

    dividerBar.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})

    if (currentStep > STEPS_COUNT) {
        profSteps.forEach((profStep) => {
            profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
        });
        stepsContainer.classList.add('steps__container_invisible')

        const radioAnswersSum = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(node => node.value).reduce((acc, value) => acc + +value, 0)
        const checkboxAnswersSum = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(node => node.value).reduce((acc, value) => acc + +value, 0)
        let profitSliderAnswer
        if (+profitSlider.value === 0) {
            profitSliderAnswer = 4
        } else if (+profitSlider.value < 5) {
            profitSliderAnswer = 8
        } else if (+profitSlider.value >= 5 && +profitSlider.value < 15) {
            profitSliderAnswer = 12
        } else if (+profitSlider.value >= 15 && +profitSlider.value < 30) {
            profitSliderAnswer = 16
        } else if (+profitSlider.value === 30) {
            profitSliderAnswer = 20
        }

        const startupCapitalSliderAnswer = +(+startupCapitalSlider.value * 0.5).toFixed(1)

        let yearsSliderAnswer
        if (+yearsSlider.value === 0) {
            yearsSliderAnswer = 0
        } else if (+yearsSlider.value <= 2) {
            yearsSliderAnswer = 1
        } else if (+yearsSlider.value <= 4) {
            yearsSliderAnswer = 2
        } else if (+yearsSlider.value === 5) {
            yearsSliderAnswer = 3
        }

        const ageInputAnswer = +(8 * 18 / Math.min(+ageInput.value, 55)).toFixed(1)

        const avgIncomeInputValue = +avgIncomeInput.value.replace(/\s+/g, "")
        const avgSpendInputValue = +avgSpendInput.value.replace(/\s+/g, "")
        const avgObligationInputValue = +avgObligationInput.value.replace(/\s+/g, "")

        const incomeDiff = avgIncomeInputValue - avgSpendInputValue
        let incomeDiffAnswer
        if (incomeDiff < 5000) {
            incomeDiffAnswer = 0
        } else if (incomeDiff >= 5000 && incomeDiff <= 100000) {
            incomeDiffAnswer = 1.75
        } else if (incomeDiff > 100000 && incomeDiff <= 500000) {
            incomeDiffAnswer = 3.5
        } else if (incomeDiff > 500000 && incomeDiff <= 1000000) {
            incomeDiffAnswer = 5.25
        } else if (incomeDiff > 1000000) {
            incomeDiffAnswer = 7
        }

        const dividedObligation = +(avgObligationInputValue / avgIncomeInputValue).toFixed(2)
        let dividedObligationAnswer
        if (dividedObligation <= 0.1) {
            dividedObligationAnswer = 8
        } else if (dividedObligation > 0.1 && dividedObligation <= 0.3) {
            dividedObligationAnswer = 6
        } else if (dividedObligation > 0.3 && dividedObligation <= 0.8) {
            dividedObligationAnswer = 4
        } else if (dividedObligation > 0.8 && dividedObligation < 1) {
            dividedObligationAnswer = 2
        } else if (dividedObligation >= 1) {
            dividedObligationAnswer = 0
        }

        const allAnswerSum = radioAnswersSum + checkboxAnswersSum + profitSliderAnswer + startupCapitalSliderAnswer + yearsSliderAnswer + ageInputAnswer + incomeDiffAnswer + dividedObligationAnswer

        let resultPageIndex = 0
        if (allAnswerSum <= 30) {
            resultPageIndex = 0
        } else if (allAnswerSum > 30 && allAnswerSum <= 50) {
            resultPageIndex = 1
        } else if (allAnswerSum > 50 && allAnswerSum <= 70) {
            resultPageIndex = 2
        } else if (allAnswerSum > 70 && allAnswerSum <= 90) {
            resultPageIndex = 3
        } else if (allAnswerSum > 90) {
            resultPageIndex = 4
        }

        resultContainer.classList.add('results_visible')
        document.querySelectorAll('.result')[resultPageIndex].classList.add('result_visible')
    } else {
        progressBar.style.width = 100 / STEPS_COUNT * currentStep + '%';
        stepCounter.innerHTML = `${currentStep}`;

        if (!(currentStep === 7 || currentStep === 9 || currentStep === 10)) {
            continueButton.disabled = true;
        }

        if (isAnyChecked(currentStep) || isAboveZero(currentStep)) {
            continueButton.disabled = false;
        }

        profSteps.forEach((profStep) => {
            profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
            profSteps[currentStep].classList.add('active_step')
        });
    }
})

backButton.addEventListener('click', () => {
    currentStep--;
    progressBar.style.width = 100 / STEPS_COUNT * currentStep + '%';
    stepCounter.innerHTML = `${currentStep}`;
    continueButton.disabled = false;

    if (currentStep < 1) {
        progressContainer.classList.remove('progress_visible');
        buttonContainer.classList.remove('button-container_visible');
    }

    profSteps.forEach((profStep) => {
        profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
        profSteps[currentStep].classList.add('active_step')
    });
})

profitSlider.oninput = function () {
    profitSliderValue.innerText = this.value + ' %';
    if (+this.value === 0) {
        profitAvgLossValue.innerText = 'Потери 0%';
    } else if (this.value < 5) {
        profitAvgLossValue.innerText = 'Потери до 5%';
    } else if (this.value < 15) {
        profitAvgLossValue.innerText = 'Потери от 5% до 15%';
    } else if (this.value < 30) {
        profitAvgLossValue.innerText = 'Потери от 15% до 30%';
    } else if (this.value >= 30) {
        profitAvgLossValue.innerText = 'Потери от 30%';
        profitSliderValue.innerText = 'от 30%';
    }
}

yearsSlider.oninput = function () {
    const ticks = [1, 2, 3, 5, 7, 10]
    switch (+this.value) {
        case 0:
            yearSliderValue.innerText = `1 год`;
            break;
        case 1:
        case 2:
            yearSliderValue.innerText = `${ticks[+this.value]} года`;
            break;
        default:
            yearSliderValue.innerText = `${ticks[+this.value]} лет`;
    }
}

investAmountSlider.oninput = function () {
    const ticks = [0, 50, 100, 500, 1, 3, 5, 10, 15, 25, 25]
    switch (+this.value) {
        case 0:
            amountSliderValue.innerText = `${ticks[+this.value]} ₽`;
            break;
        case 1:
        case 2:
        case 3:
            amountSliderValue.innerText = `${ticks[+this.value]} тыс. ₽`;
            break;
        case 10:
            amountSliderValue.innerText = `больше ${ticks[+this.value]} млн ₽`;
            break;
        default:
            amountSliderValue.innerText = `${ticks[+this.value]} млн ₽`;
    }
}

startupCapitalSlider.oninput = function () {
    const ticks = ['от 0 до 50 тыс. ₽', 'от 50 до 300 тыс. ₽', 'от 300 тыс. до 1 млн ₽', 'от 1 до 10 млн ₽', 'более 10 млн ₽']
    startupCapitalSliderValue.innerText = ticks[+this.value];
}

function validateInput() {
    const inputValue = Number((+this.value.replace(/(^0+(?!\.|$))|\D|\s+/g, '')).toFixed() // remove leading zeros, not a digits and whitespaces
    );
    const answerValue = !isNaN(inputValue) && inputValue > 0 ? inputValue : 0;
    this.value = answerValue.toLocaleString('ru')
}

avgSpendInput.oninput = validateInput;
avgIncomeInput.oninput = validateInput;
avgObligationInput.oninput = validateInput;
ageInput.oninput = validateInput;

document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
        continueButton.disabled = !isAnyChecked(currentStep);
    })
})

document.querySelectorAll('input[type="text"]').forEach((input) => {
    input.addEventListener('input', () => {
        continueButton.disabled = !isAboveZero(currentStep);
    })
})

document.querySelectorAll('input[name="descent"]').forEach((input) => input.addEventListener('change', () => {
    prompt2.classList.add('content__prompt_visible')
}))

document.querySelectorAll('input[name="unsuitable"]').forEach((input) => input.addEventListener('change', () => {
    switch (+input.dataset.variant) {
        case 1:
        case 4:
        case 6:
        case 7:
            prompt51.classList.add('content__prompt_visible');
            prompt52.classList.remove('content__prompt_visible');
            break;
        default:
            prompt52.classList.add('content__prompt_visible');
            prompt51.classList.remove('content__prompt_visible');
    }
}))

document.querySelectorAll('input[name="success"]').forEach((input) => input.addEventListener('change', () => {
    prompt8.classList.add('content__prompt_visible')
}))

resetButton.addEventListener('click', () => {
    dividerBar.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
    currentStep = 0;
    document.querySelectorAll('.tooltip_visible').forEach(tooltip => tooltip.classList.remove('tooltip_visible'))
    profSteps[currentStep].classList.add('active_step')
    progressBar.style.width = 100 / STEPS_COUNT + '%';
    stepCounter.innerHTML = '1';
    progressContainer.classList.remove('progress_visible');
    buttonContainer.classList.remove('button-container_visible');
    stepsContainer.classList.remove('steps__container_invisible')
    resultContainer.classList.remove('results_visible')
    document.querySelectorAll('.result').forEach((resultPage) => {
        resultPage.classList.contains('result_visible') && resultPage.classList.remove('result_visible');
    })
})

helpIcons.forEach(icon => icon.addEventListener('click', () => {
    const tooltip = icon.querySelector('.tooltip')
    if (!tooltip.classList.contains('tooltip_visible')) {
        document.querySelectorAll('.tooltip_visible').forEach(otherTooltip => otherTooltip.classList.remove('tooltip_visible'))
        tooltip.classList.add('tooltip_visible')
        tooltipOverlay.classList.add('tooltip__overlay_visible')
    } else {
        tooltip.classList.remove('tooltip_visible')
        tooltipOverlay.classList.remove('tooltip__overlay_visible')
    }
}))

tooltipOverlay.addEventListener('click', () => {
    document.querySelectorAll('.tooltip_visible').forEach(otherTooltip => otherTooltip.classList.remove('tooltip_visible'))
    tooltipOverlay.classList.remove('tooltip__overlay_visible')
})
