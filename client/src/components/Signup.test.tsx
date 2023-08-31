import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from './Signup';

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
})

