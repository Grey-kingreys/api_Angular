import { Component, signal } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Navbar, Footer, RouterModule]
})
export class App {
  protected readonly title = signal('apiRest');
}
