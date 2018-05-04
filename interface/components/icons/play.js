import _ from '_'
import cloner_ from '_/cloner'

export default cloner_(
  {
    svg: true,
    class: 'icon play',
    attributes: {
      viewBox: '0 0 18 20.36',
      stroke: 'inherit'
    },
    append: _({
      svg: 'path',
      attributes: {
        d:
          'M17.26,9.75,1.25.57A.5.5,0,0,0,.5,1V19.37a.5.5,0,0,0,.75.43l16-9.19A.5.5,0,0,0,17.26,9.75Z'
      }
    })
  },
  true
)