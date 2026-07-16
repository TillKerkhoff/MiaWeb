import { Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule]
})
export class HomeComponent  {

  constructor(private router: Router) {}

  onCardClick(): void {
    console.log('Die Mat-Card wurde angeklickt! - weiterleitung zur AboutMe-Seite');
    this.router.navigate(['/aboutMe']);
  }

}