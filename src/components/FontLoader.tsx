'use client'

import { useEffect } from 'react'

export default function FontLoader() {
  useEffect(() => {
    const pretendard = document.createElement('link')
    pretendard.rel = 'stylesheet'
    pretendard.href =
      'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css'
    document.head.appendChild(pretendard)

    const headingFont = document.createElement('link')
    headingFont.rel = 'stylesheet'
    headingFont.href =
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
    document.head.appendChild(headingFont)

  }, [])

  return null
}
