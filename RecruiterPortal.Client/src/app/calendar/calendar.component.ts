import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService } from './calendar.service';
import * as jsonData from './data.json';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    events: any[];
    options: any;

    constructor(private calendarService: CalendarService) { }

    ngOnInit() {
        console.log(jsonData);
        this.events = jsonData.data;
        console.log(this.events);
        //this.calendarService.getEvents().subscribe(res => {
        //    console.log(res);
        //    //this.events = events
        //});

        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2017-02-01',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true
        };
    }
}
