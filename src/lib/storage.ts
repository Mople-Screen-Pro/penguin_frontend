import { supabase } from './supabase'

export async function uploadBlogImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `covers/${fileName}`

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
