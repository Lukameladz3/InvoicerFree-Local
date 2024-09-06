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
  navHeight: number = 0;

  @ViewChild('myIdentifier') myIdentifier: ElementRef | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.navHeight = this.myIdentifier!.nativeElement.offsetHeight;
  }
}
