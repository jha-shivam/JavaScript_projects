// Initializing the synth var to windows speech synthesis object
let synth = window.speechSynthesis;

// Initalizing the dom objects
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Creating array where we store our different voices which is supported by windows
let voices = [];

//Populating voice in array --> voice array
const getVoices = () => {
  voices = synth.getVoices();

  // Loop through all voices and create and option for select voice element in html page
  voices.forEach((Element) => {
    //Creating option element and then append it to select voice dropdown on html page
    let option = document.createElement("option");
    option.textContent = Element.name + "(" + Element.lang + ")";

    //Seting option information in option field
    option.setAttribute("data-lang", Element.lang);
    option.setAttribute("data-name", Element.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();

//If error occur and getvoice give empty array it populates the array
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak main operation starts here
const speak = () => {
  if (synth.speaking) {
    console.error("Already Speaking......");
    return;
  }
  if (textInput.value !== "") {
    //Adding git image in background of body
    body.style.background = "#141414 url(Img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //when speaking is end this function runs
    speakText.onend = (e) => {
        body.style.background = '#141414';
      console.log("Done Speaking..........");
    };
    //Speaking error
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    //Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //setting pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};

//Adding eventListeners
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
rate.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

voiceSelect.addEventListener("change", (e) => speak());
