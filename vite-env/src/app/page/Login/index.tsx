import * as React from "react";
import "./index.scss";
import { Stack, TextField } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { closeLoading, openLoading, setRole, setUsername } from "../../../redux/reducers";
import Api from "../../../api";
import { LoadingLogin } from "../../common/loading";

export const Login: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loading = useSelector<RootState>(state => state.loading.isLoading)
    const buttonRef = React.useRef(null);
    const dispatch = useDispatch();
    const history = useNavigate()

    const clickSave = async () => {
        if(!userName || !password){
            setErrorMessage("Hãy nhập tên đăng nhập/mật khẩu");
            return;
        }
        const reqbody = {
            username: userName,
            password: password
        }
        dispatch(openLoading());
        Api.authApi.login(reqbody).then(data => {
            const {accessToken, refreshToken, role, username } = data.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("username", username);
            dispatch(setRole(role));
            dispatch(setUsername(username));
            history("/");
        }).catch(err => {
            const { message } = err.response.data;
            setErrorMessage(message)
        }).finally(() => dispatch(closeLoading()))
    }

    const handleKeyDown = (e: any) => {
      if(e.key === 'Enter') {
        (buttonRef.current! as any).click();
      }
    }

    return (
        <>
            {loading ? <LoadingLogin /> : <React.Fragment />}
            <Stack
                className="login-container"
                horizontalAlign="center"
                verticalAlign="center"
                onKeyDown={handleKeyDown}
                style={{background: "url(https://res.cloudinary.com/justinpham311/image/upload/v1689872100/benhvien/2_ax63na.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
            >
                <div id="overlay-login"></div>
                <div id="header-login">
                  
                </div>
                <Stack className="login-form-container">
                    <Stack className="form-container">
                        <Stack horizontalAlign="center" className="logo" >
                            Đăng nhập
                        </Stack>
                        <TextField
                            label="Tên đăng nhập"
                            value={userName}
                            onChange={(_, val) => {
                                setErrorMessage("")
                                if (val!) {
                                    const name = val!.trim();
                                    setUserName(name);
                                }
                                else setUserName("")
                            }}
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            canRevealPassword={true}
                            value={password}
                            onChange={(_, val) => {
                                setErrorMessage("")
                                if (val!) {
                                    if (val.length < 6) {
                                        setErrorMessage('Mật khẩu có độ dài tối thiểu 6 kí tự')
                                    }
                                    const pwd = val!.trim();
                                    setPassword(pwd);
                                } else setPassword("");
                            }}
                        />
                        <Stack className="error-message">{errorMessage}</Stack>
                        <button className="log-in-btn" onClick={clickSave} ref={buttonRef}>Đăng nhập</button>
                        <Stack horizontalAlign="end" >
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>

    )
}
