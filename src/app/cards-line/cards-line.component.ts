import {FormationResponse} from "../../service/entities/FormationResponse";
import {FormationService} from "../../service/formation.service";
import {Component, Input, ElementRef, HostListener, ViewChild, OnInit} from '@angular/core';
import {ServiceService} from "../../service/service.service";
import {EventService} from "../../service/event.service";
import {Router} from "@angular/router";
import {PromotionService} from "../../service/promotion.service";
import {PromotionResponse} from "../../service/entity-mapper.service";
import {map, Observable} from "rxjs";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cards-line',
  templateUrl: './cards-line.component.html',
  styleUrls: ['./cards-line.component.css']
})
export class CardsLineComponent implements OnInit {
  @Input() category: string = "";
  @Input() serviceType: string = "";

  cards: any[] = [

  ];
  visibleCards: any[] = [];
  visibleCardCount = 4;
  selectedCardIndex = 0;
  cardTransform = 0;
  ngOnInit(): void {
    this.fetchData()

    // Access the input property values here
    console.log('Category:', this.category);
    console.log('Service Type:', this.serviceType);
  }
  constructor(private promotionSerivce:PromotionService, private fourmationService:FormationService,private eventService:EventService ,private serviceService:ServiceService,private router:Router) {

    console.log(this.cards)
console.log("hhhh",this.category)
  }
  async fetchData() {
    await this.getItemsByCategory(this.category);
    this.updateVisibleCards();
  }
  promotion:PromotionResponse= new PromotionResponse();
  getPromotionalPrice(id: string): Observable<boolean> {
    return this.promotionSerivce.getPromotionsByServiceId(id).pipe(
      tap(value => {
        console.log(value);
        this.promotion = value;
      }),
      map(value => value != null)
    );
  }
  navigateToDetails(id: number): void {
    this.router.navigate(['/itemDetails'],  { queryParams: { id: id, itemType: this.serviceType } });
  }
   async getItemsByCategory(category: string)
  {
    if(this.serviceType ==="SERVICE") {
      try {
        const value = await this.serviceService.getServicesByCategory(category).toPromise();
        console.log(value);
        this.cards = value;
      } catch (error) {
        console.error(error);
      }
    }

    if(this.serviceType ==="FORMATION")
    {
      try {
        const value = await this.fourmationService.getFormationsByCategory(category).toPromise();
        console.log(value);
        this.cards = value;
      } catch (error) {
        console.error(error);
      }
    }
    if(this.serviceType =="EVENT")
    {
      try {
        const value = await this.eventService.getEventsByCategory(category).toPromise();

        console.log(value);
        this.cards = value;
      } catch (error) {
        console.error(error);
      }    }

    for (const valueKey of this.cards) {


      const promotion = await  this.promotionSerivce.getPromotionsByServiceId(valueKey.id).toPromise();
      if(promotion != null)
      {
        console.log('valueKey.prix:', valueKey.prix);
        console.log('promotion.remise:', promotion.pourcentage);
        valueKey.isPromotional=true;
        valueKey.prix = parseFloat(valueKey.prix);
        promotion.pourcentage = parseFloat(String(promotion.pourcentage));
        if (promotion.pourcentage !== 0) {
          valueKey.promotionalPrice = valueKey.prix +((valueKey.prix * promotion.pourcentage) / 100);
        } else {
          valueKey.promotionalPrice = valueKey.prix;
        }
      }
      else
      {
        valueKey.isPromotional=false;
        valueKey.promotionalPrice = valueKey.prix;

      }
    }
    return null;
  }

  scrollCards(direction: 'next' | 'previous') {
    let cardWidth = 400;
    if (direction === 'next') {
      if (this.selectedCardIndex < this.cards.length - 1) {
        this.selectedCardIndex++;
        if (
          this.selectedCardIndex >
          this.cards.length - this.visibleCardCount
        ) {
          this.selectedCardIndex = this.cards.length - this.visibleCardCount;
        }
        this.cardTransform = -this.selectedCardIndex * cardWidth; // Adjust cardWidth to the appropriate value
      }
    } else {
      if (this.selectedCardIndex > 0) {
        this.selectedCardIndex--;
        this.cardTransform = -this.selectedCardIndex * cardWidth; // Adjust cardWidth to the appropriate value
      }
    }
    const cardElements = document.getElementsByClassName('card');

    // Remove the transition class
    for (let i = 0; i < cardElements.length; i++) {
      const cardElement = cardElements[i] as HTMLElement;
      cardElement.classList.remove('card-transition');
    }
    setTimeout(() => {
      // Reapply the transition class
      for (let i = 0; i < cardElements.length; i++) {
        const cardElement = cardElements[i] as HTMLElement;
        cardElement.classList.add('card-transition');
      }
    }, 10);
    this.updateVisibleCards(); // Add this line to update the visible cards
  }

  updateVisibleCards() {
    const endIndex = this.selectedCardIndex + this.visibleCardCount;
    console.log("inside updateVisibleCards"+this.cards)
    this.visibleCards = this.cards.slice(this.selectedCardIndex, endIndex);
    if (this.visibleCards.length < this.visibleCardCount) {
      const startIndex = Math.max(
        0,
        this.selectedCardIndex -
        (this.visibleCardCount - this.visibleCards.length)
      );
      this.visibleCards = this.cards.slice(startIndex, endIndex);
    }
  }

  cardClicked(card: any) {
    console.log('Clicked:', card);
  }


  protected readonly sessionStorage = sessionStorage;
}
