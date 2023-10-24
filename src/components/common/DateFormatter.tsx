const formatDate = (dateString: string) => {
  const inputDate = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const ordinalSuffix: { [key: number]: string } = {
    1: "st",
    2: "nd",
    3: "rd",
    21: "st",
    22: "nd",
    23: "rd",
    31: "st",
  };

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];
  const year = inputDate.getFullYear();
  const daySuffix = ordinalSuffix[day] || "th";
  return `${month} ${day}${daySuffix}, ${year}`;
};

export default formatDate;
