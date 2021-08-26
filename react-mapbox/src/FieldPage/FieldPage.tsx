import FieldList, { IFieldData } from "./FieldList/FieldList";

const FieldPage = () => {

    // get fake data
    let fakeData: IFieldData[] = [];
    const fakeListField = JSON.parse(localStorage.getItem("fakeDB")!);
    if(fakeListField)
    fakeListField.forEach((fakeDBInstance: string) => {
        const fakeInstanceData = JSON.parse(localStorage.getItem(fakeDBInstance)!);
        fakeData.push(fakeInstanceData)
    })
    console.log(fakeData)
    
  return (
    <div>
      <div className="field-page">
        <FieldList data={fakeData} />
      </div>
    </div>
  );
};

export default FieldPage;
