function ConvertDate(date) {
  const splitDate = date.split('-');
  let mount = '';
  switch (splitDate[1]) {
    case '01':
      mount = 'January';
      break;
    case '02':
      mount = 'February';
      break;
    case '03':
      mount = 'Marct';
      break;
    case '04':
      mount = 'Apryl';
      break;
    case '05':
      mount = 'Mey';
      break;
    case '06':
      mount = 'June';
      break;
    case '07':
      mount = 'July';
      break;
    case '08':
      mount = 'August';
      break;
    case '09':
      mount = 'September';
      break;
    case '10':
      mount = 'Ocktober';
      break;
    case '11':
      mount = 'November';
      break;
    case '12':
      mount = 'December';
      break;
    default:
      break;
  }
  return `${splitDate[2]} ${mount} ${splitDate[0]}`;
}

module.exports = {
  ConvertDate,
};
