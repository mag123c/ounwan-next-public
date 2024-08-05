import { Form } from "react-bootstrap";

interface SigninInputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

function SigninInput({ type, value, onChange, placeholder }: SigninInputProps) {

    return (
        <Form.Group>
            <Form.Control
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />            
        </Form.Group>
    );
}

export default SigninInput;
