import {Calendar, dateFnsLocalizer} from  "react-big-calendar";
import format from  'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import '../style/calendar.css';


export const Schedule = () =>
{

    const locales = {
        "en-us": require('date-fns/locale/en-US')
    }

    const localizer = dateFnsLocalizer(
        {
            format,
            parse,
            startOfWeek,
            getDay,
            locales
        }
    )

    const events = [
        {
            title:  "Big Meeting",
            allDay: false,
            start: new Date(2022, 9, 1, 12),
            end: new Date(2022, 9, 1, 13)
        },
        {
            title:  "Vacation",
            allDay: true,
            start: new Date(2022, 9, 3),
            end: new Date(2022, 9, 3)
        },
        {
            title:  "Conference",
            allDay: true,
            start: new Date(2022, 9, 2),
            end: new Date(2022, 9, 2)
        }
    ]
        

    return (
        <>
            <div 
            className="page flex items-center justify-center"
            >
                <Calendar 
                className="h-[550px] w-[350px] md:w-[650px]"
                endAccessor="end"
                events={events}
                localizer={localizer}
                startAccessor="start"
                />
            </div>
        </>
    )
}