import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/clases/pelicula';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActorService } from 'src/app/servicios/actor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css'],
})
export class PeliculaAltaComponent implements OnInit {
  peliculaName: string = '';
  tipo: string = '';
  fechaEstreno: Date = new Date();
  cantidadPublico: string = '';
  selectedActor: any = null;
  selectedActorUid: any = null;
  fotoPelicula: any = null;
  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';
  selectedImage: any = null;  
  imagenURL: string='';

  constructor(private authService: AuthService) {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        
      this.imagenURL = reader.result as string;
      };
  
      reader.readAsDataURL(file);
    }
  }
  resetImageInput() {
    const inputElement = document.getElementById('fotoPelicula') as HTMLInputElement;
    inputElement.value = ''; 
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      peliculaName: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      fechaEstreno: new FormControl('', [Validators.required]),
      cantidadPublico: new FormControl('', [Validators.required]),
      fotoPelicula: new FormControl('', [Validators.required]),
      selectedActor: new FormControl('', []),
    });
  }
  public receiveActor(actor: any) {
    console.log(actor);
    this.selectedActor = actor.nombre;
    this.selectedActorUid = actor.id;
  }
  onSubmit() {
    if (this.form.valid  && this.selectedActor != null &&  this.selectedActorUid != null) {
      Swal.fire({
        icon: 'success',
        title: 'Alta de pelicula exitosa',
        text: 'pelicula agregada',
        showConfirmButton: false,
        timer: 1500,
      })
        .then(async () => {     
          console.log(this.selectedActorUid) ; 
          const pelicula: Pelicula = {
            nombre: this.form.value.peliculaName,
            tipo: this.form.value.tipo,
            fechaEstreno: this.form.value.fechaEstreno,
            cantidadPublico: this.form.value.cantidadPublico,
            id: -1,
            fotoPelicula: this.selectedImage, // URL de la imagen subida
            actor: this.selectedActorUid,
          };
          
          console.log(pelicula);
          const x = await this.authService.guardarPeliBD(pelicula);
          if (x) {
            this.form.reset();
            this.selectedImage = null;
            this.imagenURL = '';
        
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al agregar la pelicula',
              text: this.errorMessage,
              timer: 4000,
            });
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar xd  la pelicula',
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
