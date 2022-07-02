const onetoanthorText = document.querySelector(".onetoanthor-text"),
    anthorText = document.querySelector(".to-text"),
    chageIcon = document.querySelector(".change"),
    selectTag = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row i");
translate = document.querySelector("button"),

    selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

chageIcon.addEventListener("click", () => {
    let tempText = onetoanthorText.value,
        tempLang = selectTag[0].value;
    onetoanthorText.value = anthorText.value;
    anthorText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

onetoanthorText.addEventListener("keyup", () => {
    if (!onetoanthorText.value) {
        anthorText.value = "";
    }
});

translate.addEventListener("click", () => {
    let text = onetoanthorText.value.trim(),
        translateonetoanthor = selectTag[0].value,
        translateTo = selectTag[1].value;
    if (!text) return;
    anthorText.setAttribute("placeholder", "Translating Wait For While...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateonetoanthor}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        anthorText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if (data.id === 0) {
                anthorText.value = data.translation;
            }
        });
        anthorText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!onetoanthorText.value || !anthorText.value) return;
        if (target.classList.contains("fa-copy")) {
            if (target.id == "onetoanthor") {
                navigator.clipboard.writeText(onetoanthorText.value);
            } else {
                navigator.clipboard.writeText(anthorText.value);
            }
        } else {
            let speech;
            if (target.id == "onetoanthor") {
                speech = new SpeechSynthesisUtterance(onetoanthorText.value);
                speech.lang = selectTag[0].value;
            } else {
                speech = new SpeechSynthesisUtterance(anthorText.value);
                speech.lang = selectTag[1].value;
            }
            speechSynthesis.speak(speech);
        }
    });
});