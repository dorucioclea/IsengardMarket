import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from 'src/app/core/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss']
})
export class SearchNavbarComponent implements OnInit, OnDestroy {
  @Input() initalStyle: 'black' | 'white' = 'black';
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.main-container') as HTMLElement;
    //it means that if the scroll is higher than the heght of our component(70px)  - 35px apply the style of scrolled navbar
    if (window.scrollY > element.clientHeight - 35) {
      element.classList.add('navbar-scrolled');
    } else {
      element.classList.remove('navbar-scrolled');
    }
  }
  navbarOpened: boolean = false;
  public currentProfile: Profile | undefined;
  public isLoggedIn: boolean;
  destroyed = new Subject<void>();
  currentScreenSize!: string;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentProfile = this.authService.currentProfileValue;
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          console.log(this.currentScreenSize);
          if (this.currentScreenSize === 'Medium') {
            this.navbarOpened = false;
          }
        }
      }
    });
  }

  ngOnInit(): void {
    // add scrolled navbar if scrolled more than 15 px
    if (window.scrollY > 15) {
      setTimeout(() => {
        let element = document.querySelector('.main-container') as HTMLElement;
        element.classList.add('navbar-scrolled');
      }, 0)
    }
  }

  toggleNavbar(): void {
    this.navbarOpened = !this.navbarOpened;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

