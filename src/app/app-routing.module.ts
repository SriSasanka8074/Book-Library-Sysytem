import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';


const routes: Routes = [
  {
    path: 'book',
    component: BookComponent
  }, {
    path: 'book/:mode/:id',
    component: BookComponent
  }, {
    path: 'manage-books',
    component: ManageBooksComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'book'
  }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ]
})
export class AppRoutingModule { }
