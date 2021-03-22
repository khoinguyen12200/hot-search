import { format } from 'date-fns';
import notFoundImage from '../icons/not-found-image.png';

var dateFormat = require('dateformat');
export function getIdFromSearch(search) {
    return search.split("?id=").length >= 1 ? search.split("?id=")[1] : "";
}

export function formatNumbers(number) {
    var num = number.toString();
    var str = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    str = str.replace("M+", " Triệu").replace("K+", " Ngàn");
    return str;
}

export function getdatesql(date) {
    var d = new Date(date);
    var str = format(d, 'yyyyMMdd');
    return str;
}
export function getDayOfWeek(date) {
    var d = new Date(date);
    var newdate = format(d, 'dd/MM/yyyy');

    var dow = d.getDay();
    switch (dow) {
        case 0:
            dow = "Chủ nhật";
            break;
        case 1:
            dow = "Thứ hai";
            break;
        case 2:
            dow = "Thứ ba";
            break;
        case 3:
            dow = "Thứ tư";
            break;
        case 4:
            dow = "Thứ năm";
            break;
        case 5:
            dow = "Thứ sáu";
            break;
        case 6:
            dow = "Thứ bảy";
            break;
    };
    return dow + " - Ngày " + newdate;
}
var theme = {};
theme.light = "light-theme";
theme.dark = "dark-theme";
export var theme;
export function getThemeName() {
    var app = document.getElementById("app-root");
    var clName = app.className;

    var light = theme.light;
    var dark = theme.dark;

    if (clName.includes(light)) {
        return light;
    } else if (clName.includes(dark)) {
        return dark;
    } else {
        return "";
    }
}

export function isMobile() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

export const myDomainName = "https://hotsearchviet.online/";

export const EMAIL = "admin@hotsearchviet.online";

export const FACEBOOK_APP_ID = "174600884477732";

export function getHotSearchUrl(id){
    return `${myDomainName}/hotsearch?id=` + id;
}
export function getHotSearchDateUrl(date){
    return `${myDomainName}/daily-hotsearch?date=` + getdatesql(date);
}

export function formatDate(date) {
    return dateFormat(date, "yyyy-mm-dd");
}

export function getVariableFromSearch(search,variableName){
    var str = search ? search.slice(1) : "";
    var arr = str.split("&");
    for(let i in arr){
        var couple = arr[i];
        var splitCouple = couple.split('=');
        if(splitCouple.length > 1 && splitCouple[0] == variableName){
            return splitCouple[1];
        }
    }
    return null;
}

export function checkImageUrl(url){

    if(url){
        return url;
    }
    return notFoundImage;
}