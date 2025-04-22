import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const fileUrlGenerator = async (file, fileKey) => {
  
  try {
    const s3Client = new S3Client({
      region: "blr1",
      endpoint: "https://blr1.digitaloceanspaces.com",
      credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET,
      },
    });
    
    // const command = new PutObjectCommand({
    //   Bucket: "mp-portal",
    //   Key: fileKey,
    //   Body: file,
    //   ContentType: file.type,
    //   ACL: "public-read",
    // });


    await s3Client.send(new PutObjectCommand(
{
      Bucket: 'mp-portal',
      Key: fileKey,
      ContentType: file.type,
      Body: await file.arrayBuffer(),
      ACL: 'public-read',
    }
    ));

    // await s3Client.putObject();
    
    // await s3Client.send(command);

    const fileUrl = `https://mp-portal.blr1.digitaloceanspaces.com/${fileKey}`;
    
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default fileUrlGenerator;