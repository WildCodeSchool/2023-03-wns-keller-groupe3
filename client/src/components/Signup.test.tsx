import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from './Signup';
import { createMemoryHistory } from "history";
import { CREATE_USER } from "../graphql/mutations";

describe('Signup', ()=>{
  it('renders a button', ()=>{
      render (
      <Router>
        <MockedProvider>
          <Signup />
        </MockedProvider>
      </Router>
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
  })
});

it("should navigate to /user after successful signup", async () => {
  const history = createMemoryHistory();

  const createUserMock = {
    request: {
      query: CREATE_USER,
      variables: {
        name: "test",
        email: "test@gmail.com",
        confirmEmail: "test@gmail.com",
        password: "Azert1234",
        confirmPassword: "Azert1234",
      }
    },
    result: {
      data: {
          createUser: {
              id: "1234",
              email: "test@gmail.com",
              name: "test",
              __typename: "User"
          }
      }
  }
};
  render(
  <Router >
    <MockedProvider mocks={[createUserMock]} addTypename={false}>
      <Signup />
    </MockedProvider>
  </Router>
  );
  fireEvent.click(screen.getByText('Inscription'));

  await waitFor (() => {
    expect(history.location.pathname).toBe('/');
  });
});
