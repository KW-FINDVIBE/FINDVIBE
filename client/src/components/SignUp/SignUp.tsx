/* eslint-disable no-control-regex */
import Footer from "../Footer/Footer";
import GridLayout from "../Layout/GridLayout";
import useVH from "react-viewport-height";
import { useState } from "react";
import { sendSignUpRequest, SignUpUserInfo } from "../../API/user";
import { useNavigate } from "react-router-dom";

const SignUp: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const vh = useVH();

  const [userData, setUserData] = useState<SignUpUserInfo>({
    email: "",
    password: { value: "", check: "" },
    nickname: "",
  });

  const emailReg = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const checkPassword = () => {
    if (userData.password.value.length < 7) {
      alert("비밀번호 길이가 짧습니다.");
    } else if (!emailReg.test(userData.email)) {
      alert("메일이 잘못됬습니다.");
    } else if (
      !/[^0-9]/.test(userData.password.value) ||
      !/[a-zA-Z]/.test(userData.password.value)
    ) {
      alert("반드시 영어,숫자를 포함해야합니다.");
    } else if (userData.password.value !== userData.password.check) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      return true;
    }
    return false;
  };
  return (
    <main
      className="relative top-[64px] flex items-center justify-center"
      style={{ height: 100 * vh - 64 }}
    >
      <GridLayout className="place-items-center justify-items-start break-keep ">
        <div className="text-[2em] font-pretendardBold col-span-6 tablet:col-start-2 tablet:col-span-11 justify-self-start text-deeporange">
          SIGN UP
        </div>
        <div className="col-start-1 tablet:col-start-2 tablet:col-span-2 desktop:col-start-3 desktop:col-end-5 ">
          이메일
        </div>
        <input
          className="col-span-5 tablet:col-span-6 desktop:col-start-5 desktop:col-end-9 outline-0 rounded-[10px] border p-4 w-full"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        ></input>
        <div className="col-start-1 tablet:col-start-2 tablet:col-span-2 desktop:col-start-3 desktop:col-end-5 ">
          닉네임
        </div>
        <input
          className="col-span-5 tablet:col-span-6 desktop:col-start-5 desktop:col-end-9 outline-0 rounded-[10px] border p-4 w-full"
          value={userData.nickname}
          onChange={(e) => {
            setUserData({ ...userData, nickname: e.target.value });
          }}
        ></input>
        <div className="col-start-1 tablet:col-start-2 tablet:col-span-2 desktop:col-start-3 desktop:col-end-5 ">
          비밀번호
        </div>
        <input
          className="col-span-5 tablet:col-span-6 desktop:col-start-5 desktop:col-end-9 outline-0 rounded-[10px] border p-4 w-full"
          type="password"
          value={userData.password.value}
          onChange={(e) => {
            setUserData({
              ...userData,
              password: { ...userData.password, value: e.target.value },
            });
          }}
        ></input>
        <div className="col-start-1 tablet:col-start-2 tablet:col-span-2 desktop:col-start-3 desktop:col-end-5 ">
          비밀번호 확인
        </div>
        <input
          className="col-span-5 tablet:col-span-6 desktop:col-start-5 desktop:col-end-9 outline-0 rounded-[10px] border p-4 w-full"
          type="password"
          value={userData.password.check}
          onChange={(e) => {
            setUserData({
              ...userData,
              password: { ...userData.password, check: e.target.value },
            });
          }}
        ></input>
        <div className="col-span-6 tablet:col-start-2 tablet:col-end-12 desktop:col-start-2 desktop:col-end-12 w-full border-t border-deeporange my-[2em]"></div>
        <div className="col-span-6 tablet:col-start-2 tablet:col-end-12 desktop:col-start-5 desktop:col-end-9 w-full">
          <p className="text-[12px] text-[#767676] flex flex-col items-center">
            비밀번호는 숫자,영어 포합 8자 이상이여야 합니다.
          </p>
          <div className="flex items-center w-full justify-between my-4">
            <button
              className="border border-deeporange font-pretendardBold w-full mr-[20px] px-4 py-2 rounded-[15px] text-deeporange"
              onClick={() => {
                setUserData({
                  email: "",
                  password: { value: "", check: "" },
                  nickname: "",
                });
              }}
            >
              초기화
            </button>
            <button
              className="font-pretendardBold w-full px-4 py-2 rounded-[15px] text-white bg-gradient-to-r from-deeporange to-shalloworange"
              onClick={() => {
                if (checkPassword()) {
                  sendSignUpRequest(userData).then((res) => {
                    if (!res.success) {
                      return;
                    }
                    navigate("/signin");
                  });
                }
              }}
            >
              회원가입
            </button>
          </div>
        </div>
      </GridLayout>
      <Footer />
    </main>
  );
};

export default SignUp;
