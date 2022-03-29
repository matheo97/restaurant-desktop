import { useRef } from 'react'

function useFocus(): [any, () => void] {
  const ref = useRef(null)
  const focus = () => {
    if (ref && ref.current) {
      ref.current.focus()
    }
  }
  return [ref, focus]
}

export default useFocus
