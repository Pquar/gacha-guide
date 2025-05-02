'use client'
import { useEffect, useRef, useState } from 'react'

type YouTubeModalPlayerProps = {
  videoId: string
  title?: string
  start?: number
  end?: number
  buttonLabel?: string
}

export function YouTubeModalPlayer({
  videoId,
  title = 'Assistir vídeo',
  start,
  end,
  buttonLabel = '▶ Ver habilidade em ação'
}: YouTubeModalPlayerProps) {
  const [open, setOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }

    function blockScroll() {
      document.body.style.overflow = 'hidden'
    }

    function restoreScroll() {
      document.body.style.overflow = ''
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      blockScroll()
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      restoreScroll()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      restoreScroll()
    }
  }, [open])

  const buildSrc = () => {
    const base = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`
    const params = [
      start !== undefined ? `start=${start}` : null,
      end !== undefined ? `end=${end}` : null
    ]
      .filter(Boolean)
      .join('&')
    return `${base}&${params}`
  }

  const handleOpen = () => {
    setIframeLoaded(true)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setIframeLoaded(false)
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="mx-2 my-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {title}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 sm:px-0">
          <div
            ref={modalRef}
            className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg w-full max-w-2xl"
          >
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              {iframeLoaded && (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={buildSrc()}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
