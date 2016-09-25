import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IUser, ISchedule, IScheduleDetails, Pagination, PaginatedResult } from '../interfaces';
import { ItemsService } from '../utils/items.service';
import { ConfigService } from '../utils/config.service';
import { Init } from '../data/initialize';

@Injectable()
export class DataService extends Init {

    _baseUrl: string = '';

    constructor(private http: Http,
        private itemsService: ItemsService,
        private configService: ConfigService) {
        super();
        this._baseUrl = configService.getApiURI();

        this.loadUsers();
        this.loadSchedules();
    }

    getUsers() {
        var users = JSON.parse(localStorage.getItem('users'));
        return users;
    }

    getUserSchedules(id: number): Observable<ISchedule[]> {
        return this.http.get(this._baseUrl + 'users/' + id + '/schedules')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    createUser(user: IUser): IUser {

        var users = JSON.parse(localStorage.getItem('users'));
        var min = 10;
        var max = 100;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        user.id = random;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;

    }

    updateUser(user: IUser): void {

        var users = JSON.parse(localStorage.getItem('users'));
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i].name = user.name;
                users[i].profession = user.profession;

            }
        }
        localStorage.setItem('users', JSON.stringify(users));

    }

    deleteUser(id: number): void {
        var users = JSON.parse(localStorage.getItem('users'));
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users.splice(i, 1);
            }
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    getSchedules(page?: number, itemsPerPage?: number): ISchedule[] {

        var schedules = JSON.parse(localStorage.getItem('schedules'));
        return schedules;
    }


    getSchedule(id: number): Observable<ISchedule> {
        return this.http.get(this._baseUrl + 'schedules/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getScheduleDetails(id: number): IScheduleDetails {
        var schedules = JSON.parse(localStorage.getItem('schedules'));
        for (var i = 0; i < schedules.length; i++) {
            if (schedules[i].id === id) {
                return schedules[i];
            }
        }
    }

    updateSchedule(schedule: ISchedule): Observable<void> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this._baseUrl + 'schedules/' + schedule.id, JSON.stringify(schedule), {
            headers: headers
        })
            .map((res: Response) => {
                //return;
            })
            .catch(this.handleError);
    }

    deleteSchedule(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'schedules/' + id)
            .map((res: Response) => {
                //return;
            })
            .catch(this.handleError);
    }

    deleteScheduleAttendee(id: number, attendee: number) {

        return this.http.delete(this._baseUrl + 'schedules/' + id + '/removeattendee/' + attendee)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
}