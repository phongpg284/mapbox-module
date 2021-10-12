import style from "./index.module.scss";
import { Button, Table } from "antd";

const column = [
	{
		key: "ckey",
		dataIndex: "ckey",
		render: (text: string) => <h6 style={{ fontWeight: "bold" }}>{text}</h6>,
	},
	{
		key: "value",
		dataIndex: "value"
	}

]

const dataSource = [
	{
		key: "1",
		ckey: "Mã dự án",
		value: "DP CM",
	},
	{
		key: "2",
		ckey: "Tên gói thầu",
		value: "Gói thầu số 14",
	},
	{
		key: "3",
		ckey: "Mô tả tổng quan",
		value: "Dự án đê chắn sóng là dự án hạng tầng kĩ thuật",
	},
	{
		key: "4",
		ckey: "Thời gian thi công",
		value: "18/12/2017 - 31/12/2022",
	},
	{
		key: "5",
		ckey: "Địa điểm thi công",
		value: "Thừa thiên Huế",
	},
	{
		key: "6",
		ckey: "Giá trị hợp đồng",
		value: "100 tỷ",
	},
	{
		key: "7",
		ckey: "Thời gian hợp đồng",
		value: "18/12/2017 - 31/12/2022",
	},
	{
		key: "8",
		ckey: "Vai trò tham gia dự án",
		value: "Nhà thầu chính",
	},
	{
		key: "9",
		ckey: "Nguồn vốn thực hiện",
		value: "Ngân sách",
	},
	{
		key: "10",
		ckey: "Chủ đầu tư",
		value: "Không",
	},
	{
		key: "11",
		ckey: "Tư vấn thiết kế",
		value: "Tư vấn cảng đường thủy",
	},
	{
		key: "12",
		ckey: "Tư vấn giám sát",
		value: "ALD",
	},
	{
		key: "13",
		ckey: "Lãnh đạo",
		value: "Phạm kim châu",
	},
	{
		key: "14",
		ckey: "Phòng qlda",
		value: "phòng qlda1",
	},
	{
		key: "15",
		ckey: "Phòng qlda",
		value: "phòng qlda1",
	},
	{
		key: "16",
		ckey: "Phòng qlda",
		value: "phòng qlda1",
	},
];


const ProjectSummary = () => {
	return (
		<div className={style.project_summary_container}>
			<div className={style.project_summary_title}>Dự án đê chắn sóng cảng chân mấy</div>
			<div className={style.project_summary_content}>
				<Table className={style.project_table_content} columns={column} dataSource={dataSource} showHeader={false} pagination={false} />
			</div>
			<div className={style.project_update_button}>
				<Button >Cập nhật</Button>
			</div>
		</div>
	);
}

export default ProjectSummary;