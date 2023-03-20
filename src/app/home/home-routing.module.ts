import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'home',
        children:[
         {
          path:'',
          loadChildren:() => import('../main/main.module').then(m =>m.MainPageModule)
         }
        ]
      },
      {
        path: 'profile',
        children:[
         {
          path:'',
          loadChildren:() => import('../profile/profile.module').then(m =>m.ProfilePageModule)
         }
        ]
      },
      {
        path: 'settings',
        children:[
         {
          path:'',
          loadChildren:() => import('../settings/settings.module').then(m =>m.SettingsPageModule)
         }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
