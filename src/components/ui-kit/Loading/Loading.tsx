import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useLocale } from "react-targem";

interface LoadingProps {
  label?: string;
}

const Loading: React.FC<LoadingProps> = ({ label }: LoadingProps) => {
  const { t } = useLocale();
  return (
    <FontAwesomeIcon
      fixedWidth
      aria-label={label || t("Loading")}
      spin
      icon={faSync}
    ></FontAwesomeIcon>
  );
};

export default Loading;
