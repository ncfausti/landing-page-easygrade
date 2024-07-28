// 'use client';
// import React, { useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// // Initialize the Supabase client
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const ImageUploader = ({ bucketName }) => {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState(null);
//   const [error, setError] = useState(null);

//   // TODO: implement checks on the assignment ID, student ID, and assignment_template ID
//   // make sure the QR code matches the url and the assignment ID

//   const uploadImage = async (file) => {
//     setIsUploading(true);
//     setError(null);

//     try {
//       // Generate a unique file name
//       const fileName = `${Date.now()}_${file.name}`;

//       // Upload the file to Supabase storage
//       const { error: uploadError } = await supabase.storage
//         .from(bucketName)
//         .upload(fileName, file);

//       if (uploadError) throw uploadError;

//       // Get the public URL of the uploaded file
//       const {
//         data: { publicUrl },
//       } = supabase.storage.from(bucketName).getPublicUrl(fileName);

//       // upsert the file URL to the 'assignment' table for the given assignment ID
//       await supabase
//         .from('assignment')
//         .upsert({ id: assignmentId, fileUrl: publicUrl });

//       setUploadedUrl(publicUrl);
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       setError('Failed to upload image. Please try again.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       uploadImage(file);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         disabled={isUploading}
//       />
//       {isUploading && <p>Uploading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {uploadedUrl && (
//         <div>
//           <p>Upload successful!</p>
//           <img
//             src={uploadedUrl}
//             alt="Uploaded file"
//             style={{ maxWidth: '300px' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;
