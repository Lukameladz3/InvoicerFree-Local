import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Invoicer-Free';
  navHeight: number = 64;

  @ViewChild('navbar') navbar: ElementRef | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.navbar){
      this.navHeight = this.navbar!.nativeElement.offsetHeight;

    }
  }
}
