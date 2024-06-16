const musicContainer = document.getElementById("music-container");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");



document.addEventListener('DOMContentLoaded', () => {
  const fileButton = document.getElementById('fileButton');
  const fileInput = document.getElementById('fileInput');
  const playlist = document.getElementById('playlist');
  const audioPlayer = document.getElementById('audioPlayer');
  let currentPlaying = null;

  fileButton.addEventListener('click', () => {
      fileInput.click();
  });

  fileInput.addEventListener('change', handleFiles);

  function handleFiles() {
      const files = this.files;
      for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const listItem = document.createElement('li');
          listItem.textContent = file.name;

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.classList.add('remove-button');
          removeButton.addEventListener('click', (event) => {
              event.stopPropagation();
              listItem.remove();
              if (audioPlayer.src === URL.createObjectURL(file)) {
                  audioPlayer.pause();
                  audioPlayer.src = '';
                  currentPlaying = null;
              }
          });

          listItem.addEventListener('click', () => {
              if (audioPlayer.src === URL.createObjectURL(file)) {
                  if (audioPlayer.paused) {
                      audioPlayer.play();
                  } else {
                      audioPlayer.pause();
                  }
              } else {
                  audioPlayer.src = URL.createObjectURL(file);
                  audioPlayer.play();
              }
              updatePlaying(listItem);
          });

          listItem.appendChild(removeButton);
          playlist.appendChild(listItem);
      }
  }

  function updatePlaying(listItem) {
      if (currentPlaying) {
          currentPlaying.classList.remove('playing');
      }
      listItem.classList.add('playing');
      currentPlaying = listItem;
  }
});