import { HeadMetaInterface } from "@/interfaces/headMeta.interface";
import Head from "next/head";

const HeadMeta = ({ title, description, url, image }: HeadMetaInterface) => {
  return (
    <Head>
      <title>{title || "오늘 운동 하셨죠?"}</title>
      <meta
        name="description"
        content={
          description ||
          "오운완? 운동기록장"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "오운완? 운동기록장"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={"https://app.ounwan.net/" + url} />
      <meta property="og:image" content={"https://app.ounwan.net/icon.png"} />
      <meta property="og:description" content={description || "운동기록, 몸상태 기록"} /> 
      <meta property="og:article:author" content="오운완? 운동기록장" />
      <meta property="og:site_name" content="오운완? 운동기록장" />
    </Head>
  );
};

export default HeadMeta;