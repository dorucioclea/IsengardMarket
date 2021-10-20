import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {

  }

  public positiveSentiment(text: string): void {
    this.snackBar.open(text, undefined, {
      panelClass: ['blue-snackbar']
    });
  }

  public negativeSentiment(text: string): void {
    this.snackBar.open(text, undefined, {
      panelClass: ['red-snackbar']
    });
  }
}
