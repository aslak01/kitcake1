export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const createTimeSeriesData = (timerange, min, max) => {
  
  if (typeof timerange != 'number') timerange = 1;
  if (timerange < 0) timerange = 1;
  if (typeof max != 'number') max = 100;
  if (typeof min != 'number') min = 0;
  if (max < 0) max = 1;
  if (min < 0) min = 0;

  const maxDate = new Date();
  const firstDate = new Date(
      maxDate.getTime() - (timerange * 24 * 60 * 60 * 1000)
  );
  
  let dateArray = [];
  let index = 0;
  
  while (index <= timerange) {
    const currentDate = new Date(firstDate.getTime() + (index * 24 * 60 * 60 * 1000))
    let hour = 0;
    while (hour <= 24) {
      const date = new Date(
        currentDate.getTime() + hour * 60 * 60 * 1000
      )
      const number = getRandomInt(min, max)
      dateArray.push({date, number})
      hour++
    }
    index++;
  }

  return dateArray
};

export const formatDate = (date, locale) => {
  if (!locale) locale = 'no-NO'
  const options = { day: 'numeric', month: 'numeric', year: '2-digit' }
  return date.toLocaleDateString(locale, options)
}

export const formatTime = (date, locale) => {
  if (!locale) locale = 'no-NO'
  const options = { hour: '2-digit', minute: '2-digit' }
  return date.toLocaleTimeString(locale, options)
}