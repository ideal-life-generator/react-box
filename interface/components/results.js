import $ from 'core' // eslint-disable-line
import $collection from 'core/collection' // eslint-disable-line
import $params from 'core/params' // eslint-disable-line
import $text from 'core/text' // eslint-disable-line
import $animateStyle from 'core/animate-style' // eslint-disable-line
import $animateParams from 'core/animate-params' // eslint-disable-line
import $separator from 'core/separator' // eslint-disable-line
import { $take } from 'core/broadcast' // eslint-disable-line
import { $key } from 'core/normalize' // eslint-disable-line
import {
  $listﾟ,
  $itemﾟ,
  $titleﾟ,
  $separatorsﾟ,
  $separatorﾟ,
  results,
  item,
  separator,
} from '../settings/results'
import { searchChange } from '../settings/search'
import { userSongsMock } from '../../graphql/queries/songs'
import '../styles/results.sass'

const { height: itemHeight } = item

const ﾟsongs = $listﾟ()

const duration = 150

const $update = $collection(ﾟsongs, {
  create: i => {
    const ﾟtitle = $titleﾟ()

    return {
      ﾟ: $itemﾟ({
        append: ﾟtitle,
        params: { y: i * itemHeight },
        animateStyle: [{ duration }, { opacity: 0 }, { opacity: 1 }],
      }),
      ﾟtitle,
    }
  },
  update: { title: ({ ﾟtitle }, value) => $text(ﾟtitle, value) },
  move: ({ ﾟ }, { previousIndex: p, nextIndex: n }) =>
    $animateParams(ﾟ, { duration }, { y: p * itemHeight }, { y: n * itemHeight }),
  remove: async ({ ﾟ }) => await $animateStyle(ﾟ, { duration }, { opacity: 1 }, { opacity: 0 }),
  count: (ﾟparent, { nextCount: c }) => $params(ﾟparent, { height: c * itemHeight }),
})

const ﾟseparators = $separatorsﾟ()

$update.broadcast($separator(ﾟseparators, {
  create: i => $separatorﾟ({
    params: { y: (i * item.height) - (separator.height / 2) },
    animateStyle: [{ duration }, { opacity: 0 }, { opacity: 1 }],
  }),
  remove: async ﾟ => await $animateStyle(ﾟ, { duration }, { opacity: 1 }, { opacity: 0 }),
}))

$update(userSongsMock)

searchChange(value => $update(userSongsMock.filter(({ key }) => key.includes($key(value)))))

export default $({
  classes: 'results',
  params: results,
  append: [ﾟsongs, ﾟseparators],
})