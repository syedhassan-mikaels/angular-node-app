import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private config: MatSnackBarConfig;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 3000;
    this.config.panelClass = ['notify-panel'];
  }

  success(message: string, title: string = '') {
    (<string[]>this.config.panelClass).push('notify-success');
    this.snackBar.open(message, null, this.config);
  }

  error(message: string) {
    (<string[]>this.config.panelClass).push('notify-danger');
    this.snackBar.open(message, null, this.config);
  }
}
