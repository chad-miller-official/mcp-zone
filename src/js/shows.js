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
      const startDay = new Date(event.starts_at);

      const day = startDay.toLocaleDateString('en-US',
          {year: 'numeric', month: 'long', day: 'numeric'});

      const time = startDay.toLocaleTimeString('en-US',
          {hour: 'numeric', minute: '2-digit'});

      const ticketUrl = event.offers.find(
          offer => offer.type === 'Tickets' && offer.status === 'available')

      let ticketElem = ticketUrl
          ? `<a class="a-button" href="${ticketUrl.url}" target="_blank">Tickets</a>`
          : `<i class="smallified">Tickets available soon!</i>`

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
    ${ticketElem}
  </td>
</tr>`;

      showList.append(showElem);
    });
  })
  .fail(onFail)
  .always(() => $('#shows_loading').remove());
});
