import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { WarningFilled } from "@ant-design/icons";

export interface IFieldData {
  name: string;
  area: number;
  data: any;
  createdAt: string;
}

interface IFieldListItemProps {
  data: IFieldData;
  deleteItem: (data: IFieldData) => void;
}

interface IFieldListProps {
  data: IFieldData[];
}

const FieldListItem = ({ data, deleteItem }: IFieldListItemProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmModal = () => {
    setShowConfirm(!showConfirm);
  };

  const handleDelete = () => {
    // TODO: CALL DELETE API
    localStorage.removeItem(data.name);
    localStorage.setItem(
      "fakeDB",
      JSON.stringify(
        JSON.parse(localStorage.getItem("fakeDB")!).filter((item: any) => {
          return item !== data.name;
        })
      )
    );
    setShowConfirm(false);
    deleteItem(data);
  };

  return (
    <div className="wrapper p-3 border ">
      <div className="container-fluid">
        <div className="filed-list-item row align-items-center">
          <div className="info-container col-5 d-flex justify-content-start">
            <img
              alt="no?"
              src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
              className="align-self-center me-3"
              style={{ height: "40px" }}
            ></img>
            <div className="text-start fw-bold">
              <div className="field-name">
                <div>{data.name}</div>
              </div>
              <div className="field-area">
                <div>{data.area} m2</div>
              </div>
            </div>
          </div>

          <div className="create-time col-md-4 d-flex justify-content-start">
            <div>Registered: {new Date(data.createdAt).toDateString()}</div>
          </div>
          <div className="function-buttons-container d-flex justify-content-end col">
            <div>
              <Button type="primary" size="large">Detail</Button>
            </div>

            <div>
              <Button type="primary" danger onClick={showConfirmModal} size="large">
                Delete
              </Button>
            </div>
          </div>
          <div>
            <Modal
              visible={showConfirm}
              onOk={handleDelete}
              onCancel={showConfirmModal}
              okText="OK"
              cancelText="Cancel"
            >
              <div>
                <WarningFilled style={{fontSize: "30px", margin: "0 10px", color: "gray"}}/>
                Are you sure want to delete Field "{data.name}"
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

const FieldList = ({ data }: IFieldListProps) => {
  const history = useHistory();

  const [fieldData, setFieldData] = useState(data);

  const handleDeleteItem = (deleteField: any) => {
    const newFieldData = fieldData.filter((field) => {
      return field.name !== deleteField.name;
    });
    setFieldData(newFieldData);
  };

  return (
    <div className="p-3">
      <div className="title text-start fw-bold fs-3 mb-3 d-flex ">
        <div>Field List</div>
        <div className="ms-4">
          <Button onClick={() => history.push("./create")}>Create Field</Button>
        </div>
      </div>
      {fieldData &&
        fieldData.map((field) => (
          <div className="field-list">
            <FieldListItem
              key={field.name}
              data={field}
              deleteItem={handleDeleteItem}
            />
          </div>
        ))}
    </div>
  );
};

export default FieldList;
