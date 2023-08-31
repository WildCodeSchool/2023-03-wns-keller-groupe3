import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";

test("render the button Home page", () => {
  render(
    <Router>
      <MockedProvider>
        <Home />
      </MockedProvider>
    </Router>
  );
  expect(screen.getByRole("button")).toBeInTheDocument();
});
