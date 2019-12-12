import React from 'react';
// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from './App';

import { ajax } from 'rxjs/ajax';
import { combineLatest, of, from } from 'rxjs';
import { delay, mergeMap, repeat, timeoutWith } from 'rxjs/operators';

configure({ adapter: new Adapter() });
let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render app", () => {
  act(() => {
    render(<App />, container);
  });

  expect(container.textContent).toBe("Temp (C): Humiditiy (%): Air pressure (psi): ");
});


test("it should match snapshot", done => {
  const component = shallow(<App />);

  expect(component.getElements()).toMatchSnapshot();
  done();
});
