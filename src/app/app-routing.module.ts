//arquivo que cuida das rotas dentro do aplicativo e faz a troca entre componentes

//importa os modulos usados
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importa os componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

//vetor que faz a construção das rotas com param (path e pathMath) url linkada ao componente ideal
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}