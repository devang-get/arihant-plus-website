import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  env = environment
  constructor(public global: GlobalService) { }

  ngOnInit(): void {
  }

}
