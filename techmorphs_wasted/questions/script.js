// ---------------- Save & Load Answers ----------------
function saveAnswers(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    const formData = new FormData(form);
    let answers = {};
    formData.forEach((value, key) => {
        answers[key] = value;
    });
    localStorage.setItem(storageKey, JSON.stringify(answers));
}

function loadAnswers(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        const answers = JSON.parse(saved);
        Object.keys(answers).forEach(key => {
            const input = form.querySelector(`input[name="${key}"][value="${answers[key]}"]`);
            if (input) input.checked = true;
        });
    }
}

// ---------------- Auto-save on change ----------------
function autoSaveForm(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("change", () => saveAnswers(formId, storageKey));
    window.addEventListener("beforeunload", () => saveAnswers(formId, storageKey));
}

// ---------------- Section 1 ----------------
const section1Form = document.getElementById("section1Form");
if (section1Form) {
    loadAnswers("section1Form", "section1Answers");
    autoSaveForm("section1Form", "section1Answers");

    section1Form.addEventListener("submit", (e) => {
        e.preventDefault();
        saveAnswers("section1Form", "section1Answers");
        // User clicks <a href="section2.html">
    });
}

// ---------------- Section 2 ----------------
const section2Form = document.getElementById("section2Form");
if (section2Form) {
    loadAnswers("section2Form", "section2Answers");
    autoSaveForm("section2Form", "section2Answers");

    section2Form.addEventListener("submit", (e) => {
        e.preventDefault();
        saveAnswers("section2Form", "section2Answers");

        // Collect both sections' answers
        const section1 = JSON.parse(localStorage.getItem("section1Answers") || "{}");
        const section2 = JSON.parse(localStorage.getItem("section2Answers") || "{}");

        let scores = { science: 0, arts: 0, commerce: 0, diploma: 0 };

        function addScores(obj) {
            Object.entries(obj).forEach(([k, v]) => {
                if (k.includes("science")) scores.science += Number(v);
                if (k.includes("arts")) scores.arts += Number(v);
                if (k.includes("commerce") || k.includes("business")) scores.commerce += Number(v);
                if (k.includes("diploma") || k.includes("vocational")) scores.diploma += Number(v);
            });
        }

        addScores(section1);
        addScores(section2);

        localStorage.setItem("finalScores", JSON.stringify(scores));
        window.location.href = "result.html";
    });
}

// ---------------- Result Page ----------------
const resultBox = document.getElementById("resultBox");
if (resultBox) {
    const scores = JSON.parse(localStorage.getItem("finalScores") || "{}");
    if (Object.keys(scores).length > 0) {
        let sortedFields = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        let bestField = sortedFields[0][0];

        const suggestions = {
            science: ["Biology (MBBS, BDS, Nursing)", "Computer Science (B.Tech IT/CS)", "Pure Science (B.Sc Physics/Chemistry/Maths)"],
            arts: ["History", "Literature", "Psychology", "Political Science"],
            commerce: ["Accounting", "Finance", "Business Administration", "Economics"],
            diploma: ["Diploma in IT", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"]
        };

        let suggestionsHTML = "<h3>Career Path Suggestions (Interest + Aptitude)</h3><ul>";
        sortedFields.forEach(([field, score]) => {
            suggestionsHTML += `<li><strong>${field.toUpperCase()}</strong> → Score: ${score}`;
            if (suggestions[field]) {
                suggestionsHTML += `<br><em>Suggested Courses:</em> ${suggestions[field].join(", ")}`;
            }
            suggestionsHTML += "</li><br>";
        });
        suggestionsHTML += "</ul>";

        resultBox.innerHTML = `
            <h2>Your Top Recommended Path:</h2>
            <p style="font-size:1.2em;"><strong>${bestField.toUpperCase()}</strong></p>
            ${suggestionsHTML}
            <button id="restartTest">Restart Test</button>
        `;
    }
}

// ---------------- Restart Test ----------------
document.addEventListener("click", function(e){
    if(e.target && e.target.id === "restartTest"){
        localStorage.clear();
        window.location.href = "index.html";
    }
});

// ---------------- Timer Function ----------------
function startTimer(durationMinutes, displayId) {
    let time = durationMinutes * 60;
    const display = document.getElementById(displayId);
    if (!display) return;

    const timer = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        display.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        if(time === 300){ // 5 min remaining alert
            alert("Only 5 minutes remaining!");
        }

        if(time <= 0){
            clearInterval(timer);
            alert("Time is up! Your test will be submitted automatically.");
            const formId = section1Form ? "section1Form" : "section2Form";
            saveAnswers(formId, formId === "section1Form" ? "section1Answers" : "section2Answers");
            if(section1Form) window.location.href = "section2.html";
            if(section2Form) section2Form.dispatchEvent(new Event('submit'));
        }

        time--;
    }, 1000);
}

// ---------------- Start Timer if element exists ----------------
if(document.getElementById("timer")){
    startTimer(30, "timer"); // 30 minutes timer
}
