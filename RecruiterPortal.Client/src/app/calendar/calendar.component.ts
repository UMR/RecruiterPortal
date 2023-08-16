import { Component, OnInit, ViewChild } from '@angular/core';

import { fifaEventsData } from "./data";
import { extend } from "@syncfusion/ej2-base";
import { EventSettingsModel, ScheduleComponent, GroupModel, TimeScaleModel, ViewsModel } from "@syncfusion/ej2-angular-schedule";
export type UserSchedulerView = any;

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
    public data: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    public selectedDate: Date = new Date(2018, 5, 21);
    public eventSettings: EventSettingsModel = { dataSource: this.data };

    group: GroupModel = { resources: ["Crews"], allowGroupEdit: true };
    //crews = JSON.parse(
    //    `[{"id":21,"name":"Sealcoat Crew 1","crewsDivisionId":6,"isActive":true,"order":0,"color":"#21e70c","divisionName":"The Warehouse","officeId":23},{"id":22,"name":"Sealcoat Crew 2","crewsDivisionId":6,"isActive":true,"order":1,"color":"#ffff00","divisionName":"The Warehouse","officeId":23},{"id":23,"name":"Structural Crew 1","crewsDivisionId":7,"isActive":true,"order":2,"color":"#0080ff","divisionName":"Vance Refrigeration","officeId":23},{"id":24,"name":"Structural Crew 2","crewsDivisionId":7,"isActive":true,"order":3,"color":null,"divisionName":"Vance Refrigeration","officeId":23}]`
    //);
    currentSchedulerView: UserSchedulerView = "week";
    timeScale: TimeScaleModel = { interval: 720, slotCount: 1 };

    @ViewChild("scheduleObj", { static: true }) scheduleObj: ScheduleComponent;

    switchSchedulerView() {
        switch (this.currentSchedulerView) {
            case "day":
                this.scheduleObj.currentView = "Day";
                break;
            case "week":
                (this.scheduleObj.views[1] as any).isSelected = true;
                (this.scheduleObj.views[1] as ViewsModel).interval = 1;
                this.scheduleObj.refresh();
                break;
            case "2week":
                (this.scheduleObj.views[1] as any).isSelected = true;
                (this.scheduleObj.views[1] as ViewsModel).interval = 2;
                this.scheduleObj.refresh();
                break;
            case "month":
                (this.scheduleObj.views[1] as any).isSelected = true;
                (this.scheduleObj.views[1] as ViewsModel).interval = 4;
                this.scheduleObj.refresh();
                break;
            case "crews-week":
                this.scheduleObj.currentView = "TimelineWeek";
                break;
        }
    }
}
