import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  constructor() {
      super();
      this.state = {lista : [], nome:'', email:'', senha: ''};
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

  enviaForm(event){
    event.preventDefault();

    fetch(`http://cdc-react.herokuapp.com/api/autores`, {  
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({nome:this.state.nome, email:this.state.email, senha: this.state.senha})
      })  
      .then(response => response.json())
      .then(result => {
      })
      .catch(err => {
        console.error('Failed retrieving information', err);
      });

  }

  setNome(event){
    this.setState({nome:event.target.value});
  }

  setEmail(event){
    this.setState({email:event.target.value});
  }

  setSenha(event){
    this.setState({senha:event.target.value});
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
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                  <div className="pure-control-group">
                    <label htmlFor="nome">Nome</label> 
                    <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome.bind(this)} />                  
                  </div>
                  <div className="pure-control-group">
                    <label htmlFor="email">Email</label> 
                    <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail.bind(this)}  />                  
                  </div>
                  <div className="pure-control-group">
                    <label htmlFor="senha">Senha</label> 
                    <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha.bind(this)}  />                                      
                  </div>
                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div>
                </form>             
              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        this.state.lista.map((autor) => {
                            return(
                                <tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                            );
                        })
                    }
                  </tbody>
                </table> 
              </div>             
            </div>
          </div>            


</div>     
    );
  }
}

export default App;