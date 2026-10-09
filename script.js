
"use strict";

// Завдання 1. Конвертер температури

const fahrenheitInput = document.getElementById("fahrenheit");
const celsiusInput = document.getElementById("celsius");

function convertToCelsius() {
    if (fahrenheitInput.value.trim() === "") {
        celsiusInput.value = "";
        return;
    }

    const fahrenheit = Number(fahrenheitInput.value);
    celsiusInput.value = ((fahrenheit - 32) * 5 / 9).toFixed(2);
}

function convertToFahrenheit() {
    if (celsiusInput.value.trim() === "") {
        fahrenheitInput.value = "";
        return;
    }

    const celsius = Number(celsiusInput.value);
    fahrenheitInput.value = (celsius * 9 / 5 + 32).toFixed(2);
}

fahrenheitInput.addEventListener("input", convertToCelsius);
celsiusInput.addEventListener("input", convertToFahrenheit);


// Завдання 2. Таблиця множення з текстовою відповіддю

let numberA2 = 0;
let numberB2 = 0;
let score2 = 0;
let answered2 = false;

const question2 = document.getElementById("question2");
const answer2 = document.getElementById("answer2");
const result2 = document.getElementById("result2");
const scoreElement2 = document.getElementById("score2");
const checkButton2 = document.getElementById("check2");
const nextButton2 = document.getElementById("next2");

function generateQuestion2() {
    numberA2 = Math.floor(Math.random() * 10) + 1;
    numberB2 = Math.floor(Math.random() * 10) + 1;

    question2.textContent = `${numberA2} × ${numberB2} = ?`;
    answer2.value = "";
    result2.textContent = "";
    result2.className = "result";
    answered2 = false;
    checkButton2.disabled = false;
    answer2.disabled = false;
    answer2.focus();
}

function checkAnswer2() {
    if (answered2 || answer2.value.trim() === "") {
        return;
    }

    answered2 = true;
    answer2.disabled = true;
    checkButton2.disabled = true;

    if (Number(answer2.value) === numberA2 * numberB2) {
        score2++;
        result2.textContent = "Правильно! Молодець!";
        result2.className = "result correct";
    } else {
        result2.textContent =
            `Неправильно. Правильна відповідь: ${numberA2 * numberB2}`;
        result2.className = "result incorrect";
    }

    scoreElement2.textContent = score2;
}

checkButton2.addEventListener("click", checkAnswer2);
nextButton2.addEventListener("click", generateQuestion2);

answer2.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer2();
    }
});


// Завдання 3. Таблиця множення з радіокнопками

let numberA3 = 0;
let numberB3 = 0;
let score3 = 0;
let answered3 = false;

const question3 = document.getElementById("question3");
const options3 = document.getElementById("options3");
const result3 = document.getElementById("result3");
const scoreElement3 = document.getElementById("score3");
const nextButton3 = document.getElementById("next3");

function generateQuestion3() {
    numberA3 = Math.floor(Math.random() * 10) + 1;
    numberB3 = Math.floor(Math.random() * 10) + 1;

    question3.textContent = `${numberA3} × ${numberB3} = ?`;
    options3.replaceChildren();
    result3.textContent = "";
    result3.className = "result";
    answered3 = false;

    const correctAnswer = numberA3 * numberB3;
    const answers = new Set([correctAnswer]);

    while (answers.size < 4) {
        const wrongAnswer = Math.floor(Math.random() * 100) + 1;
        answers.add(wrongAnswer);
    }

    const shuffledAnswers = Array.from(answers);

    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] =
            [shuffledAnswers[j], shuffledAnswers[i]];
    }

    shuffledAnswers.forEach((answer, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer3";
        radio.value = answer;

        const text = document.createElement("span");
        text.textContent = answer;

        label.append(radio, text);
        options3.appendChild(label);

        radio.addEventListener("change", function() {
            checkAnswer3(answer, correctAnswer);
        });
    });
}

function checkAnswer3(selectedAnswer, correctAnswer) {
    if (answered3) {
        return;
    }

    answered3 = true;

    options3.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
        score3++;
        result3.textContent = "Правильно! Молодець!";
        result3.className = "result correct";
    } else {
        result3.textContent =
            `Неправильно. Правильна відповідь: ${correctAnswer}`;
        result3.className = "result incorrect";
    }

    scoreElement3.textContent = score3;
}

