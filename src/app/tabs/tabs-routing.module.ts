import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ChatComponent } from '../tab1/chat/chat.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
         path:'chat/:id',
         component:ChatComponent
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },

    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../authmodule/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:"forget-password",
    loadChildren:()=>import('../authmodule/forget-password/forget-password.module').then(m=>m.ForgetPasswordPageModule)
  },
  {
    path:"register",
    loadChildren:()=>import('../authmodule/register/register.module').then(m=>m.RegisterPageModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
