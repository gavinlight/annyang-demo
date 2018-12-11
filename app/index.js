window.speechSynthesis.onvoiceschanged = function() {
  annyang.start();

  addConvo('Hi :first', (first) => {
    say(`Goodmorning ${first}. Welcome in your Greenwheels for today. How is you car looking?`, () => {
      addConvo(':response', (response) => {
        say(`${response}? That's not good. We will contact you ASAP.`)
      });
    });
  });
};

const addConvo = (trigger, callback) => {
  annyang.addCommands({
    [trigger]: (...params) => {
      callback(...params);
      annyang.removeCommands(trigger);
    }
  });
}

const say = (msg, callback) => {
  const message = new SpeechSynthesisUtterance();
  message.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Daniel');
  message.text = msg;
  message.rate = 10;
  message.pitch = 2;

  window.messages = [];
  messages.push(message);

  message.addEventListener('end', () => { if(callback) callback(); });
  window.speechSynthesis.speak(message);
}
