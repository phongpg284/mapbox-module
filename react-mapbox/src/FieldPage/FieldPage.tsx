import { IFieldData } from "./FieldList";

const FieldPage: React.FC = ({ children }: any) => {
  // get fake data
  let fakeData: IFieldData[] = [];
  const fakeListField = JSON.parse(localStorage.getItem("fakeDB")!);
  if (fakeListField)
    fakeListField.forEach((fakeDBInstance: string) => {
      const fakeInstanceData = JSON.parse(
        localStorage.getItem(fakeDBInstance)!
      );
      fakeData.push(fakeInstanceData);
    });
  return (
    <div>
      {/* <div
        className="header"
        style={{ height: "7%", backgroundColor: "#00a26a" }}
      ></div> */}
      <div className="bg-light" style={{width: "100vw" }}>
        {children(fakeData)}
      </div>
    </div>
  );
};

export default FieldPage;
