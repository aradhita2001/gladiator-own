import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  accountId: number=0;
  constructor(private route:ActivatedRoute){}
 
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.accountId=params['id'];
    })
  }
}
