import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Pokemon } from 'src/app/models/pokemon.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private http: HttpClient) {
    this.getData();
  }

  pokemons:Pokemon[] | undefined = []
  pokemonsCopy: Pokemon[] | undefined = []

  async getData() {
    await this.http.get<any>(`${environment.apiUrl}/api/v2/pokemon`)
      .subscribe(({results}) => {
        this.pokemons = results.map((item: any) => {
          return {
            image: `https://www.pexels.com/search/${item.name}`,
            ...item
          }
        })

        this.pokemonsCopy = this.pokemons
        console.log(this.pokemons);
      })
  }

  filter(e: any) {
    const search = e.target.value
    console.log({search});
    // TODO: hacer el filtro

    this.pokemons = this.pokemonsCopy?.filter(({ name }: Pokemon) => name.toLowerCase().includes(search.toLowerCase()))
  }
}
