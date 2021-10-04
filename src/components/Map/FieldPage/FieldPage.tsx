import { useEffect, useState } from "react";

const FieldPage: React.FC = ({ children }: any) => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/api/bounds", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  },[]);

  useEffect(() => {
    console.log("render page")
  });
  
  return (
    <div>
      <div className="bg-light" style={{ width: "100vw" }}>
        {children(data)}
      </div>
    </div>
  );
};

export default FieldPage;
