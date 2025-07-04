import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

export async function getServerSideProps({ params }: any) {
  const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const file = data.find((f: any) => f.slug === params.slug) || null;
  return { props: { file } };
}

export default function Embed({ file }: any) {
  if (!file) return <p>File tidak ditemukan</p>;

  const url = `/uploads/${file.file}`;
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      {file.type === "video" && <video src={url} controls autoPlay className="max-w-full max-h-screen" />}
      {file.type === "image" && <img src={url} alt={file.name} className="max-w-full max-h-screen" />}
      {file.type === "audio" && <audio src={url} controls autoPlay className="w-full" />}
    </div>
  );
}
