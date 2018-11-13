import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FriendshipService } from '../../services/friendship.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css'],
  providers: [AuthService, FriendshipService],
})
export class AddfriendComponent implements OnInit {
  research: string;
  researchedUsers: User[];
  friendUsers: User[];
  requestedUsers: User[];

  constructor(private authService: AuthService, private friendshipService: FriendshipService, private router: Router) { }

  findFriend(research) {
    this.authService.findFriend(research)
      .subscribe(users => {
        console.log(users);
        users.forEach(user => {
          this.getFriendshipStatus(user._id).then((status) => {
            user.status = status;
          });
        });
        this.researchedUsers = users;
      });
  }

  buttonAction(status, id, int) {
    console.log(int);
    if (status === 'Add friend') {
      this.friendshipService.sendRequest(id).subscribe(message => {
        this.researchedUsers[int].status = 'Cancel friend request';
        console.log(message);
      });
    } else if (status === 'Cancel friend request') {
      this.friendshipService.deleteFriendship(id).subscribe(message => {
        this.researchedUsers[int].status = 'Add friend';
        console.log(message);
      });
    } else if (status === 'Accept friend request') {
      this.friendshipService.acceptFriendRequest(id).subscribe(message => {
        this.researchedUsers[int].status = 'Delete from your friends';
        this.friendUsers.push(this.researchedUsers[int]);
        console.log(message);
      });
    } else if (status === 'Delete from your friends') {
      this.friendshipService.deleteFriendship(id).subscribe(message => {
        this.researchedUsers[int].status = 'Add friend';
        let index = 0;
        let toDeleteIndex;
        this.friendUsers.forEach(friend => {
          if (friend._id === id) {
            toDeleteIndex = index;
          }
          index += 1;
        });
        this.friendUsers.splice(toDeleteIndex, 1);
        console.log(message);
      });
    } else {
      console.log('error');
    }
  }

  acceptFriendRequest(id, int) {
    this.friendshipService.acceptFriendRequest(id).subscribe(message => {
      this.friendUsers.push(this.requestedUsers[int]);
      this.requestedUsers.splice(int, 1);
      console.log(message);
    });
  }

  declineFriendRequest(id, int) {
    this.friendshipService.deleteFriendship(id).subscribe(message => {
      this.requestedUsers.splice(int, 1);
      console.log(message);
    });
  }

  deleteFriendship(id, int) {
    this.friendshipService.deleteFriendship(id).subscribe(message => {
      this.friendUsers.splice(int, 1);
      console.log(message);
    });
  }

  getFriendshipStatus(second_id) {
    return new Promise((resolve, reject) => {
      let result;
      this.friendshipService.getFriendship(second_id)
        .subscribe(friendships => {
          if (friendships.length === 0) {
            result = 'Add friend';
          } else if (friendships.length === 1) {
            if (friendships[0].status === 'RequestSent' && friendships[0].first_id === second_id) {
              result = 'Accept friend request';
            } else if (friendships[0].status === 'RequestSent' && friendships[0].second_id === second_id) {
              result = 'Cancel friend request';
            } else {
              result = 'Delete from your friends';
            }
          } else {
            reject();
          }
          // console.log(result);
          // return result;
          resolve(result);
        });
    });
  }

  getFriends () {
    this.friendshipService.getFriends()
      .subscribe((friendships) => {
        let friendIDs = '';
        friendships.forEach(friendship => {
          if (friendship.first_id === localStorage.getItem('USER_ID')) {
            friendIDs = friendIDs + friendship.second_id + ' ';
          } else {
            friendIDs = friendIDs + friendship.first_id + ' ';
          }
        });
        if (friendIDs.length > 0) {
          this.authService.getUsers(friendIDs.slice(0, -1)).subscribe((users) => {
            console.log(users);
            this.friendUsers = users;
          });
        }
  });
}

  getFriendRequests () {
    this.friendshipService.getFriendRequests()
      .subscribe((friendships) => {
        let requestIDs = '';
        friendships.forEach(friendship => {
          requestIDs = requestIDs + friendship.first_id + ' ';
        });
        if (requestIDs.length > 0) {
          this.authService.getUsers(requestIDs.slice(0, -1)).subscribe((users) => {
            console.log(users);
            this.requestedUsers = users;
          });
        }
      });
  }

  ngOnInit() {
    this.friendUsers = [];
    this.requestedUsers = [];
    this.getFriends();
    this.getFriendRequests();
  }
}
