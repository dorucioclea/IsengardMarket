import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { ActivityPageComponent } from './features/activity-page/activity-page.component';
import { ArtistPageComponent } from './features/artist-page/artist-page.component';
import { HomeComponent } from './features/home/home.component';
import { NFTPageComponent } from './features/nft-page/nft-page.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'activity', component: ActivityPageComponent },
  { path: 'artist/:artistaddress/nft/:nftaddress', component: NFTPageComponent },
  { path: 'nft-page', component: NFTPageComponent },
  { path: 'artist/:artistaddress', component: ArtistPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
