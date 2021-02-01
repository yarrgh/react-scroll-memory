# `@yarrgh/react-scroll-memory`

[![npm version](https://badge.fury.io/js/%40yarrgh%2Freact-scroll-memory.svg)](https://badge.fury.io/js/%40yarrgh%2Freact-scroll-memory)

React component that preserves and restores page scroll position when the back browser button is pressed.

## Installation

`npm i @yarrgh/react-scroll-memory`

## Example Usage

```jsx
import { ScrollMemory } from "@yarrgh/react-scroll-memory";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollMemory />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" exact component={Services} />
        <Route path="/products" exact component={Products} />
        <Route path="/sign-up" exact component={SignUp} />
      </Switch>
      <Footer />
    </Router>
  );
};
```
