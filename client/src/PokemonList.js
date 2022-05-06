import React from "react";

import Card from "./Card";

class PokemonList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pokemon: [],
      name: "",
      num: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchPokemon = this.fetchPokemon.bind(this);
  }

  componentDidMount(){
    this.fetchPokemon();
  }

  fetchPokemon(){
    fetch("/api/pokemon")
      .then(response => response.json())
      .then(json => {
        this.setState({
          pokemon: json.pokemon
        })
      })
  }

  handleSubmit(event){
    event.preventDefault();

    fetch("/api/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num: this.state.num,
        name: this.state.name
      })
    }).then(response => {
      this.fetchPokemon();
    })
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }



  render(){
    return <div className="Pokemon-List">
        <h2>Pokedex</h2>

        <form style={{display: "grid"}} onSubmit={this.handleSubmit}>
          <span>Add A pokemon!</span>
          <input type="text" name="name" placeholder="bulbasaur" onChange={this.handleChange} />
          <input type="number" name="num" placeholder="1" onChange={this.handleChange} />
          <button type="submit">Add to Pokedex</button>
        </form>

        {this.state.pokemon.map(data => {
          return <Card data={data} />
        })}

    </div>
  }

}


export default PokemonList;