import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // datasource: new MatTableDataSource(ELEMENT_DATA);
  // ngOnInit(){
  //   this.datasource.paginator = this.paginator;
  //   this.
  // }
  editCustomer():void{
    // this.router.navigate(['/bank/customer/edit', { customerId: customer.customerId,name:customer.name,email:customer.email,username:customer.username, password:customer.password,role:customer.role }]);
 
  }
  deteteCustomer(){
 
  }

  viewDetails(){}
}
