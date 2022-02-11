$(() => {
  const bandImage = `./assets/img/band${Math.floor(Math.random() * 6)}.jpg`;

  $('#band_photo').append(
    `<a class="image" href="${bandImage}" target="_blank"><img src="${bandImage}" /></a>`
  );
});
