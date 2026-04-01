import { supabase } from './supabase'

const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080
const QUALITY = 0.8

function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      let { width, height } = img

      if (width <= MAX_WIDTH && height <= MAX_HEIGHT && file.size <= 1024 * 1024) {
        resolve(file)
        return
      }

      const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Image compression failed'))
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }))
        },
        'image/webp',
        QUALITY,
      )
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

export async function uploadBlogImage(file: File): Promise<string> {
  const compressed = await compressImage(file)

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
  const filePath = `covers/${fileName}`

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, compressed)

  if (error) throw error

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
