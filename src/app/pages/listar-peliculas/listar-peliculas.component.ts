import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-peliculas',
  imports: [RouterLink],
  templateUrl: './listar-peliculas.component.html',
  styleUrl: './listar-peliculas.component.css'
})
export class ListarPeliculasComponent implements OnInit {
  //propiedades
  listaPeliculas: any = [];

  constructor(private peliculaService:PeliculaService){
    this.getPeliculas();
  }

  ngOnInit(): void {
    
  }

  //método que hace la petición al service para obtener las peliculas
  getPeliculas(){
    this.peliculaService.getPeliculas().subscribe((data) => {
      this.listaPeliculas = data;
    })
  }

  //metodo para eliminar una pelicula
  eliminarPelicula(pelicula: any, index: any) {
    if(window.confirm('¿Estas seguro de eliminar la película?')) {
      this.peliculaService.eliminarPelicula(pelicula._id)
      .subscribe((data) => {
        this.listaPeliculas.splice(index, 1);
    })
  }
}
}
