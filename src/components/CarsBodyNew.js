import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './CarsBodyNew.css';
import DogAddPage from './dog-add';

import EclipseWidget from './eclipse';


class App extends React.Component {
  state = { 
    dogs: [],
    loading: false,
    breedsSelect: []
  }

  //Подія коли компонент відрендерився посилаємо запит на сервер за даним які необхідні компоненту
  componentDidMount() {
    const urlBreeds='https://localhost:44331/api/makers/select';
    this.setState({loading: true});
    axios.get(urlBreeds).then(
      (resp) => { 
        console.log('-----axios res-----', resp);
        this.setState({breedsSelect: resp.data, loading: false});
      }
    );
    //console.log("------click button-------");
  }

  getListDataHandler = (e) => {
    e.preventDefault();
    // var list = [
    //   {id: 1, name: 'Шарік', image: 'https://85.img.avito.st/640x480/5408090485.jpg'},
    //   {id: 2, name: 'Бім', image: 'https://images.ua.prom.st/1605725118_w640_h640_kopilka-sobaka-sharik.jpg'}
    // ];
    // this.setState({dogs: list});
    const urlDogs='https://localhost:44331/api/cars';
    this.setState({loading: true});
    axios.get(urlDogs).then(
      (resp) => { 
        console.log('-----axios res-----', resp);
        this.setState({dogs: resp.data, loading: false});
      }
    );
    
  }
  render() {
    //Дестурктуризація
    const {loading, breedsSelect}= this.state;
    console.log("--Reander app state--", this.state);

    const todoItems = this.state.dogs.map((dog) =>
      <div key={dog.id} className="col-lg-3 col-md-4 col-6">
        <div className="mb-4 h-100 cursor-pointer">
          <img className="img-fluid img-thumbnail" src={dog.image} alt="" />
        </div>
      </div>
    );
    return ( 
      <React.Fragment>
        
      { loading && <EclipseWidget /> }

        <div className="container">

          <h1>Hello Peter</h1>
          <button className="btn btn-success" onClick={this.getListDataHandler}>Get data</button>
          <hr className="mt-2 mb-5" />
          <div className="row text-center text-lg-left" style={{ overflow: "hidden" }}>
            {todoItems}
          </div>
        </div>
        
        <DogAddPage breeds={breedsSelect} />
      </React.Fragment>
    );
  }
}
 
export default App;