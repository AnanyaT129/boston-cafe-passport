import React from "react";
import CafeGrid from "./CafeGrid";
import { useQuery } from "@apollo/client";
import { GET_ALL_CAFES } from "../dataModels/queries";

export function CafeDatabase() {
  const { loading, error, data } = useQuery(GET_ALL_CAFES);

  console.log('Data from query:', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <CafeGrid listOfCafes={data?.getAllCafes || []}></CafeGrid>
    </div>
  );
}