import React from "react";
import Carouzel from "../../../components/carouzel/Carouzel";
import useFetch from "../../../hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <Carouzel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendations;
