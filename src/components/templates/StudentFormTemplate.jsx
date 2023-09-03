import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { checkEmail, checkPhone } from "utils"
import { btFormActions } from 'store'
const TextInput = styled.input`
    padding: 6px;
    width: 100%;
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
const FormMessage = styled.p`
    font-size: 14px;
    color: #ef4444;
`;
const TextButton = styled.button`
    background-color: #65a30d;
    color: white;
    padding: 6px 12px;
    border-radius: 3px;
`
export const StudentFormTemplate = () => {
    const [formValue, setFormValue] = useState();
    const [formError, setFormError] = useState();
    const dispatch = useDispatch();
    const { studentData, studentEditing } = useSelector(state => state.btFormRedux);
    const validate = (element) => {
        const { validity, value, title, name, maxLength } = element;
        const { valueMissing, tooLong } = validity;
        let msg = "";
        if (valueMissing)
            msg = `Vui lòng nhập ${title}.`;
        else if (tooLong)
            msg = `Giá trị ${title} không quá ${maxLength} ký tự.`;
        else if (!studentEditing && name === "code" && studentData.find(e => e.code === value))
            msg = `Đã tồn tại ${title} '${value}'.`;
        else if (name === "email" && !checkEmail(value))
            msg = `Không đúng định dạng ${title} .`;
        else if (name === "phone" && !checkPhone(value))
            msg = `Không đúng định dạng ${title} .`;
        return msg;
    }
    const handleFormValue = () => (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
        let msg = validate(event.target);
        setFormError({ ...formError, [name]: msg });
    }
    const handleSubmitForm = () => (event) => {
        event.preventDefault();
        let errors = {};
        document.querySelectorAll("#studentForm input").forEach(e => {
            const { name } = e;
            errors = { ...errors, [name]: validate(e) };
        });
        let flag = false;
        for (let e in errors) {
            if (errors[e]) {
                flag = true;
                break
            }
        }
        setFormError(errors);
        if (flag) return;
        if (!studentEditing)
            dispatch(btFormActions.addStudent(formValue));
        else
        dispatch(btFormActions.updateStudent(formValue));
        setFormValue({});
        setFormError({});
    }
    useEffect(() => {
        if (!studentEditing) return;
        setFormValue(studentEditing);
    }, [studentEditing]);
    return (
        <div>
            <h6 className="bg-gray-800 text-white text-20 font-600 px-10 py-8">Thông tin sinh viên</h6>
            <form
                id="studentForm"
                className="grid py-12 grid-cols-2 gap-12"
                noValidate
                onSubmit={handleSubmitForm()}
            >
                <div className="space-y-6 text-16">
                    <p className="text">Mã sinh viên</p>
                    <TextInput
                        name="code"
                        title='mã sinh viên'
                        value={formValue?.code || ''}
                        onChange={handleFormValue()}
                        required
                        maxLength={5}
                        $invaild={formError?.code}
                        disabled={studentEditing}
                    />
                    {formError?.code && <FormMessage>{formError?.code}</FormMessage>}
                </div>
                <div className="space-y-6 text-16">
                    <p className="text">Họ và tên</p>
                    <TextInput
                        name="name"
                        title='họ và tên'
                        value={formValue?.name || ''}
                        onChange={handleFormValue()}
                        required
                        maxLength={50}
                        $invaild={formError?.name}
                    />
                    {formError?.name && <FormMessage>{formError?.name}</FormMessage>}
                </div>
                <div className="space-y-6 text-16">
                    <p className="text">Số điện thoại</p>
                    <TextInput
                        name="phone"
                        title='số điện thoại'
                        value={formValue?.phone || ''}
                        onChange={handleFormValue()}
                        required
                        $invaild={formError?.phone}
                    />
                    {formError?.phone && <FormMessage>{formError?.phone}</FormMessage>}
                </div>
                <div className="space-y-6 text-16">
                    <p className="text">Email</p>
                    <TextInput
                        name="email"
                        title='email'
                        value={formValue?.email || ''}
                        onChange={handleFormValue()}
                        required
                        $invaild={formError?.email}
                    />
                    {formError?.email && <FormMessage>{formError?.email}</FormMessage>}
                </div>
                <div className="col-span-2 space-y-6 text-16">
                    {!studentEditing && <TextButton>Thêm sinh viên</TextButton>}
                    {studentEditing && (
                        <div className='space-x-6'>
                            <TextButton>Lưu lại</TextButton>
                            <TextButton
                                onClick={() => {
                                    dispatch(btFormActions.cancelEditing());
                                    setFormValue({});
                                    setFormError({});
                                }}
                            >Hủy</TextButton>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}