import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-dream-app';

  /*@HostListener('window:popstate', ['$event'])
  onPopState($event: { returnValue: string; }) {
    $event.returnValue='Your data will be lost!';
 }*/

  /*subscription: Subscription;

  constructor(private router: Router){
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }*/
}
