import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

import { ActorService } from 'src/app/servicios/actor.service';
@Component({
  selector: 'app-actor-listado',
  templateUrl: './actor-listado.component.html',
  styleUrls: ['./actor-listado.component.css'],
})
export class ActorListadoComponent implements OnInit {
  actores: any[] = []; // Aquí almacenarás los datos de los actores
  selectedActor: any = null;
  @Output() actorsData = new EventEmitter<any>();
  constructor( private actorService: ActorService,private authService: AuthService) {}
  selectActor(actor: any) {
    this.selectedActor = actor;
    console.log(actor);
    this.actorsData.emit(this.selectedActor);
    this.actorService.setSelectedActor(actor); 
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
        const actoresData = await this.authService.traerActoresBd();
        console.log('Datos de actores:', actoresData); // Agrega esta línea
        this.actores = actoresData;
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
