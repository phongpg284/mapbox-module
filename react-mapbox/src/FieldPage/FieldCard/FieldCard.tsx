import { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card } from "antd";
import Modal from "antd/lib/modal/Modal";
import { DeleteFilled, WarningFilled } from "@ant-design/icons";

const FieldCard = ({ data }: any) => {
  const history = useHistory();

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>();
  const [cardData, setCardData] = useState<any>();

  useEffect(() => {
    setCardData(
      data?.map((field: any) => {
        return {
          id: field._id,
          name: field.name,
          area: field.area,
          createdAt: new Date(field.createdAt).toDateString(),
          key: field.createdAt,
          img: field.img,
        };
      })
    );
  }, [data]);
  const changeConfirmModal = () => {
    setShowConfirm(!showConfirm);
  };

  const handleDelete = () => {
    // TODO: CALL DELETE API
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
    setCardData(newFieldData);
    setDeleteItem(data);
  };
  return (
    <div className="p-3">
      <div className="title text-start fw-bold fs-3 mb-3 d-flex ">
        <div>Field List(Card) </div>
        <div className="ms-4">
          <Button onClick={() => history.push("/field/create")}>
            Create Field
          </Button>
        </div>
        <div className="ms-4">
          <Button onClick={() => history.push("/field/list")}>List View</Button>
        </div>
      </div>
      <div className="">
        <div className="d-flex flex-wrap">
          {cardData &&
            cardData.map((item: any) => (
              <Fragment key={item.name}>
                <Link to={`/bounding/${item.id}`}>
                  <Card
                    hoverable
                    style={{ width: 200, margin: "5px" }}
                    cover={
                      <div
                        style={{
                          backgroundImage: `url("${item.img}")`,
                          height: "200px",
                        }}
                      >
                        <Button
                          className="float-end m-1"
                          danger
                          type="primary"
                          size="large"
                          icon={<DeleteFilled />}
                          onClick={changeConfirmModal}
                        />
                      </div>
                    }
                    // <img alt="example" src={item.img} />}
                  >
                    <div className="d-flex justify-self-start fs-6">
                      {item.name}
                    </div>
                    <div className="d-flex justify-self-start fw-bold fs-6">
                      {item.area} m2
                    </div>
                    {/* <Meta title={item.name} description={`${item.area} m2`} /> */}
                  </Card>
                </Link>
              </Fragment>
            ))}
        </div>
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

export default FieldCard;
