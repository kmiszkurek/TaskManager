import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {ProjectResponse} from "../../../../services/models/project-response";
import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  template: `<full-calendar [options]="calendarOptions"></full-calendar>`
})
export class CalendarComponent implements OnChanges {
  @Input() projects: ProjectResponse[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: []
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projects'] && this.projects.length > 0) {
      this.calendarOptions.events = this.projects.map(p => ({
        title: p.name ?? 'Brak nazwy',
        start: new Date(p.startDate!).toISOString(),
        end: new Date(p.endDate!).toISOString(),
        className: 'gantt-event',
        extendedProps: {
          description: p.description,
          ownerName: p.ownerName,
          status: p.status
        }
      }));
      console.log(this.calendarOptions.events)
    } else {
      this.calendarOptions.events = [];
    }
  }
}
