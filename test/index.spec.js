
import { shallow } from 'enzyme';
import expect from 'expect'
import Bem from '../src/index'
import React, { Component } from 'react'

describe('Bem', () => {

  describe('support to null styles', () => {
    const Button = Bem()(
      class Comp extends Component {
        render() { return <button className='i1' style={{margin:10}}>...</button>}
      }
    )

    it('works', () => {
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('i1')
    })

    it('accepts external className', () => {
      const btn = shallow(<Button className='ex1' />).find('button').props()
      expect(btn.className).toEqual('i1 ex1')
    })
  })

  describe('support to many types of class root name', () => {
    class Comp extends Component {
      render() { return <button ref='btn'/> }
    }

    it('found classname with root name', () => {
      const Button = Bem({root: 'root'})(Comp)
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('root')
    })

    it('found classname with custom name', () => {
      const Button = Bem({comp: 'comp'}, 'comp')(Comp)
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('comp')
    })
  })

  describe('expectations about root', () => {
    const css = {
      root: 'root',
      'root--kind-primary': 'pri',
      'root--disabled-true': 'tru'
    }

    const Button = Bem(css)(
      class Comp extends Component {
        render() { return <button className='i1'>...</button>}
      }
    )

    it('has root class', () => {
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('root i1')
    })

    it('has root class and modifiers', () => {
      const btn = shallow(<Button kind='primary' disabled={true} />).find('button').props()
      expect(btn.className).toEqual('root pri tru i1')
    })

    it('NOT set nonexistent modifiers', () => {
      const btn = shallow(<Button circle={true} />).find('button').props()
      expect(btn.className).toEqual('root i1')
    })

    it('has setted className', () => {
      const btn = shallow(<Button className='ex1' />).find('button').props()
      expect(btn.className).toEqual('root i1 ex1')
    })
  })

  describe('expectations about styles', () => {
    const Button = Bem()(
      class Comp extends Component {render() { return <button ref='btn' style={{width: 1}}>...</button>}}
    )

    it('has root style', () => {
      const btn = shallow(<Button />).find('button').props()
      expect(btn.style.width).toEqual(1)
    })

    it('merges styles', () => {
      const btn = shallow(<Button style={{height: 2}}/>).find('button').props()
      expect(btn.style.width).toEqual(1)
      expect(btn.style.height).toEqual(2)
    })

    it('not override styles', () => {
      const btn = shallow(<Button style={{width: 2}}/>).find('button').props()
      expect(btn.style.width).toEqual(1)
    })
  })

  describe('expectations about styles options', () => {
    const Button = Bem(null, {mergeStyles: false})(
      class Comp extends Component {render() { return <button ref='btn' style={{width: 1}}>...</button>}}
    )

    it('not set styles if config to not', () => {
      const btn = shallow(<Button style={{height: 2}}/>).find('button').props()
      expect(btn.style).toEqual({width: 1})
    })
  })
})
