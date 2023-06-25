export class UserResponse {
  id:string ="";
  nom: string = "";
  prenom: string = "";
  email: string="";
  password: string=""
  role: UserRole =  UserRole.ADMIN;

}
export enum UserRole
{
  CLIENT,PRESTATAIRE,ADMIN
}
