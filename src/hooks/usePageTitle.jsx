import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title}`
      : "My English Learning Web App";
  }, [title]);
};

export default usePageTitle;