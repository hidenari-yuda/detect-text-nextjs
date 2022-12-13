import { FC, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { FontWeight, FontSize, TextColor, Color, Radius } from 'styles/Enums'
import { PasswordInput, TextInput } from 'Components/Atomic'
import { emailAndPassSchema, EmailAndPassInputs } from 'Utils/ValidationScheme'
import {
  Box,
  Paper,
  Grid,
  Button,
  styled as materialStyled,
} from '@mui/material'
import { SnackbarContext } from 'Utils/SnackbarContext'
import { Snackbar } from 'Components/Atomic/Snackbar'
import { LoadingContext } from 'Utils/LoadingContext'
import { signInWithEmailAndPassword } from 'Infra/UserSession/SignIn'

const IndexTemplate = (): JSX.Element => {
  /*********************************************/
  // スナックバーとローディング
  //
  const { setSnackbarMessage, setType } = useContext(SnackbarContext)
  const loading = useContext(LoadingContext)

  /*********************************************/
  // フォーム関連
  //
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmailAndPassInputs>({
    resolver: emailAndPassSchema,
  })

  const signInUser = useCallback(
    async ({ email, password }: EmailAndPassInputs) => {
      loading.setIsShow(true) // ローディング開始
      await signInWithEmailAndPassword({
        email,
        password,
      })
        .then(() => {
          console.log('ログイン成功')
          loading.setIsShow(false) // ローディング終了
        })
        .catch((e) => {
          loading.setIsShow(false) // ローディング終了

          // アラート表示
          setSnackbarMessage(e.message)
          setType('error')
        })
    },
    []
  )
  /*********************************************/

  return (
    <Box style={{ height: '100vh', position: 'relative' }}>
      <Grid
        container
        alignItems={'center'}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <Grid item xs={1} md={3} /> {/*  スペーサー */}
        <Grid item xs={10} md={6}>
          <Snackbar />
          <Container elevation={3}>
            <Header>
              <Img src="/image/Logo.svg" />
              <FormTitle>エージェントログインフォーム</FormTitle>
            </Header>
            <Main>
              <Form onSubmit={handleSubmit(signInUser)}>
                <FormGroup>
                  <InputLabel>メールアドレス</InputLabel>
                  <TextInput
                    type={'text'}
                    {...register('email', { required: true })}
                    width={'100%'}
                    onChange={(e) => setValue('email', e.target.value)}
                    error={errors.email?.message}
                  />
                </FormGroup>
                <FormGroup>
                  <InputLabel>パスワード</InputLabel>
                  <PasswordInput
                    inputName={'password'}
                    {...register('password', { required: true })}
                    width={'100%'}
                    onChange={(e) => setValue('password', e.target.value)}
                    error={errors.password?.message}
                  />
                </FormGroup>
                <Buttons>
                  <FormGroup>
                    <Submit type={'submit'}>ログイン</Submit>
                  </FormGroup>
                  <FormGroup>
                    <LinkText href="password_reset">
                      パスワードを忘れた方はこちら
                    </LinkText>
                  </FormGroup>
                </Buttons>
              </Form>
            </Main>
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}

const Container = styled(Paper)`
  padding: 3rem 0;
`

const Header = styled.div`
  padding: 20px;
  border-bottom: 6px solid ${Color.Main};
  text-align: center;
`

const Img = styled.img`
  border: none;
  cursor: pointer;
  outline: none;
  background: transparent;
  height: 52px;
`

const FormTitle = styled.p`
  color: #666;
  font-size: ${FontSize.Px12};
  margin-top: 1rem;
`

const Main = styled.div`
  padding: 1rem 3rem;
`

const Form = styled.form`
  width: fit-content;
  block-size: fit-content;
  width: 100%;
  margin: 1rem auto;
  background: ${Color.Base};
  border-radius: ${Radius.Px16};
`

const InputLabel = styled.p`
  color: ${TextColor.Black};
  font-size: 14px;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Buttons = styled.div`
  margin: 2rem 0;
  text-align: center;
`

const Submit = materialStyled(Button)`
  background: ${Color.Main};
  color: ${TextColor.White};
  border-radius: ${Radius.Px4};
  width: 100%;
  font-size: 16px;
  &:hover {
    background: ${Color.MainHover};
  }
`

const LinkText = styled.a`
  color: ${Color.MainHover};
  font-weight: ${FontWeight.Bold};
  &:hover {
    text-decoration: underline;
  }
`

export default IndexTemplate
