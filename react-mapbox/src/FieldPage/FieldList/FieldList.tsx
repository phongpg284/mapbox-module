import { Button, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { WarningFilled } from "@ant-design/icons";
import "./style.css";
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
              <Button type="primary" size="large">
                Detail
              </Button>
            </div>

            <div>
              <Button
                type="primary"
                danger
                onClick={showConfirmModal}
                size="large"
              >
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
                <WarningFilled
                  style={{ fontSize: "30px", margin: "0 10px", color: "gray" }}
                />
                Are you sure want to delete Field "{data.name}"
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const FieldList = ({ data }: IFieldListProps) => {
//   const history = useHistory();

//   const [fieldData, setFieldData] = useState(data);

//   const handleDeleteItem = (deleteField: any) => {
//     const newFieldData = fieldData.filter((field) => {
//       return field.name !== deleteField.name;
//     });
//     setFieldData(newFieldData);
//   };

//   return (
//     <div className="p-3">
//       <div className="title text-start fw-bold fs-3 mb-3 d-flex ">
//         <div>Field List</div>
//         <div className="ms-4">
//           <Button onClick={() => history.push("./create")}>Create Field</Button>
//         </div>
//       </div>
//       {fieldData &&
//         fieldData.map((field) => (
//           <div className="field-list">
//             <FieldListItem
//               key={field.name}
//               data={field}
//               deleteItem={handleDeleteItem}
//             />
//           </div>
//         ))}
//     </div>
//   );
// };

export const FieldList = ({ data }: IFieldListProps) => {
  const history = useHistory();

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>();
  const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    setTableData(
      data.map((field) => {
        return {
          name: field.name,
          area: field.area,
          createdAt: new Date(field.createdAt).toDateString(),
          key: field.createdAt,
        };
      })
    );
  }, [data]);
  // const tableData = data.map((field: IFieldData) => {
  //   return {
  //     name: field.name,
  //     createdAt: new Date(field.createdAt).toDateString(),
  //   };
  // });
  const changeConfirmModal = () => {
    setShowConfirm(!showConfirm);
  };

  const columns: any = [
    {
      title: "",
      key: "image",
      dataIndex: "image",
      width: 50,
      render: () => (
        <img
          alt="no?"
          src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
          className="align-self-center"
          style={{ height: "40px" }}
        ></img>
      ),
    },
    {
      title: "Info",
      dataIndex: "info",
      key: "info",
      width: 800,
      render: (text: any, record: any) => (
        <div>
          <div className="fw-bold fs-6">{record.name}</div>
          <div className="fw-bold fs-6">{record.area} m2</div>
        </div>
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 1000,
      responsive: ["sm"],
      render: (text: any, record: any) => (
        <div>Registered: {record.createdAt}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="control-buttons">
          <Button type="primary" size="large">
            Detail
          </Button>

          <Button
            type="primary"
            danger
            size="large"
            onClick={() => {
              changeConfirmModal();
              setDeleteItem(record);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    // TODO: CALL DELETE API
    console.log(deleteItem, "hehe");
    localStorage.removeItem(deleteItem.name);
    localStorage.setItem(
      "fakeDB",
      JSON.stringify(
        JSON.parse(localStorage.getItem("fakeDB")!).filter((item: any) => {
          return item !== deleteItem.name;
        })
      )
    );
    setShowConfirm(false);

    const newFieldData = data.filter((field: any) => {
      return field.name !== deleteItem.name;
    });
    setTableData(newFieldData);
    deleteItem(data);
  };

  return (
    <div className="p-3">
      <div className="title text-start fw-bold fs-3 mb-3 d-flex ">
        <div>Field List</div>
        <div className="ms-4">
          <Button onClick={() => history.push("./create")}>Create Field</Button>
        </div>
      </div>
      <div>
        <Table dataSource={tableData} columns={columns} showHeader={false} />
      </div>
      <div>
        <Modal
          visible={showConfirm}
          onOk={handleDelete}
          onCancel={changeConfirmModal}
          okText="OK"
          cancelText="Cancel"
        >
          <div>
            <WarningFilled
              style={{ fontSize: "30px", margin: "0 10px", color: "gray" }}
            />
            Are you sure want to delete Field "{deleteItem?.name}"
          </div>
        </Modal>
      </div>
    </div>
  );
};
