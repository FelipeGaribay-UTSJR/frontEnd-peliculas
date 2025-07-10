import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { Peliculas } from '../../models/Peliculas';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit{
  editarPeliculaForm: FormGroup = new FormGroup({});
  enviada: boolean = false;

  // Lista de géneros predefinidos
  generos: string[] = [
    'Acción',
    'Aventura',
    'Comedia',
    'Drama',
    'Ciencia Ficción',
    'Terror',
    'Fantasía',
    'Musical',
    'Thriller',
    'Documental'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private peliculaService: PeliculaService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainForm();
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getPelicula(id);
    }
  }

  mainForm() {
    this.editarPeliculaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      director: ['', Validators.required],
      genero: ['', Validators.required], // <- género será un select
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      clasificacion: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      idioma: ['', Validators.required],
    });
  }

  // Método para actualizar género cuando el usuario lo selecciona
  actualizarGenero(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const generoSeleccionado = selectElement.value;
    this.editarPeliculaForm.get('genero')?.setValue(generoSeleccionado);
  }

  get myForm() {
    return this.editarPeliculaForm.controls;
  }

  getPelicula(id: any) {
    this.peliculaService.getPelicula(id).subscribe((data: Peliculas) => {
      this.editarPeliculaForm.setValue({
        titulo: data.titulo,
        director: data.director,
        genero: data.genero,
        anio: data.anio,
        clasificacion: data.clasificacion,
        duracion: data.duracion,
        idioma: data.idioma
      });
    });
  }

  onSubmit() {
    this.enviada = true;
    if (this.editarPeliculaForm.invalid) return;

    if (window.confirm('¿Está seguro que desea modificar esta película?')) {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.peliculaService.actualizarPelicula(id, this.editarPeliculaForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/listar-peliculas'); // Asegúrate de que esta ruta exista
          console.log('Película actualizada correctamente');
        },
        error: (e) => console.error(e)
      });
    }
  }
}
