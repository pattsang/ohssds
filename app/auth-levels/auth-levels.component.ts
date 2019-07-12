import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../_service/user.service';
import { LocationService } from '../_service/location.service';

@Component({
  selector: 'app-auth-levels',
  templateUrl: './auth-levels.component.html',
  styleUrls: ['./auth-levels.component.css']
})
export class AuthLevelsComponent implements OnInit {

  authorities;
  @Input() selectedAuthority;
  @Output() selectedAuthorityChange = new EventEmitter();
  newSiteName;
  
  level1Authorities;
  @Input() selectedLevel1Authority;
  @Output() selectedLevel1AuthorityChange = new EventEmitter();

  
  level2Authorities;
  @Input() selectedLevel2Authority;
  @Output() selectedLevel2AuthorityChange = new EventEmitter();

  authorityInput = { 
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null,
    name: ''
  };
  constructor(
    private userService: UserService,
    private locationService: LocationService,
  ) { }

  @Input() topLevel: string;
  ngOnInit() {
    this.getAuthorityNames();
  }

  getAuthorityNames() {
    //console.log('in getauthorityname of invitecomponent ' + this.authorities);
    return this.userService.getAllTopAuthorities().subscribe(res => {
      //console.log(res);
      this.authorities = res;
      //console.log('This is from getAuthorityNames ' + this.selectedAuthority)
      //console.log(res)
    });
  }

  getLevel1DropDown() {
    //console.log()
    return this.userService.level1DropDown(this.selectedAuthority).subscribe(res => {
      this.level1Authorities = res;
      //console.log(res)
    });
  }

  getLevel2DropDown() {
    //console.log()
    return this.userService.level2DropDown(this.selectedLevel1Authority).subscribe(res => {
      this.level2Authorities = res;
      //console.log(res)
    });
  }

  onUserSelectTop() {
    console.log('top level select is ' + this.selectedAuthority);
    this.selectedAuthorityChange.emit(this.selectedAuthority);
    this.getLevel1DropDown();
  }
  onUserSelectLevel1(event) {
    // console.log('from onUserSelectlevel1() function ' + event.value);
    this.selectedLevel1AuthorityChange.emit(this.selectedLevel1Authority);
    console.log('l1 is ' + this.selectedLevel1Authority);
    this.getLevel2DropDown();
  }

  onUserSelectLevel2(event) {
    console.log('from onUserSelectlevel2() function ' + event.value);
    console.log('l2 is ' + this.selectedLevel2Authority);
    this.selectedLevel2AuthorityChange.emit(this.selectedLevel2Authority);
    // this.getLevel3DropDown();
  }

}
