import { Component, Input, Output, OnInit, ViewContainerRef, EventEmitter, ViewChild,
    trigger,
    state,
    style,
    animate,
    transition  } from '@angular/core';

import { IUser, ISchedule } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { HighlightDirective } from '../shared/directives/highlight.directive';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'user-card',
    templateUrl: 'user-card.component.html',
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
export class UserCardComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    @Input() user: IUser;
    @Output() removeUser = new EventEmitter();
    @Output() userCreated = new EventEmitter();

    edittedUser: IUser;
    onEdit: boolean = false;
    apiHost: string;
    // Modal properties
    @ViewChild('modal')
    modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    userSchedules: ISchedule[];
    userSchedulesLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;

    constructor(private itemsService: ItemsService,
        private notificationService: NotificationService,
        private dataService: DataService,
        private configService: ConfigService) { }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.edittedUser = this.user;
        if (this.user.id < 0)
            this.editUser();
    }

    editUser() {
        this.onEdit = !this.onEdit;
        this.edittedUser = this.itemsService.getSerialized<IUser>(this.user);
    }

    createUser() {

        var user = this.dataService.createUser(this.edittedUser);
        this.user = user;
                this.edittedUser = user
                this.onEdit = false;
                this.userCreated.emit({ value: user });

        this.notificationService.printSuccessMessage('Created user');
    }

    updateUser() {
        this.dataService.updateUser(this.edittedUser);
                this.user = this.edittedUser;
                this.onEdit = !this.onEdit;
                this.notificationService.printSuccessMessage(this.user.name + ' has been updated');
    }

    openRemoveModal() {
        this.notificationService.openConfirmationDialog('Are you sure you want to remove '
            + this.user.name + '?',
            () => {
                this.dataService.deleteUser(this.user.id)
                        this.removeUser.emit({
                            value: this.user
                        });
            });
    }

    viewSchedules(user: IUser) {
        console.log(user);
        this.notificationService.printSuccessMessage('View Schedules to be implemented');
        // this.dataService.getUserSchedules(this.edittedUser.id)
        //     .subscribe((schedules: ISchedule[]) => {
        //         this.userSchedules = schedules;
        //         console.log(this.userSchedules);
        //         this.userSchedulesLoaded = true;
        //         this.childModal.show();
        //         //this.slimLoader.complete();
        //     },
        //     error => {
        //         //this.slimLoader.complete();
        //         this.notificationService.printErrorMessage('Failed to load users. ' + error);
        //     });
        
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    opened() {
        //this.slimLoader.start();
        this.dataService.getUserSchedules(this.edittedUser.id)
            .subscribe((schedules: ISchedule[]) => {
                this.userSchedules = schedules;
                console.log(this.userSchedules);
                this.userSchedulesLoaded = true;
                //this.slimLoader.complete();
            },
            error => {
                //this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to load users. ' + error);
            });
        this.output = '(opened)';
    }

    isUserValid(): boolean {
        return !(this.edittedUser.name.trim() === "")
            && !(this.edittedUser.profession.trim() === "");
    }

}