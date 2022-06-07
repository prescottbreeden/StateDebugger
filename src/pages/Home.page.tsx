import React from 'react'
import { Box2, Button, Heading } from '@looker/components'

export const Home: React.FC = () => {
  const [showWisdom, setShowWisdom] = React.useState(false)
  return (
    <>
      <Box2 mx="15rem" display="flex" justifyContent="space-between">
        <Box2
          p="2rem"
          style={{
            border: '1px solid black',
            borderRadius: '5px',
          }}
        >
          <Heading mb="1rem">
            Composable Forms with Composable Validations
          </Heading>
          <Box2 mb="2rem">
            <Heading mb="1rem">Must be able to:</Heading>
            <ul>
              <li>Drop a form inside of any other form</li>
              <li>Handle dynamic forms</li>
              <li>Show UI validation errors appropriately</li>
              <li>Show API validation errors appropriately</li>
              <li>Handle recursive data types</li>
            </ul>
          </Box2>
        </Box2>
        <Box2
          p="2rem"
          style={{
            border: '1px solid black',
            borderRadius: '5px',
          }}
        >
          <Heading mb="1rem">
            Super Tooling Development Tooling Tools
          </Heading>
          <Box2 mb="2rem">
            <Heading mb="1rem">
              I tried to make a super hard thing and found:
            </Heading>
            <ul>
              <li>Interactive data-oriented debugging tools are slow</li>
              <li>Console logs are tedious</li>
            </ul>
          </Box2>
          <Button onClick={() => setShowWisdom((state) => !state)}>
            Show Wisdom
          </Button>
          {showWisdom && (
            <>
              <Heading my="1rem">What this actually means:</Heading>
              <ul>
                <li>I'm lazy</li>
                <li>I'm impatient</li>
              </ul>
            </>
          )}
        </Box2>
      </Box2>
    </>
  )
}
