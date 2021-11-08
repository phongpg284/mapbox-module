import { useEffect, useState } from "react";

const FieldPage: React.FC = ({ children }: any) => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://dinhvichinhxac.online/api/task/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  },[]);

  useEffect(() => {
    console.log("render page")
    console.log(data)
  });
  
  return (
    <div>
      <div className="bg-light" style={{ width: "100%" }}>
        {children(data)}
      </div>
    </div>
  );
};

export default FieldPage;
