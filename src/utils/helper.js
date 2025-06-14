import moment from "moment";

const convertToIndianCurrency = (paise) => {
    return `₹${paise / 100}`;
};

const formatDate = (date) => {
    return moment(date).format('DD MMM YYYY hh:mm A');
};

export { convertToIndianCurrency, formatDate };