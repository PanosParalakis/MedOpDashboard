import React from 'react';
import './App.css';

import { ajax } from 'rxjs/ajax';
import { combineLatest, of, from } from 'rxjs';
import { delay, mergeMap, repeat, timeoutWith } from 'rxjs/operators';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      humiditiy: null,
      airPressure: null,
    }

  }

  randomPoll() {
    // 100 - 200ms
    return Math.floor(Math.random() * (200 - 100) + 100);
  }

  getValues(){
    this.observer = combineLatest(
      of({}).pipe(mergeMap(_ => from((ajax.getJSON('http://localhost:4000/temp')).pipe(delay(this.randomPoll()), timeoutWith(1000, [{"value": "N/A"}])))),repeat()),
      of({}).pipe(mergeMap(_ => from((ajax.getJSON('http://localhost:4000/humidity')).pipe(delay(this.randomPoll()), timeoutWith(1000, [{"value": "N/A"}]) ))),repeat()),
      of({}).pipe(mergeMap(_ => from((ajax.getJSON('http://localhost:4000/air-pressure')).pipe(delay(2000), timeoutWith(1000, [{"value": "N/A"}])))),repeat()),
    ).subscribe(res => this.setState({
      temp: res[0].value,
      humiditiy: res[1].value,
      airPressure: res[2].value,
    }));
  }


  componentDidMount() {
    this.getValues();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  render() {
    return (
      <div>
        <div id="temp">Temp (C): <span>{this.state.temp}</span></div>
        <div id="humiditiy">Humiditiy (%): <span>{this.state.humiditiy}</span></div>
        <div id="airPressure">Air pressure (psi): <span>{this.state.airPressure}</span></div>
      </div>
    );
  }
}

export default App;
