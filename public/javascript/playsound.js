document.addEventListener('DOMContentLoaded', function() {
  const socket = io(window.location.origin);

  const buttons = document.getElementsByClassName('sound-button');
  const queueWrapper = document.getElementById('queue');

  let userInError = false;

  const classNames = {
    playing: 'sound-playing',
    disabled: 'disabled'
  };

  const _addPlayingClasses = currentSound => {
    Array.from(buttons).forEach(button => {
      button.classList.add(
        button.dataset.sound === currentSound
          ? classNames.playing
          : classNames.disabled
      );
    });
  };

  const _disableAll = () => {
    Array.from(buttons).forEach(button =>
      button.classList.add(classNames.disabled)
    );
  };

  const _removePlayingClasses = () => {
    Array.from(buttons).forEach(button => {
      button.classList.remove(classNames.playing, classNames.disabled);
    });
  };

  const _showError = id =>
    (document.getElementById(id).style.display = 'block');

  const _hideError = id => (document.getElementById(id).style.display = 'none');

  const playSound = sound => socket.emit('sound:play', sound);

  // socket.on('tooManySounds', function() {
  //   userInError = true;

  //   _showError('error-user-max');
  //   _disableAll();
  // });

  // socket.on('soundsAllowed', function() {
  //   userInError = false;
  //   _hideError('error-user-max');
  //   _removePlayingClasses();
  // });

  socket.on('soundQueue', function(queue) {
    if (queue.length >= 10) {
      _showError('error-max-queue');
      _disableAll();
    } else {
      _hideError('error-max-queue');

      // if (userInError === false) {
      _removePlayingClasses();
      // }
    }

    // catch all
    // if (queue.length <= 2) {
    //   userInError = false;
    //   _hideError('error-user-max');
    //   _removePlayingClasses();
    // }

    // clear div
    while (queueWrapper.firstChild) {
      queueWrapper.removeChild(queueWrapper.firstChild);
    }

    queue.forEach((sound, i) => {
      const item = document.createElement('div');

      item.style.position = 'relative';
      if (i !== 0) {
        item.style.marginTop = '4px';
      }

      if (i === 0) {
        item.style.paddingLeft = '25px';

        const img = document.createElement('img');

        img.src =
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/av/1x_web/ic_volume_up_black_18dp.png';

        img.style.position = 'absolute';
        img.style.top = '50%';
        img.style.left = '0';
        img.style.transform = 'translateY(-50%)';

        item.appendChild(img);
      }

      item.innerHTML += sound;

      queueWrapper.appendChild(item);
    });
  });

  Array.from(buttons).forEach(button => {
    button.addEventListener(
      'click',
      playSound.bind(null, button.dataset.sound)
    );
  });
});
