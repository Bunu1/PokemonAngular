import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../classes/Pokemon'
import { Priority } from '../classes/Priority';
import { Attack } from '../classes/Attack';
import { BattleService } from './service/battle/battle.service';
import { PokemonService } from '../pokemon/service/pokemon.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  p1: Pokemon;
  p2: Pokemon;
  winner: Pokemon;

  areFighting = false;
  isFightOver = false;
  
  constructor(private battle: BattleService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const a_attack = new Attack('Vive attaque', .3, 65, 'electric', true, Priority.High);
    const b_attack = new Attack('Fire bolt', .3, 45, 'fire', true, Priority.Low);
    // this.p1 = new Pokemon('Pikachu', 100, 100, 50, 30, 20, 20, 1, 'NORMAL', undefined, a_attack);
    // this.p2 = new Pokemon('Salameche', 100, 100, 50, 30, 20, 20, 1, 'FIRE', undefined, b_attack);

    this.pokemonService.getPokemonById(25)
      .subscribe((data: Pokemon) => {
        this.p1 = data;
        this.p1.chosenMove = a_attack;
        console.log(this.p1)
      });

    this.pokemonService.getPokemonById(4)
      .subscribe((data: Pokemon) => {
        this.p2 = data;
        this.p2.chosenMove = b_attack;
        console.log(this.p2)
      });
  }

  startBattle(): void  {
    this.areFighting = true;
    this.battle.battle(this.p1, this.p2, this.winner, this.isFightOver);
  }

  stopBattle(): void {
    this.areFighting = false;
    this.battle.stopBattle();
  }
}