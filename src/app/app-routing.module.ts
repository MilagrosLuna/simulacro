import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './components/pelicula-alta/pelicula-alta.component';
import { ActorAltaComponent } from './components/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './components/actor-listado/actor-listado.component';
import { PeliculaListadoComponent } from './components/pelicula-listado/pelicula-listado.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { HomeComponent } from './components/home/home.component';
import { logueadoGuard } from './guards/logueado.guard';
import { ActorPeliculaComponent } from './components/actor-pelicula/actor-pelicula.component';
const routes: Routes = [
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[logueadoGuard],
    children: [
      { path: 'peliculas/alta', component: PeliculaAltaComponent },
      { path: 'actor/alta', component: ActorAltaComponent },
      { path: 'actor/listado', component: ActorListadoComponent },
      { path: 'peliculas/listado', component: PeliculaListadoComponent },
      { path: 'actorPelicula', component: ActorPeliculaComponent },
    ],
  },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
  { path: '**', redirectTo: 'bienvenido' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
