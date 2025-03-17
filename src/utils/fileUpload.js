import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const fileUrlGenerator = async (file, userName) => {
  try {
    const s3Client = new S3Client({
      region: "blr1",
      endpoint: "https://blr1.digitaloceanspaces.com",
      credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "DO00JMAAK77Y3LJLFLAD",
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY ||
          "/VgFwR4MRkbJHQLk0ttVOD9M8G4V8JUGHqO4kuXL7do",
      },
    });
    
    // Using userName parameter instead of taskData.name
    const fileKey = `${userName}-${file.name}`;
    
    const command = new PutObjectCommand({
      Bucket: "ca-2025",
      Key: fileKey,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    });
    
    console.log("command is ", command);
    
    await s3Client.send(command);
    const fileUrl = `https://ca-2025.blr1.digitaloceanspaces.com/${fileKey}`;
    
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default fileUrlGenerator;