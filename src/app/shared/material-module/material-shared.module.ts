import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule
  ],
})
export class MaterialModule { }
