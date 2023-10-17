import { Component } from '@angular/core';
import { Pelicula } from 'src/app/clases/pelicula';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css'],
})
export class TablaPeliculaComponent {
  peliculas: any[] = [];
  actores: any[] = [];
  selectedPelicula: any = null;
  constructor(private authService: AuthService) {}
  selectPeli(peli: any) {
    this.selectedPelicula = peli;
  }
  ngOnInit() {
    Swal.fire({
      icon: 'success',
      title: 'Actores',
      text: 'Cargando actores...',
      showConfirmButton: false,
      timer: 1500,
    })
      .then(async () => {
        const peliData = await this.authService.traerPeliculasBd();
        this.peliculas = peliData;

        const actoresData = await this.authService.traerActoresBd();
        this.actores = actoresData;

        this.peliculas.forEach((pelicula) => {
          const actor = this.actores.find((a) => a.id === pelicula.actor);
          if (actor) {
            pelicula.actor = actor.nombre; // Reemplazar el UID por el nombre del actor
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          timer: 4000,
        });
      });
  }
}
