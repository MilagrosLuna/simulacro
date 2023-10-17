import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actor } from 'src/app/clases/actor';
import { PaisesService } from 'src/app/servicios/paises.service';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css'],
})
export class ActorAltaComponent implements OnInit {
  actorName: string = '';
  actorLastName: string = '';
  actorEdad: number = -1;
  selectedCountry: any = null;
  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';
  constructor(
    private paisesService: PaisesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.paisesService.selectedCountry$.subscribe((country) => {
      this.selectedCountry = country;
    });
    this.form = new FormGroup({
      actorName: new FormControl('', [Validators.required]),
      actorLastName: new FormControl('', [Validators.required]),
      actorEdad: new FormControl('', [Validators.required]),
      selectedCountry: new FormControl(''),
    });
  }

  onSubmit() {    
    if (this.form.valid && this.selectedCountry != null) {
     // console.log(this.form.controls);
      Swal.fire({
        icon: 'success',
        title: 'Alta de actor exitosa',
        text: 'actor agregado',
        showConfirmButton: false,
        timer: 1500,
      })
        .then(async () => {
          let pais = '';
          if (this.selectedCountry != null) {
            pais = this.selectedCountry.name;
          } else {
            pais = this.form.controls['selectedCountry'].value;
          }
          const actor = new Actor(
            this.form.controls['actorName'].value,
            this.form.controls['actorLastName'].value,
            this.form.controls['actorEdad'].value,
            pais
          );
          const x = await this.authService.guardarActorBD(actor);
          if (x) {
            this.form.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al agregar el actor',
              text: this.errorMessage,
              timer: 4000,
            });
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar xd  el actor',
            text: this.errorMessage,
            timer: 4000,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error complete los datos!!',
        timer: 2500,
      });
    }
  }
}
