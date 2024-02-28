export class User {
    username:string;
    password:string;
    role:string;
    name:string;
    email:string;
    phone:string
 
  constructor(data: any) {
    // if(this.accountId)
    this.username=data.username;
    this.password=data.password;
    this.role=data.role;
    this.name=data.name;
    this.email=data.email;
    this.phone=data.phone;
}
}