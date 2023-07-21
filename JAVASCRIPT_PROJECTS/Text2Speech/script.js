let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelection = document.querySelector('select');

// make a list of available voice in selct section
window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice,i)=>(voiceSelection.options[i] = new Option(voice.name,i)));
};
//  change the voice as you choose from the list
voiceSelection.addEventListener("change", () => {
        speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click",()=>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})