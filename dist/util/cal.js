"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calcNewStatus(status = 'PLANNING', listType = 'ANIME') {
    let calculatedStatus = '';
    const currentStatus = status.toUpperCase();
    switch (currentStatus) {
        case 'PAUSED':
            calculatedStatus = 'On-Hold';
            break;
        case 'PLANNING':
            calculatedStatus = listType === 'ANIME' ? 'Plan to Watch' : 'Plan to Read';
            break;
        case 'CURRENT':
            calculatedStatus = listType === 'ANIME' ? 'Watching' : 'Reading';
            break;
        case 'DROPPED':
            calculatedStatus = 'Dropped';
            break;
        default:
            calculatedStatus = 'Completed';
            break;
    }
    return calculatedStatus;
}
exports.default = calcNewStatus;
//# sourceMappingURL=cal.js.map