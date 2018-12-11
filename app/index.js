annyang.start();

const commands = {
  'hello :first :last': (first, last) => { console.log(first, last); },
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
}

addConvo(commands);
