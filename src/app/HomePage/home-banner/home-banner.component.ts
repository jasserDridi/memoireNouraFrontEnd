import { Component } from '@angular/core';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css','../../../assets/css/bootstrap.min.css']
})
export class HomeBannerComponent
{
  descriptionEvent2=" Cette transition vise à moderniser et à transformer les industries tunisiennes en tirant parti des innovations numériques telles que l'internet des objets (IoT), l'intelligence artificielle (IA), la robotique avancée et l'analyse des données."
  descriptionEvent="La 5ème édition du “Tunisia Digital Summit” sera organisée, les 19 et 20 mai 2021, à la fois en présentiel à Tunis et en diffusion en live streaming sur la plateforme “TDS Online Event Platform”, par la société “TPM” (Tunisie Place de Marché SA)";
  descriptionDocker="Le processus automatisé de toutes les tâches de votre site web. Découvrez les outils et techniques "
  descriptionUx="pour une utilisation en production sont un ensemble de recommandations clés pour optimiser l'utilisation de Docker dans des environnements de production.";
    protected readonly sessionStorage = sessionStorage;
}
