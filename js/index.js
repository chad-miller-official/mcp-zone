$(() => {
  const bandImage = `./assets/img/band/band${Math.floor(Math.random() * 6)}.jpg`;

  $('#index_band_photo').empty();

  $('#index_band_photo').append(
    `<a class="image" href="${bandImage}" target="_blank"><img src="${bandImage}" /></a>`
  );
});
