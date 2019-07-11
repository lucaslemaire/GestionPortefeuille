import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard';
import {ListeDepensesComponent} from './liste-depenses/liste-depenses.component';
import {DetailsDepenseComponent} from './details-depense/details-depense.component';
import {AboutDepenseComponent} from './details-depense/about-depense/about-depense.component';
import {EditDepenseComponent} from './details-depense/edit-depense/edit-depense.component';
import {DeleteDepenseComponent} from './details-depense/delete-depense/delete-depense.component';

const routes: Routes = [
  {
    path: 'depenses',
    children: [
      {
        path: '',
        component: ListeDepensesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: DetailsDepenseComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepensesRoutingModule {

}
