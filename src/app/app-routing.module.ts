import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { ActivityPageComponent } from './features/activity-page/activity-page.component';
import { ArtistPageComponent } from './features/artist-page/artist-page.component';
import { HomeComponent } from './features/home/home.component';
import { NFTPageComponent } from './features/nft-page/nft-page.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { MarketComponent } from './features/market/market.component';
import { ProfileEditComponent } from './features/profile-edit/profile-edit.component';
import { CollectionPageComponent } from './features/collection-page/collection-page.component';
import { CreateNFTComponent } from './features/create-nft/create.-nft.component';
import { AuthGuardMaintenance } from './core/guards/auth-guard.service';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';
import { TOSComponent } from './core/tos/tos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'activity', component: ActivityPageComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'nft/create', component: CreateNFTComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'nft/:nftAddress', component: NFTPageComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'artist/:artistAddress', component: ArtistPageComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'about', component: AboutPageComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'marketplace', component: MarketComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'profile', component: ProfileEditComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'collection/:collectionAddress', component: CollectionPageComponent, canActivate: [AuthGuardMaintenance] },
  { path: 'termsofservice', component: TOSComponent },
  { path: 'landing', component: MaintenanceComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
