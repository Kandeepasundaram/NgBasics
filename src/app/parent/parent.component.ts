import { Component, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  users: any[];
  constructor(private sampleService: SampleServiceService) {}

  forC1: string;
  forC2: string;

  ngOnInit() {
    this.sampleService.getSampleChildrenData().subscribe(x => {
      this.forC1 = this.filterResponse(x, 'child1');
      this.forC2 = this.filterResponse(x, 'child2');
    });

    this.sampleService.getAllUsers().subscribe((data: any[]) => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!^^^^^^^^^^^^^^^^^^^^^^^");
      console.log(data);
      this.users = data;
    });
  }

  filterResponse(array: any[], filterText: string) {
    return array.find(element => {
      return element.dataFor === filterText;
    }).test;
  }
}
