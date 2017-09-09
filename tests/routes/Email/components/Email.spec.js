import React from 'react'
import { bindActionCreators } from 'redux'
import { Email } from 'routes/Email/components/Email'
import { mount } from 'enzyme'

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
          'subject': 'Did you forget?',
          'from': 'me@yahoo.com',
          'to': [
            'j@gmail.com',
            'k@gmail.com',
            'l.gmail.com'
          ],
          'body': 'You have forgotten!',
          'date': '2017-08-18T10:30Z',
          'unread': false
        }],
      ...bindActionCreators({
        markRead    : (_spies.markRead = sinon.spy()),
        markUnread  : (_spies.markUnread = sinon.spy()),
        deleteMail  : (_spies.deleteMail = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = mount(<Email {..._props} />)
  })

  describe('The loading messages page', () => {
    it('displays a loading icon before loading email messages', () => {
      _wrapper.setProps({
        messages : [
          {
            'id': -1,
            'subject': 'IS_LOADING',
            'from': '',
            'to': [],
            'body': '',
            'date': '',
            'unread': true
          }]
      })
      expect(_wrapper.find('img').find('.loading')).to.have.length(1)
    })
  })

  describe('The email application user interface', () => {
    it('renders an email unread email message', () => {
      expect(_wrapper.find('.containerMailUnread').find('.message')).to.have.length(1)
    })

    it('renders subheaders <h5>.', () => {
      expect(_wrapper.find('h5').at(0).text()).to.match(/UNREAD EMAIL$/)
      expect(_wrapper.find('h5').at(1).text()).to.match(/READ EMAIL$/)
    })

    it('places emails depending on their read status', () => {
      expect(_wrapper.find('.containerMailRead').find('.message')).to.have.length(1)
      expect(_wrapper.find('.containerMailUnread').find('.message')).to.have.length(1)
    })

    it('renders exactly two buttons.', () => {
      expect(_wrapper.find('button')).to.have.length(2)
    })
  })

  describe('Mark as Read', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').at(0)
    })

    it('exists with the name Mark as Read', () => {
      expect(_button).to.exist()
      expect(_button.text()).to.match(/Mark as Read$/)
    })

    it('Calls props.markRead when clicked and updates the store', () => {
      _spies.dispatch.should.have.not.been.called()

      _button.at(0).simulate('click')

      _spies.dispatch.should.have.been.called()
      _spies.markRead.should.have.been.called()

      _wrapper.setProps({
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
            'unread': false
          },
          {
            'id': 1,
            'subject': 'Did you forget?',
            'from': 'me@yahoo.com',
            'to': [
              'j@gmail.com',
              'k@gmail.com',
              'l.gmail.com'
            ],
            'body': 'You have forgotten!',
            'date': '2017-08-18T10:30Z',
            'unread': false
          }]
      })

      expect(_wrapper.find('.containerMailRead').find('.message')).to.have.length(2)
      expect(_wrapper.find('.containerMailUnread').find('.message').text()).to.match(/There are no Unread messages$/)
    })
  })

  describe('Mark as Unread', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').at(1)
    })

    it('exists', () => {
      expect(_button).to.exist()
      expect(_button.text()).to.match(/Mark Unread$/)
    })

    it('Calls props.markUread when clicked and updates the store', () => {
      _spies.dispatch.should.have.not.been.called()

      _button.simulate('click')

      _spies.dispatch.should.have.been.called()
      _spies.markUnread.should.have.been.called()

      _wrapper.setProps({
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
            'subject': 'Did you forget?',
            'from': 'me@yahoo.com',
            'to': [
              'j@gmail.com',
              'k@gmail.com',
              'l.gmail.com'
            ],
            'body': 'You have forgotten!',
            'date': '2017-08-18T10:30Z',
            'unread': true
          }]
      })

      expect(_wrapper.find('.containerMailRead').find('.message').text()).to.match(/There are no Read messages$/)
      expect(_wrapper.find('.containerMailUnread').find('.message')).to.have.length(2)
    })
  })

  describe('Delete email', () => {
    let _deleteUnread, _deleteRead

    beforeEach(() => {
      _deleteUnread = _wrapper.find('.delete').at(0)
      _deleteRead = _wrapper.find('.delete').at(1)
    })

    it('exists', () => {
      expect(_deleteUnread).to.exist()
      expect(_deleteUnread.text()).to.match(/Delete$/)
      expect(_deleteRead).to.exist()
      expect(_deleteRead.text()).to.match(/Delete$/)
    })

    it('Calls props.deleteMail when clicked and updates the store', () => {
      _spies.dispatch.should.have.not.been.called()

      _deleteUnread.simulate('click')
      _deleteRead.simulate('click')

      _spies.dispatch.should.have.been.called()
      _spies.deleteMail.should.have.been.called()

      _wrapper.setProps({
        messages : []
      })

      expect(_wrapper.find('.containerMailUnread').find('.message').text()).to.match(/There are no Unread messages$/)
      expect(_wrapper.find('.containerMailRead').find('.message').text()).to.match(/There are no Read messages$/)
    })
  })
})
