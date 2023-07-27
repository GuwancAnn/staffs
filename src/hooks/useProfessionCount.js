import { useEffect, useState } from "react";
import supabase from "../Components/client";

const useProfessionCount = () => {
  const [professionCount, setProfessionCount] = useState();

  const _getProfessionCount = async () => {
    const { data, count } = await supabase
      .from("professions")
      .select("*", { count: "exact" });

    if (count) {
      setProfessionCount(count);
    }
  };

  useEffect(() => {
    _getProfessionCount();
  }, []);

  return {
    professionCount,
  };
};

export default useProfessionCount;
