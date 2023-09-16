import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleLogin = () => {
        if (!email || !password) {
            toast.error("Undefined email or password!");
            return;
        } else {
            if (email === "long@gmail.com" && password === "long") {
                navigate("/");
            } else {
                toast.error("Wrong email or password!");
                return;
            }
        }
    }
    return (
        <div className="container d-flex flex-column col col-lg-4 col-6 py-5">
            <div className="title m-auto fw-bold fs-3 py-2">Login</div>
            <div className="text fw-bold">Email or username:</div>
            <input type="text" className="form-control shadow-none" placeholder="Enter email or username" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <div className="d-flex align-items-center my-2 position-relative">
                <input type={isShowPassword === true ? "text" : "password"} className="form-control shadow-none col-10" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <i className={`${isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} position-absolute`} style={{right: "10px"}} onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>
            <button className={`btn ${(email && password) ? "btn-primary" : "btn-secondary" } my-2`} onClick={handleLogin}>Login</button>
            <div className="text-center my-2 pe-auto go-back">
                <i className="fa-solid fa-angles-left me-2"></i>
                Go back
            </div>
        </div>
    )
}
export default Login;