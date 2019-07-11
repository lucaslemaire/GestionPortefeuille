import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailsMembreComponent} from './details-membre/details-membre.component';
import {ListeMembresComponent} from './liste-membres/liste-membres.component';
import {AuthGuard} from '../auth/auth-guard';

const routes: Routes = [
  {
    path: 'membres',
    children: [
      {
        path: '',
        component: ListeMembresComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: DetailsMembreComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembresRoutingModule {
}
