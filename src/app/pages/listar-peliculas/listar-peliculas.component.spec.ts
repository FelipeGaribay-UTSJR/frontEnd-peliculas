import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPeliculasComponent } from './listar-peliculas.component';

describe('ListarPeliculasComponent', () => {
  let component: ListarPeliculasComponent;
  let fixture: ComponentFixture<ListarPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPeliculasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
