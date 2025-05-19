import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  darkMode: boolean = false;

  constructor() {
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(this.darkMode);
  }

  toggleDarkMode(event: any) {
    this.darkMode = event.checked;
    this.setDarkMode(this.darkMode);
  }

  private setDarkMode(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
