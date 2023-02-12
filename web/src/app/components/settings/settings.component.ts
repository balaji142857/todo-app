import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  labels: any[] = [];

  constructor(private service : RestService) { }

  ngOnInit(): void {
    this.service.labels().subscribe(data => this.labels = data,console.log);
  }

  formControl = new FormControl(['tags']);

  addTagFromInput(event: MatChipInputEvent) {
    if (!event.value) {
      console.log("nothing to save");
      return;
    }
    this.service.addTag({id: undefined, value: event.value}).subscribe(
      val => {
        this.labels.push(val);
        event.chipInput!.clear();
      },
      err => console.log
    );
  }

  removeTag(tagName: string) {
    var index = this.labels.indexOf(tagName);
    if (index < 0) {
      console.log("nothing to delete");
      return;
    }
    
    this.service.removeTag(this.labels[index]).subscribe(
      val =>  this.labels.splice(index, 1),
      err => console.log()
    )
    
  }

}
