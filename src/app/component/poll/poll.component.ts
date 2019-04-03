import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PollService } from '../../service/poll.service';
import { ModalDirective } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  pollData: any = [];
  pollDetails: any = {};
  @ViewChild('pollDetail') pollDetail: ModalDirective;

  constructor(private spinner: NgxSpinnerService, private poll: PollService) { }

  ngOnInit() {
    this.getPollList();
    setInterval(() => {
      this.getPollList();
    }, 10000);
  }
  getPollList() {
    this.spinner.show();
    this.poll.getPollData().subscribe(data => {
      this.pollData = this.pollData.concat(data["hits"]);
      this.spinner.hide();
    });
  }
  OpenModel(item: any) {
    this.pollDetail.show();
    this.pollDetails = item;
    
  }

}
