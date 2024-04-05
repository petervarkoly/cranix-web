import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriesPage } from './categories.page';
import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CranixSharedModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
