function getDay(date) { 
    let day = date.getDay();
    if (day == 0) day = 7;
    return day;
}


let monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

let calendar= document.createElement('table');

function createCalendar(year,month) {

    let mon = month - 1; /*приводим в формат от 0 до 11*/
    let dateUser= new Date(year, mon);

    let titleMonth= monthNames[dateUser.getMonth()];

    let table='<tr><th><button id="prev-year"><<</button></th><th><button id="prev-month"><</button></th><th colspan="2" id="month">'+ titleMonth + '</th><th id="year">'+ year+'</th><th><button id="next-month">></button></th><th><button id="next-year">>></button></th></tr><tr>';

    /* с понедельника до первого дня текущего месяца*/  
    let prevMonthDays=new Date(dateUser.getFullYear(), dateUser.getMonth(),0).getDate(); 
    for (let i = getDay(dateUser); i>1; i--) {
        table += `<td class="prev-month-days">${prevMonthDays-i+2}</td>`;
    }   

    for (let i = 1; i <= dateUser.getDate(); i++) {
        table += '<td>' + dateUser.getDate() + '</td>';
         if (getDay(dateUser) == 7){ /*если вскр переход на новую строку - конец недели*/
            table += '</tr><tr>';
        }
        dateUser.setDate(dateUser.getDate() + 1);/* увеличиваем день месяца на 1, начиная с первого дня выбранного месяца*/
    }

    /*первые дни следующего месяца*/  
    let nextMonthDays=new Date(dateUser.getFullYear(), dateUser.getMonth(),1).getDay(); 
       if(nextMonthDays!==0){
            for(let i=1; i<=7-nextMonthDays+1; i++){
                 table += `<td class="next-month-days">${i}</td>`;
            }
       } else {
            table += `<td class="next-month-days">1</td>`;
       }


    table += '</tr>';
    calendar.innerHTML= table;
    document.body.append(calendar);

    let yearContainer=document.getElementById("year");
    let monthContainer=document.getElementById("month");

    let prevYear=document.getElementById("prev-year");
    prevYear.onclick = function () {
        let curDate = new Date(yearContainer.textContent,monthNames.indexOf(monthContainer.textContent)+1);
        curDate.setFullYear(curDate.getFullYear() - 1);
        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();
        createCalendar(curYear,curMonth);
    }

    let prevMonth=document.getElementById("prev-month");
    prevMonth.onclick = function () {
        let curDate = new Date(yearContainer.textContent,monthNames.indexOf(monthContainer.textContent)+1);
        curDate.setMonth(curDate.getMonth() - 1);
        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();
        createCalendar(curYear,curMonth);
    }    

    let nextYear=document.getElementById("next-year");
    nextYear.onclick = function () {
        let curDate = new Date(yearContainer.textContent,monthNames.indexOf(monthContainer.textContent)+1);
        curDate.setFullYear(curDate.getFullYear() + 1);
        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();
        createCalendar(curYear,curMonth);
    }

    let nextMonth=document.getElementById("next-month");
    nextMonth.onclick = function () {
        let curDate = new Date(yearContainer.textContent,monthNames.indexOf(monthContainer.textContent)+1);
        curDate.setMonth(curDate.getMonth() + 1);
        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();
        createCalendar(curYear,curMonth);
    }    
} 

let monthUser=prompt('Введите пожалуйста номер месяца');
let yearUser=prompt('Введите пожалуйста год');

let result=createCalendar(yearUser,monthUser);
