import { supabase } from './supabase';

export async function uploadImage(file: File, bucket = 'portfolios'): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to bucket
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.warn("Supabase upload failed, falling back to base64 encoding:", error);
    // Base64 fallback for local dev / demo
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as data URL"));
        }
      };
      reader.onerror = () => reject(new Error("File reading error"));
      reader.readAsDataURL(file);
    });
  }
}
