/* What are you gonna do, steal my Bandsintown API key? */
const BANDSINTOWN_API_KEY = '1765ab9553fda3a1afa4e9d9701e2ee0';
const BANDSINTOWN_ARTIST_NAME = 'Michael Cera Palin';
const SONGKICK_API_CALENDAR_URL = `https://rest.bandsintown.com/artists/${BANDSINTOWN_ARTIST_NAME}/events/?app_id=${BANDSINTOWN_API_KEY}`;

const singleMessage = text => `
<tr>
  <td class="embiggened">
    ${text}
  </td>
</tr>`;

const DATE_FORMAT = luxon.DateTime.DATE_MED_WITH_WEEKDAY;
const TIME_FORMAT = luxon.DateTime.TIME_SIMPLE;

$(() => {
  const showList = $('#shows_show_table');
  const onFail = () => showList.append(
      singleMessage('Failed to retrieve upcoming shows! Tell Chad.'));

  $.get(SONGKICK_API_CALENDAR_URL, data => {
    if (data.length <= 0) {
      showList.append(singleMessage('No upcoming shows.'));
      return;
    }

    data.forEach(event => {
      const startDay = luxon.DateTime.fromISO(event.starts_at);
      const day = startDay.toLocaleString(DATE_FORMAT);
      const time = startDay.toLocaleString(TIME_FORMAT);

      const showElem = `
<tr>
  <td>
    <strong>${day}</strong>
    <br />
    <div class="shows-time-and-venue">
      <i>${time} @ </i>
      <strong>${event.venue.name}</strong>
    </div>
  </td>
  <td>
    <strong>${event.venue.location}</strong>
  </td>
  <td>
    <a class="a-button" href="${event.offers[0].url}" target="_blank">Tickets</a>
  </td>
</tr>`;

      showList.append(showElem);
    });
  })
  .fail(onFail)
  .always(() => $('#shows_loading').remove());
});
