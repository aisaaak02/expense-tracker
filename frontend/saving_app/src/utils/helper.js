export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const names = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(names.length, 2); i++) {
        initials += names[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (number) => {
    if (number == null || isNaN(number)) return "";

    const [integerPart, decimalPart] = number.toString().split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};



export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
};

export const prepareIncomeBarChartData = (data = [] ) => {
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    const chartData = sortedData.map((item) => ({
        month: FaMonument(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
};

