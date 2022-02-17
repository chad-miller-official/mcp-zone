/* What are you gonna do, steal my Songkick API key? */
const SONGKICK_API_KEY          = '2kPN9eFcrPY9pwv4';
const SONGKICK_ARTIST_ID        = '4925458';
const SONGKICK_API_CALENDAR_URL = `https://api.songkick.com/api/3.0/artists/${SONGKICK_ARTIST_ID}/calendar.json?apikey=${SONGKICK_API_KEY}`;

const LOCALE      = navigator.languages?.[0] || navigator.language;
const GRID_BORDER = '<div class="grid-row-border"></div>';

const OFFSET_TIME_ZONES = {
  '-0500': 'EST',
  '-0600': 'CST',
  '-0700': 'MST',
  '-0800': 'PST',
};

const singleMessage = text => `<div class="embiggened" id="shows_slug">${text}</div>`;

$(() => {
  const showList = $('#shows_show_list');
  const onFail = () => {
    showList.append(singleMessage('Failed to retrieve upcoming shows!'));
  };

  $.get(SONGKICK_API_CALENDAR_URL, data => {
    const resultsPage = data.resultsPage;

    if(resultsPage.status != 'ok') {
      onFail();
      return;
    }

    const results = resultsPage.results;

    if(results.totalEntries <= 0) {
      showList.append(singleMessage('No upcoming shows.'));
      return;
    }

    showList.append(GRID_BORDER);

    results.event.forEach((s, i) => {
      const startTime      = s.start.datetime;
      const timezoneNumber = startTime.replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, '');
      const timezoneAbbr   = OFFSET_TIME_ZONES[timezoneNumber];

      const localeTimeStringOpts = {
        timezone: timezoneAbbr,
        hour: '2-digit',
        minute: '2-digit',
      };

      const startTimeObj = new Date(Date.parse(startTime));
      const date         = startTimeObj.toLocaleDateString(LOCALE);
      const start        = startTimeObj.toLocaleTimeString(LOCALE, localeTimeStringOpts);

      const endTime = s.end?.datetime;
      const end     = endTime && new Date(Date.parse(endTime)).toLocaleTimeString(LOCALE, localeTimeStringOpts);

      const showElem = `
  <div class="embiggened">
    <strong>${date} ${start + ((end && (' - ' + end)) || '')}</strong>
    <br />
    <br />
    <strong>${s.venue.displayName}</strong>
  </div>
  <div class="embiggened">
    <strong>${s.location.city}</strong>
  </div>
  <a class="a-button link" href="${s.uri}" target="_blank">Tickets</a>
  `;

      showList.append(showElem);
      showList.append(GRID_BORDER);
    });
  })
    .fail(onFail)
    .always(() => $('#shows_loading').remove());
});
