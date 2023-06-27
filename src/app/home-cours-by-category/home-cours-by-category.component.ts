import { Component,HostListener, ViewChild, ElementRef  } from '@angular/core';
import {Router} from "@angular/router";
import {FormationResponse} from "../../service/entities/FormationResponse";
import {FormationService} from "../../service/formation.service";

@Component({
  selector: 'app-home-cours-by-category',
  templateUrl: './home-cours-by-category.component.html',
  styleUrls: ['./home-cours-by-category.component.css','../../assets/css/bootstrap.min.css']
})
export class HomeCoursByCategoryComponent {
  creativeArts: any;

  protected readonly sessionStorage = sessionStorage;
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalCards: number = this.arr.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef | undefined;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
    10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
    10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container?.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
    (this.currentPage - 1)}px)`;
  }
  constructor(private router:Router,private formationService:FormationService) {
    this.cardsPerPage=4;
    this.totalPages=2;
    this.overflowWidth="4";
    this.cardWidth="600px";
    this.containerWidth=600;

    this.getCoursByCategoryCreativeArtsAndDesign("Arts créatifs et Design");

  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goLogin() {
    this.router.navigate(['/login'])

  }
  getCoursByCategoryCreativeArtsAndDesign(category : string)
  {
    this.formationService.getFormationsByCategory(category)
        .subscribe(value =>{ this.creativeArts=value;    console.log(value)} );
  }
}
