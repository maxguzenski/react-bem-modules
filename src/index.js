
import React from 'react'
import cx from 'classnames'

function isPlain(value) {
  const type = typeof value
  return type === 'number' || type === 'string' || type === 'boolean'
}

export default function(css={}, rootName='root', options={}) {
  function getClass(k, v) {
    return css[isPlain(v) ? `${rootName}--${k}-${v}` : `${rootName}--${k}-${!!v}`]
  }

  function buildBemClasses(self, node) {
    const allKlzzs = []
    const allProps = {...self.state || {}, ...self.props}

    for (let k in allProps) {
      const sp = getClass(k, allProps[k])
      sp && allKlzzs.push(sp)
    }

    let className = cx(
      css[rootName], allKlzzs, (node.props || {}).className, (self.props || {}).className
    )

    if (className.trim) className = className.trim()
    if (className === '') className = null

    return { className }
  }

  return function(DecoredComponent) {
    return class WrapComponent extends DecoredComponent {
      render() {
        const elem  = super.render()
        if (!elem) return elem

        const props = buildBemClasses(this, elem)
        return React.cloneElement(elem, props)
      }
    }
  }
}
