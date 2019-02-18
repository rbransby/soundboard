document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.getElementsByClassName('sound-button');

  const classNames = {
    playing: 'sound-playing',
    disabled: 'disabled'
  };

  const _addPlayingClasses = (buttons, currentButton) =>
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

  const _removePlayingClasses = buttons =>
    new Promise(resolve => {
      Array.from(buttons).forEach(button => {
        button.classList.remove(classNames.playing, classNames.disabled);
      });

      resolve('done');
    });

  const _playSound = (sound, url = '/api/playsound') =>
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ sound }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const buttonClick = async (sound, buttons, e) => {
    await _addPlayingClasses(buttons, e.currentTarget);

    await _playSound(sound);

    await _removePlayingClasses(buttons);
  };

  Array.from(buttons).forEach(button => {
    button.addEventListener(
      'click',
      buttonClick.bind(null, button.dataset.sound, buttons)
    );
  });
});
