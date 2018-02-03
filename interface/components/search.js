import _ from '_' // eslint-disable-line
import _animateStyle from '_/animate-style' // eslint-disable-line
import _append from '_/append' // eslint-disable-line
import _remove from '_/remove' // eslint-disable-line
import _assign from '__/assign' // eslint-disable-line
import _normalizeKey from '__/normalize-key' // eslint-disable-line
import _delayInterval from '__/delay-interval' // eslint-disable-line
import * as coords from '../helpers/search/coords'
import state, { update } from '../helpers/search/state'
import cloneClearIcon from '../helpers/clear-icon'
import '../styles/search.sass'

const duration = 100

const showClear = () => {
  _append($search, $clear)

  _animateStyle($clear, { duration }, { opacity: 0 }, { opacity: 1 })
}

const hideClear = async () => {
  await _animateStyle($clear, { duration }, { opacity: 1 }, { opacity: 0 })

  _remove($clear)
}

export const $clear = _({
  el: 'button',
  coords: coords.clear,
  class: 'clear',
  append: cloneClearIcon({
    coords: coords.clearIcon,
  }),
  events: {
    click: () => {
      _assign($input, { value: '' })

      hideClear()

      update({
        value: '',
        clear: false,
      })
    },
  },
})

const intervalUpdate = _delayInterval(update, 1500)

export const $input = _({
  el: 'input',
  class: 'input',
  events: {
    input: ({ target: { value } }) => {
      intervalUpdate({
        value,
        normalizedValue: _normalizeKey(value),
      })

      if (value && !state.clear) {
        showClear()

        state.clear = true
      } else if (!value && state.clear) {
        hideClear()

        state.clear = false
      }
    },
  },
  placeholder: 'Search',
})

const $search = _({
  class: 'search',
  append: [$input],
})

export default $search
