# Storybook Controlled
A simple utility for connecting controlled components to storybook actions, tests, controls and state

## tl;dr Usage
```tsx
const IncrementorButton = ({count, setCount}) => (
    <button onClick={() => setCount(count+1)}>
        {count}
    </button>
)

const BasicUsage = {
    decorators: [controlledDecorator("onClick", "count")],
}
```
See the [Storybook](https://main--676de7925ca7e0feeaaad251.chromatic.com) for more examples

## Overview
storybook-controlled is meant to be the go-to best practice for writing stories for controlled components in Storybook. It simplifies the process of managing state and actions, allowing developers to create interactive stories that respond to user input seamlessly.


## Problem Statement
Controlled components often take a value or set of values to display and a callback to update those values. They leave it up to implementers to implement the onChange function and update the passed values. This creates extra flexibility, but causes some issues when it comes to testing.

There are generally two approaches to writing stories for controlled components:
1. write a render function with useState to handle the updates
2. use Storybook's actions/test `action()/fn()` to mock the callback

These each have drawbacks. Custom render functions generally break at least some controls, in this case the best case is that the non-functional args are omitted, but often they just don't work. Using storybooks mocks is nice, but you don't get to see the component change in response to user action. 

## Solution
This package introduces a custom Decorator that streamlines the integration between args and callback mocking. By providing a simple interface, the Decorator takes the name of the callback and the state to update as arguments. When applied, it:

- Records the actions triggered by the callback
- Connects directly to Storybook Controls, allowing users to manipulate component state
- Ensures that any changes to state are reflected in real-time within the story

The strong TypeScript types prevent common errors, making it easier for developers to implement and use.

## TODOs

- [ ] improve source code mapping
- [ ] publish storybook
- [ ] allow passing component rather than Prop type
- [ ] add automated tests