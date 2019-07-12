import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-level3auth',
  templateUrl: './level3auth.component.html',
  styleUrls: ['./level3auth.component.css']
})
export class Level3authComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Fraser Health Authority', 'Coastal Health Authority', 'Vancouver Island Health Authority'];
  //options = this.getLevel3AuthorityNames();
  filteredOptions: Observable<string[]>;
  level3Authorities;
  selectedLevel3Authority;
  constructor(private userService: UserService, private api: ApiService) { }


  ngOnInit() {
    this.level3Authorities = this.getLevel3AuthorityNames();
    
    console.log("this.getleve3auth Init" + this.getLevel3AuthorityNames());
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // private _filter(value: string): string[] {
    private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let returnValues = this.options.filter(option => option.toLowerCase().includes(filterValue));
    //console.log(returnValues);
    return returnValues; //this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getLevel3AuthorityNames() {
    // console.log('in level1authority of invitecomponent ' + this.level3Authorities);
   
     return this.userService.getLevel3AuthorityNames().subscribe(res => {
       //console.log(res);
       this.level3Authorities = res;
     });
   }

}
