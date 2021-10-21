import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedClassicModule } from "@isengard/shared/shared-classic.module";
import { CollectionNftCardComponent } from "./collection-nft-card/collection-nft-card.component";
import { CollectionPageComponent } from "./collection-page.component";

@NgModule({
    imports: [
      CommonModule,
      SharedClassicModule,
      RouterModule,
      MatIconModule
    ],
    declarations: [
        CollectionPageComponent,
        CollectionNftCardComponent
    ],
    exports: [
        CollectionPageComponent,
        CollectionNftCardComponent
    ]
  })

  export class CollectionPageModule { }