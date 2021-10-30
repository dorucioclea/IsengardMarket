import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedClassicModule } from './shared/shared-classic.module';
import { HomeComponent } from './features/home/home.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { ActivityPageComponent } from './features/activity-page/activity-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NFTPageModule } from './features/nft-page/nft-page.module';
import { ArtistPageModule } from './features/artist-page/artist-page.module';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketComponent } from './features/market/market.component';
import { ProfileEditComponent } from './features/profile-edit/profile-edit.component';
import { CreateNFTComponent } from './features/create-nft/create.-nft.component';
import { CollectionPageModule } from './features/collection-page/collection-page.module';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';
import { AuthGuardMaintenance } from './core/guards/auth-guard.service';
import { MaterialModule } from './shared/material-module/material-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // TODO transform those in modules when they get bigger
    HomeComponent,
    AboutPageComponent,
    ActivityPageComponent,
    ActivityPageComponent,
    LoginComponent,
    LogoutComponent,
    CreateNFTComponent,
    MarketComponent,
    ProfileEditComponent,
    MaintenanceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedClassicModule,
    HttpClientModule,
    ArtistPageModule,
    NFTPageModule,
    ReactiveFormsModule,
    CollectionPageModule
  ],
  providers: [AuthGuardMaintenance],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
