import { useEffect, useState } from "react";
import { IFieldData } from "./FieldList";

const FieldPage: React.FC = ({ children }: any) => {
  // get fake data
  // let fakeData: IFieldData[] = [];
  // const fakeListField = JSON.parse(localStorage.getItem("fakeDB")!);
  // if (fakeListField)
  //   fakeListField.forEach((fakeDBInstance: string) => {
  //     const fakeInstanceData = JSON.parse(
  //       localStorage.getItem(fakeDBInstance)!
  //     );
  //     fakeData.push(fakeInstanceData);
  //   });
  const [data, setData] = useState();
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL!, {
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
      {/* <div
        className="header"
        style={{ height: "7%", backgroundColor: "#00a26a" }}
      ></div> */}
      <div className="bg-light" style={{ width: "100vw" }}>
        {children(data)}
      </div>
    </div>
  );
};

export default FieldPage;
