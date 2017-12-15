const append = require('./append')

module.exports = function createElement(tagName, options, $children) {
  const $element = document.createElement(tagName)

  if (options) Object.assign($element, options)

  if ($children) append($element, $children)

  return $element
}
