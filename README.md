# storybook-controlled
A simple utility for connecting controlled components to storybook actions, controls and state

## Usage
```tsx
const IncrementorButton = ({count, setCount}) => (
    <button onClick={() => setCount(count+1)}>
        {count}
    </button>
)

const BasicUsage = {
    decorators: [makeStateDecorator("onClick", "count")],
}
```

## Overview
storybook-controlled is a powerful utility designed to enhance the testing of controlled components in Storybook. It simplifies the process of managing state and actions, allowing developers to create interactive stories that respond to user input seamlessly.

## Problem Statement
Testing controlled components often involves passing a callback and a state value, which can lead to challenges in ensuring that user interactions are accurately reflected in the Storybook interface. While Storybook provides features like Actions, Render functions, and Controls, they often fall short in creating a fully interactive experience where state changes are synchronized with user actions.

## Solution
This package introduces a custom Decorator that streamlines the integration of state management with Storybook's Controls and Actions. By providing a simple interface, the Decorator takes the name of the callback and the state to update as arguments. When applied, it:

- Records the actions triggered by the callback
- Connects directly to Storybook Controls, allowing users to manipulate component state
- Ensures that any changes to state are reflected in real-time within the story

Built with TypeScript, the Storybook State Decorator offers strong typing to prevent common errors, making it easier for developers to implement and use.

## Key Features

- Easy integration with existing Storybook stories.
- Real-time synchronization of state changes and user actions.
- Type-safe implementation to enhance developer experience.

Elevate your Storybook stories with the Storybook State Decorator and create more dynamic, interactive components with ease!

