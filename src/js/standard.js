$(() => {
  $('#vintage').append(
    `<img src="./assets/img/banners/banner${Math.floor(Math.random() * 10)}.gif" />`
  );

  const cursorId = Math.floor(Math.random() * 10);

  const cursorFile = cursorId >= 8
    ? `animated/ani_cursor${cursorId - 8}.gif`
    : `cursor${cursorId}.cur`;

  $('body').css('cursor', `url('./assets/cursors/${cursorFile}'), auto`);
});

