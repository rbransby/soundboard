document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.getElementsByClassName('sound-button');

  const classNames = {
    playing: 'sound-playing',
    disabled: 'disabled'
  };

  const waitFor = ms => new Promise(r => setTimeout(r, ms));

  const addPlayingClasses = (buttons, currentButton) =>
    new Promise(resolve => {
      Array.from(buttons).forEach(button => {
        if (button === currentButton) {
          button.classList.add(classNames.playing);
        } else {
          button.classList.add(classNames.disabled);
        }
      });

      resolve('done');
    });

  const removePlayingClasses = buttons =>
    new Promise(resolve => {
      Array.from(buttons).forEach(button => {
        button.classList.remove(classNames.playing, classNames.disabled);
      });

      resolve('done');
    });

  const playSound = async (sound, buttons, e) => {
    await addPlayingClasses(buttons, e.currentTarget);

    const url = '/api/playsound';
    const data = { sound: sound };

    await fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // hack to make it seem like classes come off after sound is played
    // TODO: api returns 200 after sound has finished playing
    await waitFor(3000);

    await removePlayingClasses(buttons);
  };

  Array.from(buttons).forEach(button => {
    button.addEventListener(
      'click',
      playSound.bind(null, button.dataset.sound, buttons)
    );
  });
});
