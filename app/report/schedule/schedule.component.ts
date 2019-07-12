import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  selectedAuthority;
  selectedLevel1Authority;
  selectedLevel2Authority;
  constructor() { }

  ngOnInit() {
  }

  onReceivedTopLevel(topAuth)
  {
    console.log('got it ' + topAuth);
  }

  onReceivedLevel1(level1Auth) {
    console.log("got l1 " + level1Auth);
  }

  onReceivedLevel2(level2Auth) {
    console.log("got l2 " + level2Auth);
    console.log("what do we have for selectedLevel2Authority " + this.selectedLevel2Authority);
  }

}
