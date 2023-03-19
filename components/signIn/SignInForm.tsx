import { ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react';
import Link from 'next/link';

import useForm from 'hooks/useForm';
import { signInValidate } from 'utils/validate';
import { SIGN_UP_FORM_NAMES } from 'constants/account';

import * as S from './SignInForm.styles';
import SocialLoginBox from './SocialLoginBox';
import { usersAPI } from 'api/users';
import { doSignIn } from 'utils/auth';

const SignInForm = () => {
  const {
    values,
    errors,
    isSubmitable: isValid,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm({
    accountId: '',
    accountPw: '',
  });

  const onValid = async () => {
    if (!isValid) return alert(errors?.accountId || errors?.accountPw);

    const signInResult = await usersAPI.signIn(values);

    if (signInResult) {
      doSignIn(signInResult.accessToken);
      window.location.replace('/');
    }
  };

  useEffect(() => {
    const newErrors = signInValidate(values);
    setErrors(newErrors);
  }, [values, setErrors]);

  const props = {
    onValid,
    handleChange,
    handleSubmit,
  };

  return <SignInFormView {...props} />;
};

interface SignInFormViewProps {
  onValid: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, fn: () => void) => void;
}

const SignInFormView = ({ handleChange, ...rest }: SignInFormViewProps) => (
  <S.Card>
    <S.Form title="Login" {...rest}>
      <S.FormContent>
        <S.Input
          name={SIGN_UP_FORM_NAMES.ACCOUND_ID}
          type="email"
          placeholder="이메일"
          handleChange={handleChange}
        />
        <S.Input
          name={SIGN_UP_FORM_NAMES.ACCOUNT_PW}
          type="password"
          placeholder="비밀번호"
          handleChange={handleChange}
        />
        <S.RememberMeBox>
          <S.CheckBox type="checkbox" />
          <S.RememberMeText>자동 로그인</S.RememberMeText>
        </S.RememberMeBox>

        <S.ButtonBox>
          <S.Button type="submit" large color="primary">
            로그인
          </S.Button>
          <Link href="/sign-up">
            <S.Button large color="black">
              이메일로 회원가입
            </S.Button>
          </Link>
        </S.ButtonBox>
      </S.FormContent>
      <S.FindBox>
        <Link href="/test">
          <S.FindId>아이디 찾기</S.FindId>
        </Link>
        <S.FindPassword>비밀번호 찾기</S.FindPassword>
      </S.FindBox>
      <SocialLoginBox />
    </S.Form>
  </S.Card>
);

export default SignInForm;
