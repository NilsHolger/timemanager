import { Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { DataService } from '../shared/services/data.service';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { ISchedule, IScheduleDetails, Pagination, PaginatedResult } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'app-schedules',
    templateUrl: 'schedule-list.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class ScheduleListComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    schedules: ISchedule[];
    apiHost: string;

    public itemsPerPage: number = 2;
    public totalItems: number = 0;
    public currentPage: number = 1;

    // Modal properties
    @ViewChild('modal')
    modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    selectedScheduleId: number;
    scheduleDetails: IScheduleDetails;
    selectedScheduleLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;

    constructor(
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService) { }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadSchedules();
    }

    loadSchedules() {
        this.loadingBarService.start();
        var schedules = this.dataService.getSchedules(this.currentPage, this.itemsPerPage);
        this.schedules = schedules;// schedules;
        this.totalItems = schedules.length;
        this.loadingBarService.complete();
        this.notificationService.printSuccessMessage('Loaded schedules.');
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadSchedules();
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };

    removeSchedule(schedule: ISchedule) {
        this.notificationService.openConfirmationDialog('Are you sure you want to delete this schedule?',
            () => {
                this.loadingBarService.start();
                this.notificationService.printSuccessMessage('Delete schedule in localstorage to be implemented.');
                // this.dataService.deleteSchedule(schedule.id)
                //     .subscribe(() => {
                //         this.itemsService.removeItemFromArray<ISchedule>(this.schedules, schedule);
                //         this.notificationService.printSuccessMessage(schedule.title + ' has been deleted.');
                //         this.loadingBarService.complete();
                //     },
                //     error => {
                //         this.loadingBarService.complete();
                //         this.notificationService.printErrorMessage('Failed to delete ' + schedule.title + ' ' + error);
                //     });
            });
    }

    viewScheduleDetails(id: number) {
        this.selectedScheduleId = id;

        var schedule = this.dataService.getScheduleDetails(this.selectedScheduleId);
        this.scheduleDetails = schedule;
        this.loadingBarService.complete();
        this.selectedScheduleLoaded = true;
        this.childModal.show();//.open('lg');
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}