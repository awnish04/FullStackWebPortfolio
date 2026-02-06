import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const folder = (formData.get("folder") as string) || "uploads";

    if (!files.length) {
      return new Response(JSON.stringify({ error: "No files uploaded" }), {
        status: 400,
      });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error: any, result: unknown) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      })
    );

    return new Response(JSON.stringify(uploads), { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(
      JSON.stringify({ error: "Upload to Cloudinary failed" }),
      { status: 500 }
    );
  }
}
