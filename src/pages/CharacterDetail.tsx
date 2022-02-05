import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const getCharacter = async (id: string) => {
  const res = await fetch(
    `https://www.breakingbadapi.com/api/characters/${id}`
  );
  const data = await res.json();
  return data[0];
};

const CharacterDetail = () => {
  const { id } = useParams();
  if (!id)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Wait
      </div>
    );

  const { data, isLoading } = useQuery("character", () =>
    getCharacter(id)
  );

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Loading...
      </div>
    );

  return (
    <div className="p-10">
      <p className="text-4xl font-bold">Character Id</p>

      <p>Name: {data.name}</p>
    </div>
  );
};

export default CharacterDetail;
