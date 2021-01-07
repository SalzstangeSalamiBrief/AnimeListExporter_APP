"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create a date-string (yyyy_mm_dd) based on the current date
 */
function calcDate() {
    const currentDate = (new Date()).toLocaleDateString('en-GB', { timeZone: 'UTC' });
    const formattedDate = currentDate.split('/').reverse().join('_');
    return formattedDate;
}
exports.default = calcDate;
//# sourceMappingURL=calculate-date.js.map