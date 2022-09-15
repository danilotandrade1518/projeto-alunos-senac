import { MarvelService } from './marvel.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap, takeLast, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ''
  });

  title = 'projeto-alunos-senac';
  characters: any = [];
  character: any;

  constructor(
    private marvelService: MarvelService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this
      .form
      .get('name')
      ?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        tap(console.log),
        switchMap(value => this.marvelService.getCharacters(value)),
        tap((characters: any) => {
          this.characters = characters['data']['results'];
          this.character = characters['data']['results'][0];
        }),
      )
      .subscribe()
  }

  getImg(c: any) {
    return `${c?.thumbnail?.path}.${c?.thumbnail?.extension}`;
  }
}
