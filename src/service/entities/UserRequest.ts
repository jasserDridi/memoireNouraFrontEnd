export class UserRequest {
  nom: string = "";
  prenom: string = "";
  email: string="";
  password: string=""
  numeroTel: string=""
  lieu: string=""
  role:UserRole=UserRole.CLIENT;

}
export enum UserRole
{
  CLIENT,PRESTATAIRE,ADMIN
}
