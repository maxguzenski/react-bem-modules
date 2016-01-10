
import { shallow } from 'enzyme';
import expect from 'expect'
import Bem from '../src/index'
import React, { Component } from 'react'

describe('Bem', () => {

  describe('support to null styles', () => {
    const Button = Bem()(
      class Comp extends Component {
        render() { return <button ref='btn' className='i1' style={{margin:10}}>...</button>}
      }
    )

    it('should work', () => {
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('i1')
    })

    it('should accept external className', () => {
      const btn = shallow(<Button className='ex1' />).find('button').props()
      expect(btn.className).toEqual('i1 ex1')
    })
  })

  describe('support to many types of class root name', () => {
    class Comp extends Component {
      render() { return <button ref='btn'/> }
    }

    it('should found classname with root name', () => {
      const Button = Bem({root: 'root'})(Comp)
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('root')
    })

    it('should found classname with custom name', () => {
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
        render() { return <button ref='btn'>...</button>}
      }
    )

    it('should has root class', () => {
      const btn = shallow(<Button />).find('button').props()
      expect(btn.className).toEqual('root')
    })

    it('should has root class and modifiers', () => {
      const btn = shallow(<Button kind='primary' disabled={true} />).find('button').props()
      expect(btn.className).toEqual('root pri tru')
    })

    it('should NOT set nonexistent modifiers', () => {
      const btn = shallow(<Button circle={true} />).find('button').props()
      expect(btn.className).toEqual('root')
    })

    it('should has set className', () => {
      const btn = shallow(<Button className='ex1' />).find('button').props()
      expect(btn.className).toEqual('root  ex1')
    })
  })
})
