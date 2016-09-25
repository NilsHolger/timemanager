export class Init {


    loadUsers() {
        if (localStorage.getItem('users') === null || localStorage.getItem('users') === undefined) {
            console.log('No users found ... Creating ...');
            var users = [
                { id : 1, name: 'Mickey', avatar: 'superman.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 2, name: 'Marc', avatar: 'batman.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 3, name: 'Bob', avatar: 'captainamerica.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 4, name: 'Joe', avatar: 'daredevil.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 5, name: 'Fred', avatar: 'flash.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 6, name: 'Alex', avatar: 'spiderman.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 7, name: 'Mary', avatar: 'catwoman.jpg', profession: 'Software Developer', schedulesCreated: 2 },
                { id : 8, name: 'Barbara', avatar: 'wonderwoman.jpg', profession: 'Software Developer', schedulesCreated: 2 }
            ];

            localStorage.setItem('users', JSON.stringify(users));
            return;
        } else {
            console.log('Found users');
        }
    }

    loadSchedules() {
        if (localStorage.getItem('schedules') === null || localStorage.getItem('schedules') === undefined) {
            console.log('No schedules found ... Creating ...');
            var schedules = [
                { id : 1, creatorId: 1, creator: 'Mickey', title: 'Build a new prototype',
                 description: 'Research and Development',
                 timeStart: '09/23/2016', timeEnd: '09/23/2016', location: 'Berlin' ,type: 'medium' , status: 'done' , dateCreated: '09/23/2016' , dateUpdated: '09/23/2016' ,
                attendees: [{ id : 8, name: 'Barbara', avatar: 'wonderwoman.jpg', profession: 'Software Developer'},
                { id : 7, name: 'Mary', avatar: 'catwoman.jpg', profession: 'Software Developer'},
                { id : 6, name: 'Alex', avatar: 'spiderman.jpg', profession: 'Software Developer'}
                ], 
                statuses: [{status:'begun'}, {status:'work-in-progress'}, {status:'done'}],
                types: [{type: 'low'}, {type:'medium'},{type:'high'}]
                },
                { id : 2, creatorId: 2, creator: 'Marc', title: 'Build a Mobile App',
                 description: 'Research and Development',
                 timeStart: '09/16/2016', timeEnd: '09/16/2016', location: 'Paris' ,type: 'high' , status: 'done' , dateCreated: '09/15/2016' , dateUpdated: '09/15/2016' ,
                attendees: [{ id : 8, name: 'Barbara', avatar: 'wonderwoman.jpg', profession: 'Software Developer'},
                { id : 7, name: 'Mary', avatar: 'catwoman.jpg', profession: 'Software Developer'},
                { id : 6, name: 'Alex', avatar: 'spiderman.jpg', profession: 'Software Developer'}
                ], 
                statuses: [{status:'begun'}, {status:'work-in-progress'}, {status:'done'}],
                types: [{type: 'low'}, {type:'medium'},{type:'high'}]
                },
                  { id : 3, creatorId: 3, creator: 'Bob', title: 'JavaScript Everywhere, Jungle Time',
                 description: 'Research and Development',
                 timeStart: '09/10/2016', timeEnd: '09/10/2016', location: 'Madrid' ,type: 'high' , status: 'done' , dateCreated: '09/09/2016' , dateUpdated: '09/10/2016' ,
                attendees: [{ id : 8, name: 'Barbara', avatar: 'wonderwoman.jpg', profession: 'Software Developer'},
                { id : 7, name: 'Mary', avatar: 'catwoman.jpg', profession: 'Software Developer'},
                { id : 6, name: 'Alex', avatar: 'spiderman.jpg', profession: 'Software Developer'}
                ], 
                statuses: [{status:'begun'}, {status:'work-in-progress'}, {status:'done'}],
                types: [{type: 'low'}, {type:'medium'},{type:'high'}]
                }
                ];

            localStorage.setItem('schedules', JSON.stringify(schedules));
            return;
        } else {
            console.log('Found schedules');
        }
    }


}