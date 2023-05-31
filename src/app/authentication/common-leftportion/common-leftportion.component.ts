import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { SharedVarService } from 'src/app/services/sharedVar.service';

@Component({
  selector: 'app-common-leftportion',
  templateUrl: './common-leftportion.component.html',
  styleUrls: ['./common-leftportion.component.scss']
})
export class CommonLeftportionComponent implements OnInit {
  contentData: any;
  constructor(
    public global: GlobalService,
    private sharedVarService: SharedVarService
  ) {

  }

  ngOnInit(): void {
    this.sharedVarService.getSiteContentData().subscribe((res: any) => {
      this.contentData = res;
    });
  }

}
