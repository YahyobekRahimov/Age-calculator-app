const DAY_LABEL = document.getElementById("input-day-label");
const DAY_INPUT = document.getElementById("input-day");
const DAY_ERROR_MESSAGE = document.getElementById("error-message--day");

const MONTH_LABEL = document.getElementById("input-month-label");
const MONTH_INPUT = document.getElementById('input-month');
const MONTH_ERROR_MESSAGE = document.getElementById("error-message--month");

const YEAR_LABEL = document.getElementById("input-year-label");
const YEAR_INPUT = document.getElementById("input-year");
const YEAR_ERROR_MESSAGE = document.getElementById("error-message--year");

const CURRENT_YEAR = 2023;
const CURRENT_MONTH = 10;
const CURRENT_DATE = 15;

function inputValidation() {
    const BIRTH_DATE = DAY_INPUT.value;
    const BIRTH_MONTH = MONTH_INPUT.value;
    const BIRTH_YEAR = YEAR_INPUT.value;

    if (BIRTH_YEAR == "") {
        YEAR_LABEL.style.color = "rgb(230, 54, 54)";
        YEAR_INPUT.style.border = "1px solid rgb(230, 54, 54)";
        YEAR_ERROR_MESSAGE.innerHTML = "This field is required";
    }
    if (BIRTH_MONTH == "") {
        MONTH_LABEL.style.color = "rgb(230, 54, 54)";
        MONTH_INPUT.style.border = "1px solid rgb(230, 54, 54)";
        MONTH_ERROR_MESSAGE.innerHTML = "This field is required";
    }
    if (BIRTH_DATE == "") {
        DAY_LABEL.style.color = "rgb(230, 54, 54)";
        DAY_INPUT.style.border = "1px solid rgb(230, 54, 54)";
        DAY_ERROR_MESSAGE.innerHTML = "This field is required";
    }
    if (isNaN(BIRTH_YEAR) || BIRTH_YEAR > 2023) {
        errorMessageYear();
    }
    if (isNaN(BIRTH_MONTH) || BIRTH_MONTH > 12) {
        errorMessageMonth();
    }
    if (isNaN(BIRTH_DATE) || BIRTH_DATE > 31) {
        let invalidDate = false;
        errorMessageDay(invalidDate);
    } else if (BIRTH_DATE > monthValidDateChecker(BIRTH_MONTH)) {
        let invalidDate = true;
        errorMessageDay(invalidDate);
        return;
    }
    // now we need to check if the entered date is not after the current date;
    if (CURRENT_YEAR == BIRTH_YEAR) {
        if (CURRENT_MONTH < BIRTH_MONTH) {
            MONTH_ERROR_MESSAGE.innerHTML = "Must be in the past";

            DAY_LABEL.style.color = "rgb(230, 54, 54)";
            MONTH_LABEL.style.color = "rgb(230, 54, 54)";
            YEAR_LABEL.style.color = "rgb(230, 54, 54)";
            DAY_INPUT.style.border = "1px solid rgb(230, 54, 54)";
            MONTH_INPUT.style.border = "1px solid rgb(230, 54, 54)";
            YEAR_INPUT.style.border = "1px solid rgb(230, 54, 54)";
            return;
        } else if (CURRENT_MONTH == BIRTH_MONTH) {
             if (CURRENT_DATE <= BIRTH_DATE) {
                MONTH_ERROR_MESSAGE.innerHTML = "Must be in the past";
                DAY_LABEL.style.color = "rgb(230, 54, 54)";
                MONTH_LABEL.style.color = "rgb(230, 54, 54)";
                YEAR_LABEL.style.color = "rgb(230, 54, 54)";
                DAY_INPUT.style.border = "1px solid rgb(230, 54, 54)";
                MONTH_INPUT.style.border = "1px solid rgb(230, 54, 54)";
                YEAR_INPUT.style.border = "1px solid rgb(230, 54, 54)";
                return;
            }
        }
    } 
    ageCalculation();
}

/**
 * What this function does is determine if a date suits a year. For example,
 * February doesn't have 31 days. So if user were to enter 31 for february, it will give an error.
 */
function monthValidDateChecker(monthIndex) {
    switch (parseInt(monthIndex)) {
        case 1:
            return 31;
        case 2:
            return isLeapYear();
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
        default:
        return NaN;
    }
}

function isLeapYear() {
    const BIRTH_YEAR = parseInt(YEAR_INPUT.value);
    if (BIRTH_YEAR % 4 == 0) {
        if (BIRTH_YEAR % 100 == 0 && BIRTH_YEAR % 400 != 0) {
            return 28;
        } else {
            return 29;
        }
    } else {
        return 28;
    }
}  


function errorMessageDay(invalidDate) {
    DAY_LABEL.style.color = "rgb(230, 54, 54)";
    DAY_INPUT.style.border = "1px solid rgb(230, 54, 54)";
    // We have two kind of error messages: 1. valid date 2. valid day;
    // Depending on the invalidDate's value, I am going to give user the message
    if (invalidDate) {
    DAY_ERROR_MESSAGE.innerHTML = "Must be a valid date";
    MONTH_LABEL.style.color = "rgb(230, 54, 54)";
    MONTH_INPUT.style.border = "1px solid rgb(230, 54, 54)"
    YEAR_LABEL.style.color = "rgb(230, 54, 54)";
    YEAR_INPUT.style.border = "1px solid rgb(230, 54, 54)"
    } else {
        DAY_ERROR_MESSAGE.innerHTML = "Must be a valid day";
    }

}

function errorMessageMonth() {
    MONTH_LABEL.style.color = "rgb(230, 54, 54)";
    MONTH_INPUT.style.border = "1px solid rgb(230, 54, 54)";
    MONTH_ERROR_MESSAGE.innerHTML = "Must be a valid month";
}

function errorMessageYear() {
    YEAR_LABEL.style.color = "rgb(230, 54, 54)";
    YEAR_INPUT.style.border = "1px solid rgb(230, 54, 54)";
    YEAR_ERROR_MESSAGE.innerHTML = "Must be in the past"
}

function ageCalculation() {
    let yearsLived = CURRENT_YEAR - +YEAR_INPUT.value; 
    let monthsLived = CURRENT_MONTH - +MONTH_INPUT.value; 
    let daysLived = CURRENT_DATE - +DAY_INPUT.value; 
    const YEARS_OUTPUT = document.getElementById("result--year");
    const MONTHS_OUTPUT = document.getElementById("result--months");
    const DAYS_OUTPUT = document.getElementById("result--days");
    if (daysLived < 0) {
        monthsLived--;
        daysLived += 31;
    }
    if (monthsLived < 0) {
        yearsLived--;
        monthsLived += 12;
    }
    YEARS_OUTPUT.innerHTML = yearsLived;
    MONTHS_OUTPUT.innerHTML = monthsLived;
    DAYS_OUTPUT.innerHTML = daysLived;
}