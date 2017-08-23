import React from 'react'
import { bindActionCreators } from 'redux'
import { Email } from 'routes/Email/components/Email'
import { shallow } from 'enzyme'

describe('(Component) Email', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      messages : [
        {
          'id': 0,
          'subject': 'Tahoe Trip Next Weekend',
          'from': 'x@gmail.com',
          'to': [
            'a@gmail.com',
            'b@gmail.com',
            'c.gmail.com'
          ],
          'body': 'Mi augue mattis vitae erat risus nibh.',
          'date': '2017-08-19T14:30Z',
          'unread': true
        },
        {
          'id': 1,
          'subject': 'You may have just won...',
          'from': 'x@gmail.com',
          'to': [
            'a@gmail.com',
            'b@gmail.com',
            'c.gmail.com'
          ],
          'body': 'You may have just won the Illinois State Lottery!',
          'date': '2017-08-19T04:30Z',
          'unread': false
        }],
      ...bindActionCreators({
        markRead    : (_spies.markRead = sinon.spy()),
        markUnread  : (_spies.markUnread = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Email {..._props} />)
  })

  it('renders as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('renders with an <h2> that includes Email label.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Twine Email/)
  })

  xit('renders subheaders <h5>.', () => {
    expect(_wrapper.find('h5').at(0).text()).to.match(/UNREAD EMAIL$/)
    _wrapper.setProps({ counter: 8 })
    expect(_wrapper.find('h5').at(1).text()).to.match(/READ EMAIL$/)
  })

  xit('renders exactly two buttons.', () => {
    expect(_wrapper.find('button')).to.have.length(2)
  })

  xdescribe('Mark as Read', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button')
    })

    it('exists', () => {
      expect(_button).to.exist()
    })

    it('is a primary button', () => {
      expect(_button.hasClass('btn btn-primary')).to.be.true()
    })

    it('Calls props.increment when clicked', () => {
      _spies.dispatch.should.have.not.been.called()

      _button.simulate('click')

      _spies.dispatch.should.have.been.called()
      _spies.markRead.should.have.been.called()
    })
  })

  xdescribe('Double Async Button', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)')
    })

    it('exists', () => {
      expect(_button).to.exist()
    })

    it('is a secondary button', () => {
      expect(_button.hasClass('btn btn-secondary')).to.be.true()
    })

    it('Calls props.doubleAsync when clicked', () => {
      _spies.dispatch.should.have.not.been.called()

      _button.simulate('click')

      _spies.dispatch.should.have.been.called()
      _spies.doubleAsync.should.have.been.called()
    })
  })
})
