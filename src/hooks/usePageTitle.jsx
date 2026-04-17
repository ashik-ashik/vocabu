import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title}`
      : "My Vocabulary Dictionary Web App";
  }, [title]);
};

export default usePageTitle;