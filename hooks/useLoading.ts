import Router from "next/router";
import { useEffect, useState } from "react";

export const useLoading = () => {
  const [nowLoading, setNowLoading] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const start = () => {
      clearTimeout(timer); 
      setNowLoading(true);
    };

    const end = () => {
      timer = setTimeout(() => {
        setNowLoading(false);
      }, 200);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    window.onload = () => {
      clearTimeout(timer); 
      setNowLoading(false);
    };

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
      clearTimeout(timer);
    };
  }, []);

  return nowLoading;
};
