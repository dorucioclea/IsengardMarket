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
import { CreateComponent } from './features/create/create.component';
import { FormsModule } from '@angular/forms';
import { MarketComponent } from './features/market/market.component';
import { ProfileEditComponent } from './features/profile-edit/profile-edit.component';
import { CollectionPageModule } from './features/collection-page/collection-page.module';

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
    CreateComponent,
    MarketComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedClassicModule,
    HttpClientModule,
    ArtistPageModule,
    NFTPageModule,
    CollectionPageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
