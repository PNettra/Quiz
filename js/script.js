document.querySelector("#submitQuiz").addEventListener("click", gradeQuiz);

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

document.querySelector("#totalAttempts").textContent =
    `Total Attempts: ${attempts}`;

let score = 0;

function isFormValid() {
    let validationFdbk = document.querySelector("#validationFdbk");

    validationFdbk.textContent = "";

    let requiredFields = ["q1", "q2", "q5", "q6", "q9", "q10"];

    for (let id of requiredFields) {
        if (document.querySelector(`#${id}`).value.trim() === "") {
            validationFdbk.textContent = "Please answer all questions.";
            return false;
        }
    }

    let q3Answered =
        document.querySelector("#Jackson").checked ||
        document.querySelector("#Franklin").checked ||
        document.querySelector("#Jefferson").checked ||
        document.querySelector("#Roosevelt").checked;

    if (!q3Answered) {
        validationFdbk.textContent = "Please answer all questions.";
        return false;
    }

    if (document.querySelector("input[name=q4]:checked") === null) {
        validationFdbk.textContent = "Please answer all questions.";
        return false;
    }

    let q7Answered = document.querySelector(
        "#Superior, #Michigan, #Huron, #Erie, #Ontario, #Tahoe"
    );

    let q7Checkboxes = document.querySelectorAll(
        "#Superior, #Michigan, #Huron, #Erie, #Ontario, #Tahoe"
    );

    if (!Array.from(q7Checkboxes).some(input => input.checked)) {
        validationFdbk.textContent = "Please answer all questions.";
        return false;
    }

    if (document.querySelector('input[name="q8"]:checked') === null) {
        validationFdbk.textContent = "Please answer all questions.";
        return false;
    }

    return true;
}

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);

    markContainer.textContent = "";

    let img = document.createElement("img");

    img.src = `img/${imageName}`;
    img.alt = altText;
    img.className = "mark-image";

    markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);

    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white rounded p-2 mt-2";

    setMarkImage(index, "checkmark.png", "Checkmark");

    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);

    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-dark rounded p-2 mt-2";

    setMarkImage(index, "xmark.png", "X mark");
}

function gradeQuiz() {

    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();

    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }


    let q2Response = document.querySelector("#q2").value;

    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    if (
        document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked
    ) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    let q5Response = document.querySelector("#q5").value.toLowerCase().trim();

    if (q5Response === "alaska") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    let q6Response = document.querySelector("#q6").value;

    if (q6Response === "arizona") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    let q7Correct =
        document.querySelector("#Superior").checked &&
        document.querySelector("#Michigan").checked &&
        document.querySelector("#Huron").checked &&
        document.querySelector("#Erie").checked &&
        document.querySelector("#Ontario").checked &&
        !document.querySelector("#Tahoe").checked;

    if (q7Correct) {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    let q8Response = document.querySelector('input[name="q8"]:checked').value;

    if (q8Response === "Florida") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    let q9Response = document.querySelector("#q9").value;

    if (q9Response === "newyork") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    let q10Response = document.querySelector("#q10").value.toLowerCase().trim();

    if (q10Response === "austin") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    let totalScore = document.querySelector("#totalScore");

    totalScore.textContent = `Total Score: ${score}/100`;

    if (score < 80) {
        totalScore.className = "text-danger mt-4";
    } else {
        totalScore.className = "text-success mt-4";
    }

    if (score > 80) {
        totalScore.textContent += " Congratulations!";
    }

    attempts++;

    document.querySelector("#totalAttempts").textContent =
        `Total Attempts: ${attempts}`;

    localStorage.setItem("total_attempts", attempts);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];

    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");

    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");

        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;
        input.className = "form-check-input";

        let label = document.createElement("label");

        label.htmlFor = choice;
        label.textContent = choice;
        label.className = "form-check-label";

        let div = document.createElement("div");
        div.className = "form-check";

        div.appendChild(input);
        div.appendChild(label);

        choicesContainer.appendChild(div);
    }
}

displayQ4Choices();
