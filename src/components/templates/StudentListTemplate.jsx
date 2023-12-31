import { Space, Table, Tag, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { btFormActions } from 'store';
import styled from 'styled-components'
const TextInput = styled.input`
    padding: 6px;
    border-radius: 6px;
    border: 2px solid ${props => props.$invaild ? "#ef4444" : "#d1d5db"};
    outline: 2px solid transparent;
    transition: border-color .3s;
    &:focus{
        border-color: ${props => props.$invaild ? "#ef4444" : "#65a30d"};
    }
    &:disabled{
        background-color: #f3f4f6;
        pointer-events: none;
    }
`;
export const StudentListTemplate = () => {
  const { studentList, studentEditing } = useSelector(state => state.btFormRedux);
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <Tag color='green'>{name.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle' align='center'>
          <Popconfirm
            placement="leftBottom"
            title="Vui lòng xác nhận?"
            description="Tiếp tục chỉnh sửa một sinh viên khác, sẽ hủy thông tin đang chỉnh sửa chưa lưu, bạn có muốn tiếp tục?"
            onConfirm={() => dispatch(btFormActions.editStudent(record))}
            okText="Có"
            cancelText="Không"
            disabled={!studentEditing}
          >
            <button
              className='w-[30px] h-[30px] rounded-6 flex items-center justify-center transition-colors duration-300 hover:bg-lime-600 hover:text-white'
              onClick={() => {
                if (!studentEditing)
                  dispatch(btFormActions.editStudent(record));
              }}
            >
              <i className="fa fa-edit"></i>
            </button>
          </Popconfirm>
          <Popconfirm
            placement="leftBottom"
            title="Bạn chắc rằng muốn xóa?"
            description='Bấm vào "Có" để thực hiện xóa sinh viên này.'
            onConfirm={() => dispatch(btFormActions.deleteStudent(record.code))}
            okText="Có"
            cancelText="Không"
          >
            <button className='w-[30px] h-[30px] rounded-6 flex items-center justify-center hover:bg-lime-600 hover:text-white'>
              <i className="fa fa-trash-alt"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  let timer;
  const handleSearch = () => (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(btFormActions.searchStudent(event.target.value));
    }, 500);
  }
  return (
    <div>
      <div className="flex justify-between bg-gray-800 px-10 py-8">
        <h6 className='text-white text-20 font-600'>Danh sách sinh viên</h6>
        <TextInput
          className='text-black !w-[300px]'
          placeholder='Gõ nội dung cần tìm kiếm'
          onChange={handleSearch()}
        />
      </div>
      <Table columns={columns} dataSource={studentList} rowKey={"code"} pagination={{ pageSize: 5 }} />
    </div>
  )
}