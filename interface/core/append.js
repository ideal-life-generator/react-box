const { keys } = Object

const childrenToString = (children) => {
  if (typeof children === 'object') {
    return `object {${keys(children)}}`
  }

  return children.toString()
}

export default function append(node, children) {
  children = children.node || children

  if (Array.isArray(children)) {
    children.map((c) => append(node, c))
  } else if (typeof children === 'string') {
    node.textContent = children
  } else {
    try {
      node.appendChild(children.node || children)
    } catch (error) {
      throw new Error(`${childrenToString(children)} append in ${node}`)
    }
  }

  return node
}