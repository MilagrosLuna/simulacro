import { Injectable } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { Actor } from '../clases/actor';
import { Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { Pelicula } from '../clases/pelicula';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  


  constructor(private firestore : Firestore) {}

  public log :boolean=true;

  public async traerPeliculasBd() {
    const peliculasCollection  = collection(this.firestore, 'peliculas');
    const query = await getDocs(peliculasCollection);
    const peliculas = query.docs.map(doc=>doc.data())
    return peliculas;
  }


  public async traerActoresBd() {
    const actoresCollection = collection(this.firestore, 'actores');
    const query = await getDocs(actoresCollection);
    const actores = query.docs.map((doc) => {
      return {
        id: doc.id, 
        ...doc.data(), 
      };
    });
    return actores;
  }

  public async guardarActorBD(actor: Actor)  {
    try {
      const docRef = await addDoc(collection(this.firestore, 'actores'), {
        nombre: actor.nombre,
        apellido: actor.apellido,
        edad: actor.edad,
        pais: actor.pais,
      });
      console.log('Document written with ID: ', docRef.id);
      return true;
    } catch (e) {
      console.error('Error adding document: ', e);
      return false;
    }
  }

  public async guardarPeliBD(pelicula: Pelicula)  {
    try {
      const docRef = await addDoc(collection(this.firestore, 'peliculas'), {
        nombre: pelicula.nombre,
        tipo: pelicula.tipo,
        fechaEstreno: pelicula.fechaEstreno,
        cantidadPublico: pelicula.cantidadPublico,
        fotoPelicula: pelicula.fotoPelicula,
        actor:pelicula.actor
      });
      console.log('Document written with ID: ', docRef.id);
      return true;
    } catch (e) {
      console.error('Error adding document: ', e);
      return false;
    }
  }
}
