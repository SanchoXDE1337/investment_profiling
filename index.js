const profSteps = document.querySelectorAll('.content__step')
const stepsContainer = document.querySelector('.steps__container')
const dividerBar = document.querySelector('.divider-bar')
const progressBar = document.querySelector('.bar')
const stepCounter = document.querySelector('#progress-counter')
const profitSlider = document.querySelector('#profitability')
const profitSliderValue = document.querySelector('#profit_value')
const profitAvgLossValue = document.querySelector('.avg-loss')
const yearSliderValue = document.querySelector('#year_value')
const amountSliderValue = document.querySelector('#invest_amount_value')
const backButton = document.querySelector('#btn_back')
const resetButton = document.querySelector('#btn_reset')
const resultContainer = document.querySelector('.results')
const prompt2 = document.getElementById('prompt_2')
const prompt51 = document.getElementById('prompt_51');
const prompt52 = document.getElementById('prompt_52');


let currentStep = 0;


function toggleMenu() {
    const dropdown = document.querySelector('.dropdown')
    const dropdownContainer = document.querySelector('.dropdown-container')
    dropdownContainer.addEventListener('click', () => dropdown.classList.toggle('active'))
}

function backToTop() {
    const arrow = document.querySelector('.footer__bottom-arrow');
    arrow.addEventListener('click', function () {
        window.scroll({
            top: 0, left: 0, behavior: 'smooth'
        });
    });
}

function startProfiling() {
    const startButton = document.querySelector('#btn_start');
    startButton.addEventListener('click', () => {
        currentStep++;
        profSteps.forEach((profStep) => {
            profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
            profSteps[currentStep].classList.add('active_step')
        });
        document.querySelector('.progress').classList.add('progress_visible');
        document.querySelector('.button-container').classList.add('button-container_visible');
    });
}

document.querySelector('#btn_continue').addEventListener('click', () => {
    currentStep++;
    dividerBar.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
    let profitSliderAnswer1
    if (+profitSlider.value === 0) {
        profitSliderAnswer1 = 6.6
    } else if (+profitSlider.value < 5) {
        profitSliderAnswer1 = 13.2
    } else if (+profitSlider.value >= 5 && +profitSlider.value < 15) {
        profitSliderAnswer1 = 19.8
    } else if (+profitSlider.value >= 15 && +profitSlider.value < 30) {
        profitSliderAnswer1 = 26.4
    } else if (+profitSlider.value === 30) {
        profitSliderAnswer1 = 33
    }

    console.log('-------------------------------------------')
    console.log('CURR_STEP', currentStep)
    console.log('RADIO', Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(node => node.value).reduce((acc, value) => acc + +value, 0))
    console.log('CHECKBOX', Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(node => node.value).reduce((acc, value) => acc + +value, 0))
    console.log("SLIDER", profitSliderAnswer1)

    if (currentStep > 9) {
        profSteps.forEach((profStep) => {
            profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
        });
        stepsContainer.classList.add('steps__container_invisible')

        const radioAnswersSum = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(node => node.value).reduce((acc, value) => acc + +value, 0)
        const checkboxAnswersSum = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(node => node.value).reduce((acc, value) => acc + +value, 0)
        let profitSliderAnswer
        if (+profitSlider.value === 0) {
            profitSliderAnswer = 6.6
        } else if (+profitSlider.value < 5) {
            profitSliderAnswer = 13.2
        } else if (+profitSlider.value >= 5 && +profitSlider.value < 15) {
            profitSliderAnswer = 19.8
        } else if (+profitSlider.value >= 15 && +profitSlider.value < 30) {
            profitSliderAnswer = 26.4
        } else if (+profitSlider.value === 30) {
            profitSliderAnswer = 33
        }

        const allAnswerSum = radioAnswersSum + checkboxAnswersSum + profitSliderAnswer
        console.log(allAnswerSum)

        let resultPageIndex
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
        progressBar.style.width = 100 / 9 * currentStep + '%';
        stepCounter.innerHTML = `${currentStep}`;

        if (currentStep > 1) {
            backButton.classList.add('back__button_visible')
        }

        profSteps.forEach((profStep) => {
            profStep.classList.contains('active_step') && profStep.classList.remove('active_step');
            profSteps[currentStep].classList.add('active_step')
        });
    }
})

backButton.addEventListener('click', () => {
    currentStep--;
    progressBar.style.width = 100 / 9 * currentStep + '%';
    stepCounter.innerHTML = `${currentStep}`;

    if (currentStep < 2) {
        backButton.classList.remove('back__button_visible')
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
        profitAvgLossValue.innerText = 'Потери от 30% до 100%';
    }


}

document.querySelector('#years').oninput = function () {
    const ticks = [1, 3, 5, 10, 15, 20, 25, 30, 35, 40]
    switch (+this.value) {
        case 0:
            yearSliderValue.innerText = `1 год`;
            break;
        case 1:
            yearSliderValue.innerText = `3 года`;
            break;
        default:
            yearSliderValue.innerText = `${ticks[+this.value]} лет`;
    }

}

document.querySelector('#invest_amount').oninput = function () {
    const ticks = [50, 100, 500, 1, 3, 5, 10, 15, 25, 25]
    switch (+this.value) {
        case 0:
        case 1:
        case 2:
            amountSliderValue.innerText = `${ticks[+this.value]} тыс. ₽`;
            break;
        case 9:
            amountSliderValue.innerText = `больше ${ticks[+this.value]} млн. ₽`;
            break;
        default:
            amountSliderValue.innerText = `${ticks[+this.value]} млн. ₽`;
    }
}

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


resetButton.addEventListener('click', () => {
    currentStep = 1;
    profSteps[currentStep].classList.add('active_step')
    progressBar.style.width = 100 / 9 * currentStep + '%';
    stepCounter.innerHTML = `${currentStep}`;
    stepsContainer.classList.remove('steps__container_invisible')
    resultContainer.classList.remove('results_visible')
    document.querySelectorAll('.result').forEach((resultPage) => {
        resultPage.classList.contains('result_visible') && resultPage.classList.remove('result_visible');
    })

})


window.onload = function () {
    toggleMenu();
    backToTop();
    startProfiling();
}
