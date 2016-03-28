
import { Component, createClass, createElement, cloneElement } from 'react'
import cx from 'classnames'

function isPlain(value) {
  const type = typeof value
  return type === 'number' || type === 'string' || type === 'boolean'
}

function getDisplayName({ displayName, name }) {
  return displayName || name || 'Component'
}

export default function(css, rootName, options={}) {
  css      = !css ? {} : css
  options  = typeof rootName === 'string' ? options : rootName
  rootName = typeof rootName === 'string' ? rootName : 'root'

  options = {
    mergeStyles: true,
    getProps: (props) => props,
    ...options
  }

  function getClass(k, v) {
    return css[isPlain(v) ? `${rootName}--${k}-${v}` : `${rootName}--${k}-${!!v}`]
  }

  function buildBemClasses(self, node) {
    const allKlzzs = []
    const allProps = {...self.state || {}, ...options.getProps(self.props)}

    for (let k in allProps) {
      const sp = getClass(k, allProps[k])
      sp && allKlzzs.push(sp)
    }

    let className = cx(
      css[rootName],
      !allKlzzs.length ? null : allKlzzs,
      node.props.className,
      self.props.className
    )

    if (className.trim) className = className.trim()
    if (className === '') className = null

    if (!className && !self.props.style) {
      return null
    }

    if (options.mergeStyles) {
      return {className, style: {...self.props.style, ...node.props.style}}
    } else {
      return {className}
    }
  }

  return function(DecoredComponent) {
    let BemComponent = null

    if (DecoredComponent.prototype && typeof DecoredComponent.prototype.isReactComponent === 'object') {
      BemComponent = class extends DecoredComponent {
        render() {
          const el  = super.render()
          if (!el) return el

          const props = buildBemClasses(this, el)
          return !props ? el : cloneElement(el, props)
        }
      }

    } else {
      BemComponent = (props, context) => {
        const el = DecoredComponent(props, context)
        const _p = buildBemClasses({props, state: {}}, el)
        return !_p ? el : cloneElement(el, _p)
      }
    }

    BemComponent.displayName = `Bem(${getDisplayName(DecoredComponent)})`
    return BemComponent
  }
}
