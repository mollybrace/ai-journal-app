import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import Homepage from "../app/page"
import { ClerkProvider, useUser } from "@clerk/nextjs"

vi.mock('@clerk/nextjs', () => {
    // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
    const mockedFunctions = {
      auth: () =>
        new Promise((resolve) =>
          resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
        ),
      ClerkProvider: ({ children }) => <div>{children}</div>,
      useUser: () => ({
        isSignedIn: true,
        user: {
          id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
          fullName: 'Charles Harris',
        },
      }),
    }
  
    return mockedFunctions
  })
  
  vi.mock('next/font/google', () => {
    return {
      Inter: () => ({ className: 'inter' }),
    }
  })
  
  test(`Home`, async () => {
    render(await Homepage())
    expect(screen.getByText('Get started')).toBeTruthy()
  })