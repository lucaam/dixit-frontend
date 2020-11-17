import { Component, OnInit } from '@angular/core';
import { MatchModel } from '../classes/matchModel';
import { matchNgService } from '../services/matchNg.service';

@Component({
  selector: 'app-dixitmainpage',
  templateUrl: './dixitmainpage.component.html',
  styleUrls: ['./dixitmainpage.component.scss']
})
export class DixitmainpageComponent implements OnInit {
  Match: MatchModel = new MatchModel();
  constructor(private matchNgService: matchNgService) { }

  ngOnInit(): void {
    this.matchNgService.matchshared.subscribe(match=>{
      this.Match = match;
      console.log(match);
      console.log(this.Match);
    }
      )
  }

}
