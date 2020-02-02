import React from "react";
import { shallow } from "enzyme";
import { App } from "../pages/App";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

describe("App Component", () => {
  const loadUser = () => {
    return "Hello World";
  };
  let props;

  beforeEach(() => {
    props = {
      loadUser
    };
  });

  it("renders without crashing", () => {
    shallow(<App {...props} />);
  });
});

it("test test", () => {
  expect(4).toEqual(4);
});
