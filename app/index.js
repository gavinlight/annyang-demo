window.speechSynthesis.onvoiceschanged = function() {
  annyang.start();
  addConvo(commands);
};

const commands = {
  ':first': (first) => {
    say(`Hello ${first}. Hoe gaat het?`);
  },
};

const addConvo = (commands) => {
  annyang.addCommands(mapCallbacks(commands));
}

const mapCallbacks = (commands) => {
  return Object.assign(
    {},
    ...Object.keys(commands).map(trigger => ({
      [trigger]: (...params) => {
        commands[trigger](...params);
        annyang.removeCommands(trigger);
      }
    }))
  );
};

const say = (msg) => {
  const message = new SpeechSynthesisUtterance();
  message.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Ting-Ting');
  message.text = msg;
  message.rate = 10;
  message.pitch = 2;

  window.speechSynthesis.speak(message);
}
