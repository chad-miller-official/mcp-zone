const SHOW_DATA = [
  {
    "type": "Concert",
    "uri": "https://www.songkick.com/concerts/40192320-dinner-time-at-529",
    "start": {
      "datetime": "2022-02-11T21:00:00-0500",
    },
    "location": {
      "city": "Atlanta, GA, US",
    },
    "venue": {
      "displayName": "529",
    },
  },
  {
    "type": "Concert",
    "uri": "https://www.songkick.com/concerts/40192353-mother-fore-at-southern-brewing-company",
    "start": {
      "datetime": "2022-02-12T20:00:00-0500",
    },
    "location": {
      "city": "Athens, GA, US",
    },
    "venue": {
      "displayName": "Southern Brewing Company",
    },
  },
  {
    "type": "Concert",
    "uri": "https://www.eventbrite.com/e/raquel-lily-album-release-show-w-dinner-time-yael-sante-tickets-247363259167",
    "start": {
      "datetime": "2022-03-03T19:00:00-0500",
    },
    "location": {
      "city": "Decatur, GA, US",
    },
    "venue": {
      "displayName": "Eddie's Attic",
    },
  }
];

const LOCALE = navigator.languages?.[0] || navigator.language;

const OFFSET_TIME_ZONES = {
  '-0500': 'EST',
  '-0600': 'CST',
  '-0700': 'MST',
  '-0800': 'PST',
};

$(() => {
  const showList = $('#show_list');

  SHOW_DATA.forEach((s, i) => {
    const startTime = s.start.datetime;
    const timezone = OFFSET_TIME_ZONES[startTime.replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, '')];
    const localeTimeStringOpts = {
      timezone,
      hour: '2-digit',
      minute: '2-digit',
    };

    const startTimeObj = new Date(Date.parse(startTime));
    const date = startTimeObj.toLocaleDateString(LOCALE);
    const start = startTimeObj.toLocaleTimeString(LOCALE, localeTimeStringOpts);

    const endTime = s.end?.datetime;
    const end = endTime && new Date(Date.parse(endTime)).toLocaleTimeString(LOCALE, localeTimeStringOpts);

    const showElem = `
<div class="date-and-venue">
  ${date} ${start + ((end && (' - ' + end)) || '')}
  <br />
  <br />
  ${s.venue.displayName}
</div>
<div class="city">
  ${s.location.city}
</div>
<a class="a-button link" href="${s.uri}" target="_blank">Tickets</a>
`;

    showList.append(showElem);

    if(i < SHOW_DATA.length - 1) {
      showList.append('<div class="grid-row-border"></div>');
    }
  });
});
