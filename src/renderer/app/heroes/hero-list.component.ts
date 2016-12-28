// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Hero, HeroService }  from './hero.service';
@Component({
  template: `
    <h2>Routing-Test</h2>
    <h4>Click a hero!</h4>
    <ul class="items">
      <li class="item-click list-group-item" *ngFor="let hero of heroes | async"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{ hero.id }}</span> {{ hero.name }}
      </li>
    </ul>
    <button class="btn btn-default" routerLink="/market">Go to Market</button>
  `
})
export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private selectedId: number;
  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.heroes = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getHeroes();
      });
  }
  isSelected(hero: Hero) { return hero.id === this.selectedId; }
  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }
}
