import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-agregar-pelicula',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-pelicula.component.html',
  styleUrls: ['./agregar-pelicula.component.css']
})
export class AgregarPeliculaComponent implements OnInit {

  peliculaForm: FormGroup = new FormGroup({});
  enviada: boolean = false;
  enviando: boolean = false;
  errorMessage: string = '';

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
    private peliculaService: PeliculaService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  // Definir formulario reactivo
  mainForm() {
    this.peliculaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      director: ['', Validators.required],
      genero: ['', Validators.required],
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      clasificacion: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      idioma: ['', Validators.required]
    });
  }

  // Método para actualizar el valor de género desde el <select>
  actualizarGenero(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const generoSeleccionado = selectElement.value;
    this.peliculaForm.get('genero')?.setValue(generoSeleccionado);
  }

  // Getter para controles
  get myForm() {
    return this.peliculaForm.controls;
  }

  // Enviar formulario
  onSubmit() {
    this.enviada = true;
    this.errorMessage = '';

    if (this.peliculaForm.invalid) {
      console.log('Formulario inválido:', this.peliculaForm.errors);
      return;
    }

    this.enviando = true;
    console.log('Enviando formulario con datos:', this.peliculaForm.value);

    this.peliculaService.agregarPelicula(this.peliculaForm.value)
      .subscribe({
        next: (response) => {
          console.log('Película agregada correctamente:', response);
          this.enviando = false;
          this.ngZone.run(() => this.router.navigateByUrl('/listar-peliculas'));
        },
        error: (error) => {
          console.error('Error al agregar película:', error);
          this.enviando = false;
          this.errorMessage = error || 'Error al agregar la película. Intente nuevamente.';
        }
      });
  }
}
