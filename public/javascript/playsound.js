document.addEventListener('DOMContentLoaded', function() {
  const socket = io(window.location.origin);

  const buttons = document.getElementsByClassName('sound-button');

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

  const _removePlayingClasses = () => {
    Array.from(buttons).forEach(button => {
      button.classList.remove(classNames.playing, classNames.disabled);
    });
  };

  const playSound = sound => socket.emit('sound:play', sound);

  socket.on('sound:playing', ({ sound }) => _addPlayingClasses(sound));

  socket.on('sound:ended', _removePlayingClasses);

  Array.from(buttons).forEach(button => {
    button.addEventListener(
      'click',
      playSound.bind(null, button.dataset.sound)
    );
  });
});
