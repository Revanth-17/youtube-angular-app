import { Component } from '@angular/core';
// import { Activity } from '../../models/activity.model';
// import { ActivityService } from '../../services/activity.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe(data => {
      this.activities = data;
    });
  }
}
