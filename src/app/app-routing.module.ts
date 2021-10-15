import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './features/create/create.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { ActivityPageComponent } from './features/activity-page/activity-page.component';
import { ArtistPageComponent } from './features/artist-page/artist-page.component';
import { HomeComponent } from './features/home/home.component';
import { NFTPageComponent } from './features/nft-page/nft-page.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { MarketComponent } from './features/market/market.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'activity', component: ActivityPageComponent },
  { path: 'nft/create', component: CreateComponent },
  { path: 'nft/:nftAddress', component: NFTPageComponent },
  { path: 'artist/:artistAddress', component: ArtistPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'marketplace', component: MarketComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
