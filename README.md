# React BEM Modules

A tiny library to easy apply css classes from props to react components

## Install

`npm install react-bem-modules`

you'll need also:
`webpack`, `css-loader`, `react`

## How?

Take a look!

```javascript
// button.jsx

import React from 'react'
import Bem from 'react-bem-modules'
import css from './button.css'

@Bem( css )
export default class Button extends React.Component {
  static defaultProps = {
    kind: 'default', circle: false
  }

  render() {
    return <button className='klzz1'>{ this.props.label }</button>
  }
}
```

```css
/* button.css */

.root {
  border: 1px solid transparent;
  /* a lot of other styles */
}

/* bem-modules classes, pattern: className--propsKey-propsValue */
.root--circle-true { border-radius: 50% }
.root--kind-default { /*...*/ }
.root--kind-primary { /*...*/ }
.root--kind-success { /*...*/ }
}
```
And that is it. Seriously! For small/medium components you will end up with 0 (zero) css references on you code.

Here a example of how to call it and its output:

```javascript
// when you call
<Button kind='primary' circle={true} label='...'/>

// ... you'll receive this final html
// ps.: On real world, css-modules will change classes names to make they unique.
<button class='root-jduei3 root--kind-primary-jduei3 root--circle-true-jduei3 klzz1'>...</button>
```

## Finally

**If you like it, please help!!**
