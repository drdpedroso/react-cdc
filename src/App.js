import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import InputCustomizado from './componentes/InputCostumizado';
import { FormularioAutor, TabelaAutores} from './componentes/Autor';

class App extends Component {
  constructor() {
    super();
    this.state = {lista : []};
  }

  componentDidMount(){
    fetch(`http://cdc-react.herokuapp.com/api/autores`)  
      .then(response => response.json())
      .then(result => {
        this.setState({lista : result});
      })
      .catch(err => {
      console.error('Failed retrieving information', err);
    });
  }

  render() {
    return (
<div id="layout">
    
    <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>
            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
        </div>
    </div>
        <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <FormularioAutor />
                   
              </div>  
              <div>            
                <TabelaAutores />
              </div>             
            </div>
          </div>            


</div>     
    );
  }
}

export default App;