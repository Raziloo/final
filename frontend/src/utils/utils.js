export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  export const getPolygonParams = (range) => {
    const today = new Date();
    const fromDate = new Date();
    let multiplier = 1;
    let timespan = 'day';
  
    switch (range) {
      case '1D':
        multiplier = 1;
        timespan = 'minute';
        fromDate.setDate(today.getDate() - 1);
        break;
      case '5D':
        multiplier = 1;
        timespan = 'day';
        fromDate.setDate(today.getDate() - 5);
        break;
      case '1M':
        multiplier = 1;
        timespan = 'day';
        fromDate.setDate(today.getDate() - 30);
        break;
      case '1Y':
        multiplier = 1;
        timespan = 'month';
        fromDate.setFullYear(today.getFullYear() - 1);
        break;
      case '5Y':
        multiplier = 1;
        timespan = 'year';
        fromDate.setFullYear(today.getFullYear() - 5);
        break;
      default:
        throw new Error('Invalid time range');
    }
  
    return {
      multiplier,
      timespan,
      from: formatDate(fromDate),
      to: formatDate(today),
    };
  };
  