nextButton3.addEventListener("click", generateQuestion3);


// Завдання 4. Галерея чоловічого одягу

const imagesArray = [
    {
        path: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80",
        title: "Футболки",
        description: "Повсякденний чоловічий одяг"
    },
    {
        path: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
        title: "Куртки",
        description: "Стильний верхній одяг"
    },
    {
        path: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=80",
        title: "Класичний одяг",
        description: "Сучасний чоловічий стиль"
    }
];

function initPhotoRotator(containerId, images) {
    const container = document.getElementById(containerId);
    let currentIndex = 0;

    container.replaceChildren();

    const navigation = document.createElement("div");
    navigation.className = "rotator-nav";

    const backLink = document.createElement("a");
    backLink.href = "#";
    backLink.textContent = "← Назад";

    const counter = document.createElement("span");
    counter.className = "rotator-counter";

    const forwardLink = document.createElement("a");
    forwardLink.href = "#";
    forwardLink.textContent = "Вперед →";

    const image = document.createElement("img");
    image.className = "rotator-image";
    image.alt = "Зображення чоловічого одягу";

    const title = document.createElement("h3");
    title.className = "rotator-title";

    const description = document.createElement("p");
    description.className = "rotator-description";

    navigation.append(backLink, counter, forwardLink);
    container.append(navigation, image, title, description);

    function showImage() {
        const item = images[currentIndex];

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;

        image.src = item.path;
        image.alt = item.title;
        title.textContent = item.title;
        description.textContent = item.description;

        backLink.style.visibility =
            currentIndex === 0 ? "hidden" : "visible";

        forwardLink.style.visibility =
            currentIndex === images.length - 1 ? "hidden" : "visible";
    }

    backLink.addEventListener("click", function(event) {
        event.preventDefault();

        if (currentIndex > 0) {
            currentIndex--;
            showImage();
        }
    });

    forwardLink.addEventListener("click", function(event) {
        event.preventDefault();

        if (currentIndex < images.length - 1) {
            currentIndex++;
            showImage();
        }
    });

    if (images.length > 0) {
        showImage();
    } else {
        counter.textContent = "Зображень немає";
        backLink.style.visibility = "hidden";
        forwardLink.style.visibility = "hidden";
        image.style.display = "none";
    }
}

initPhotoRotator("rotator", imagesArray);


// Завдання 5. CAPTCHA

let captchaCode = "";

function initCaptcha(numberOfDigits) {
    const captcha = document.getElementById("captcha");
    const input = document.getElementById("captchaAnswer");
    const result = document.getElementById("captchaResult");

    captcha.replaceChildren();
    captchaCode = "";

    result.textContent = "";
    result.className = "result";
    input.value = "";

    for (let i = 0; i < numberOfDigits; i++) {
        const digit = Math.floor(Math.random() * 10);
        captchaCode += digit;

        const pixel = document.createElement("span");
        pixel.className = "captcha-digit";
        pixel.textContent = digit;

        pixel.style.transform =
            `rotate(${Math.floor(Math.random() * 21) - 10}deg)`;

        pixel.style.backgroundColor =
            i % 2 === 0 ? "#ffffff" : "#e1e9f5";

        captcha.appendChild(pixel);
    }
}

function checkCaptcha() {
    const input = document.getElementById("captchaAnswer");
    const result = document.getElementById("captchaResult");

    if (input.value.trim() === captchaCode) {
        result.textContent = "CAPTCHA пройдена успішно!";
        result.className = "result correct";
    } else {
        result.textContent = "Неправильний код. Спробуйте ще раз.";
        result.className = "result incorrect";
    }
}

document.getElementById("checkCaptcha")
    .addEventListener("click", checkCaptcha);

document.getElementById("refreshCaptcha")
    .addEventListener("click", function() {
        initCaptcha(5);
    });

document.getElementById("captchaAnswer")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkCaptcha();
        }
    });


// Початкова ініціалізація

generateQuestion2();
generateQuestion3();
initCaptcha(5);