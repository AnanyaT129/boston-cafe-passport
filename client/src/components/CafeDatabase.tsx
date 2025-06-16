import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../configuration';
import { Cafe } from "../dataModels/cafe"
import CafeGrid from "./CafeGrid";

// App.js 

export function CafeDatabase() {
  const [data, setData] = useState(Array<Cafe>);

  const fetchPost = async () => {

    await getDocs(collection(db, "cafes"))
        .then((querySnapshot: { docs: any[]; })=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                setData(newData);                
            console.log(newData);
        })

  }

  useEffect(()=>{
    fetchPost();
  }, [])

  console.log(data)

  return (
    <div>
      <CafeGrid listOfCafes={data}></CafeGrid>
    </div>
  );
}