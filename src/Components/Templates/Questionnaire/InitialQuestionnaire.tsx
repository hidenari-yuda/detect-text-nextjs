import {
  BaseSelect,
  ErrorText,
  MultiCheckBox,
  MultiSelectModal,
  SectionTitle,
  SelectContainer,
  SelectItem,
  TableBlock,
  TableContainer,
  Textarea,
  TextInput,
} from 'Components/Atomic'
import { Box, Grid, Button, styled as materialStyled } from '@mui/material/'
import { authrizedUserAtom } from 'Context/userAtom'
import { Search } from 'Entity/Model/FilteringSearchType'
// import { createEnterprise } from 'Infra/Enterprise/CreateEnterprise'
import { useRouter } from 'next/router'
import { FontWeight, FontSize, TextColor, Color, Radius } from 'styles/Enums'
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { usePostalJp } from 'use-postal-jp'
import { LoadingContext } from 'Utils/LoadingContext'
// import { useIndustrySelect } from 'Utils/MultiSelect/useIndustrySelect'
import { SnackbarContext } from 'Utils/SnackbarContext'
// import { enterpriseSchema } from 'Utils/ValidationScheme'
import { UnitInput } from 'Components/Atomic/Inputs/UnitInput'
// import { PublicOffering } from 'Entity/PublicOffering'
import AddIcon from '@mui/icons-material/Add'
// import { Industry } from 'Entity/Industry'
import styled from 'styled-components'

// type Props = {
//   enterpriseID: number
// }

export const TestForm: FC = () => {
  // const user = useRecoilValue(authrizedUserAtom)
  const router = useRouter()

  const loading = useContext(LoadingContext)
  const { setSnackbarMessage, setType } = useContext(SnackbarContext)

  const agentStaff = useRecoilValue(authrizedUserAtom)

  useEffect(() => {
    if (agentStaff != null) setValue('agentStaffId', agentStaff.id)
  }, [agentStaff])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<EnterpriseProfile>({
    resolver: enterpriseSchema,
    shouldFocusError: false,
    reValidateMode: 'onChange',
  })
  /*********************************************/
  // option
  //
  const makeOptions = (
    mapping: { [key: number]: string },
    keyLabel: string
  ): JSX.Element[] => {
    const list = Object.entries(mapping).map(([key, val]) => {
      return (
        <option key={`${keyLabel}-${key}`} value={key}>
          {val}
        </option>
      )
    })

    list.unshift(
      <option aria-readonly key={`${keyLabel}-not`} value={''}>
        選択してください
      </option>
    )

    return list
  }

  const makeOptionsForValuAndLabel = (
    mapping: { value: number; label: string }[],
    keyLabel: string
  ): JSX.Element[] => {
    const list = Object.entries(mapping).map(([key, val]) => {
      return (
        <option key={`${keyLabel}-${key}`} value={key}>
          {val.label}
        </option>
      )
    })

    list.unshift(
      <option aria-readonly key={`${keyLabel}-not`} value={''}>
        選択してください
      </option>
    )

    return list
  }

  /*********************************************/
  // 郵便番号関連（https://www.npmjs.com/package/use-postal-jp）
  //
  const [postCode, setPostCode] = useState('')
  const [address, error] = usePostalJp(postCode, postCode.length >= 7)

  // 住所検索
  useEffect(() => {
    const pre: HTMLInputElement = document.getElementById(
      'prefecture'
    ) as HTMLInputElement

    if (address != null) {
      const prefectureValue = Prefecture.mapping
        .filter((val) => val.label == address.prefecture)
        .map((val) => val.value)

      pre.value = prefectureValue[0].toString()
      setValue('prefecture', prefectureValue[0])
    } else {
      pre.value = ''
    }

    const ol: HTMLInputElement = document.getElementById(
      'officeLocation'
    ) as HTMLInputElement

    if (address != null) {
      ol.value = address.address1 + ' ' + address.address2
      setValue('officeLocation', ol.value)
    } else {
      ol.value = ''
    }
  }, [address])

  /*********************************************/
  // マルチセレクトダイアログ
  //

  // 希望業界
  const changeIndustries = useCallback((industries: (number | null)[]) => {
    setValue('industries', industries)
  }, [])

  const [industryState, industryInput] = useIndustrySelect()

  const [multiSelectType, setMultiSelectType] = useState<{
    title: string
    type: string
    valueTypes: (number | null)[]
    selectState: {
      label: string
      list: Search[]
      setList: (list: Search[]) => void
    }[]
    selectReset: () => void
    changeValue: (value: (number | null)[]) => void
    index?: number
  } | null>(null)

  const changeMultiSelectType = (
    title: string,
    type: string,
    valueTypes: (number | null)[],
    selectState: {
      label: string
      list: Search[]
      setList: (list: Search[]) => void
    }[],
    selectReset: () => void,
    changeValue: (value: (number | null)[]) => void
  ): void => {
    setMultiSelectType({
      title,
      type,
      valueTypes,
      selectState,
      selectReset,
      changeValue,
    })
  }

  const [isOpenMultiCheckModal, setIsMultiCheckOpenModal] = useState(false)

  const MultiCheckDialog = useMemo(() => {
    if (multiSelectType == null) return
    return (
      <MultiSelectModal
        modalTitle={multiSelectType.title}
        open={isOpenMultiCheckModal}
        isOpenModal={setIsMultiCheckOpenModal}
        searchState={multiSelectType.selectState}
        selectList={multiSelectType.valueTypes}
      >
        <MultiCheckBox
          type={multiSelectType.type}
          searchState={multiSelectType.selectState} // チェックボックスの選択肢関連のリスト
          isOpenModal={setIsMultiCheckOpenModal} // モーダル閉じる関数
          changeSelectList={multiSelectType.changeValue} // チェック値を保存する関数
          selectReset={multiSelectType.selectReset}
        />
      </MultiSelectModal>
    )
  }, [isOpenMultiCheckModal, multiSelectType])

  /*********************************************/
  // useForm onSubmit, onSubmitError
  //

  // 求職者作成の処理
  const onSubmit = useCallback(async (data: EnterpriseProfile) => {
    // loading.setIsShow(true)
    console.log(data)
    await createEnterprise(data)
      .then(() => {
        loading.setIsShow(false)

        // スナックバーの表示
        setType('success')
        setSnackbarMessage(`求人情報を登録しました`)

        // トップページへ
        router.push(`/search/enterprise`)
      })
      .catch((e) => {
        loading.setIsShow(false) // ローディング終了
        setType('error')
        return setSnackbarMessage(e)
      })
  }, [])

  // Submitがエラー時のアクション
  const onSubmitError: SubmitErrorHandler<EnterpriseProfile> | undefined = (
    errors
  ) => {
    setType('error')
    setSnackbarMessage(`入力内容をご確認ください`)
    console.error(errors)
  }

  return (
    <Box style={{ height: '100%', padding: '3rem 0' }}>
      <Grid container alignItems={'center'}>
        <Grid item xs={0.5} md={0.5} />
        <Grid
          item
          xs={11}
          md={11}
          sx={{
            background: Color.Base,
            borderRadius: Radius.Px4,
            padding: '3rem',
          }}
        >
          <FormTitle>企業登録</FormTitle>
          <Form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
            <SectionTitle hasBorder={true}>基本情報</SectionTitle>
            <TableContainer>
              <TableBlock title={'企業名'} required={true} widthPercent={30}>
                <TextInput
                  type={'text'}
                  width={'100%'}
                  {...register('companyName', { required: true })}
                  error={errors.companyName?.message}
                />
              </TableBlock>
              <TableBlock
                title={'サイトURL'}
                required={false}
                widthPercent={30}
              >
                <TextInput
                  type={'text'}
                  width={'100%'}
                  placeholder={'https://motoyui.com'}
                  {...register('corporateSiteUrl', { required: false })}
                  onChange={(e) => setValue('corporateSiteUrl', e.target.value)}
                  error={errors.corporateSiteUrl?.message}
                />
              </TableBlock>
              <TableBlock title={'代表者'} required={false} widthPercent={30}>
                <TextInput
                  type={'text'}
                  width={'100%'}
                  {...register('representative', { required: false })}
                  onChange={(e) => setValue('representative', e.target.value)}
                  error={errors.representative?.message}
                />
              </TableBlock>
              <TableBlock title={'設立'} required={false} widthPercent={30}>
                <TextInput
                  type={'date'}
                  width={'fit-content'}
                  {...register('establishment', { required: true })}
                  error={errors.establishment?.message}
                />
              </TableBlock>
              <TableBlock title={'郵便番号'} required={false} widthPercent={30}>
                <TextInput
                  type={'text'}
                  width={'100%'}
                  placeholder={'615-0014'}
                  {...register('postCode', { required: false })}
                  onChange={(e) => {
                    setValue('postCode', e.target.value)
                    setPostCode(e.target.value)
                  }}
                  error={
                    error ? '存在しない郵便番号です' : errors.postCode?.message
                  }
                />
              </TableBlock>
              <TableBlock title={'都道府県'} required={false} widthPercent={30}>
                <BaseSelect
                  id={'prefecture'}
                  width={'30%'}
                  {...register('prefecture', { required: false })}
                  onChange={(e) =>
                    setValue('prefecture', parseInt(e.target.value))
                  }
                  error={errors.prefecture?.message}
                >
                  {makeOptionsForValuAndLabel(
                    Prefecture.japanMapping(),
                    'prefectures'
                  )}
                </BaseSelect>
              </TableBlock>
              <TableBlock title={'住所'} required={false} widthPercent={30}>
                <TextInput
                  id={'officeLocation'}
                  type={'text'}
                  width={'100%'}
                  placeholder={'京都府 京都市右京区 西院巽町 1ー2 京都ビル4階'}
                  {...register('officeLocation', { required: false })}
                  onChange={(e) => setValue('officeLocation', e.target.value)}
                  error={errors.officeLocation?.message}
                />
              </TableBlock>
              <TableBlock
                title={'従業員数（単体）'}
                required={false}
                widthPercent={30}
              >
                <UnitInput
                  unit={'人'}
                  width={'fit-contents'}
                  type={'number'}
                  min={'0'}
                  {...register('employeeNumberSingle', { required: false })}
                  error={errors.employeeNumberSingle?.message}
                />
              </TableBlock>
              <TableBlock
                title={'従業員数（連結）'}
                required={false}
                widthPercent={30}
              >
                <UnitInput
                  unit={'人'}
                  width={'fit-contents'}
                  type={'number'}
                  min={'0'}
                  {...register('employeeNumberGroup', { required: false })}
                  error={errors.employeeNumberGroup?.message}
                />
              </TableBlock>
              <TableBlock title={'資本金'} required={false} widthPercent={30}>
                <TextInput
                  type={'text'}
                  width={'100%'}
                  {...register('capital', { required: false })}
                  onChange={(e) => setValue('capital', e.target.value)}
                  error={errors.capital?.message}
                />
              </TableBlock>
              <TableBlock title={'株式公開'} required={false} widthPercent={30}>
                <BaseSelect
                  width={'100%'}
                  {...register('publicOffering', { required: false })}
                  onChange={(e) =>
                    setValue('publicOffering', parseInt(e.target.value))
                  }
                  error={errors.publicOffering?.message}
                >
                  {makeOptions(PublicOffering.mapping, 'public-offering')}
                </BaseSelect>
              </TableBlock>
              <TableBlock title={'売上高'} required={false} widthPercent={30}>
                <Textarea
                  width={'100%'}
                  rows={2}
                  {...register('earnings', { required: false })}
                  error={errors.earnings?.message}
                />
              </TableBlock>
              <TableBlock
                title={'売上高（年度）'}
                required={false}
                widthPercent={30}
              >
                <UnitInput
                  width={'fit-contents'}
                  unit={'年'}
                  type={'number'}
                  min={'1800'}
                  max={'9999'}
                  {...register('earningsYear', { required: false })}
                  error={errors.earningsYear?.message}
                />
              </TableBlock>
              <TableBlock title={'業界'} required={false} widthPercent={30}>
                <SelectButton
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    changeMultiSelectType(
                      '業界',
                      'industry',
                      watch('industries'),
                      industryState.selectState,
                      industryInput.selectReset,
                      changeIndustries
                    )
                    setIsMultiCheckOpenModal(true)
                  }}
                  error={errors.industries?.message != undefined}
                >
                  指定する
                </SelectButton>
                {(watch('industries') || []).length > 0 && (
                  <SelectContainer>
                    {(watch('industries') || [])
                      .filter((val): val is number => val !== null)
                      .map((val, index) => (
                        <SelectItem key={`industry${index}`}>
                          {Industry.mapping[val]}
                        </SelectItem>
                      ))}
                  </SelectContainer>
                )}
                {errors.industries?.message && (
                  <ErrorText>{errors.industries?.message}</ErrorText>
                )}
              </TableBlock>
              <TableBlock title={'事業内容'} required={false} widthPercent={30}>
                <Textarea
                  width={'100%'}
                  rows={6}
                  {...register('businessDetail', { required: false })}
                  onChange={(e) => setValue('businessDetail', e.target.value)}
                  error={errors.businessDetail?.message}
                />
              </TableBlock>
            </TableContainer>
            <Buttons>
              <FormGroup>
                <Submit type="submit">登録</Submit>
              </FormGroup>
            </Buttons>
          </Form>
        </Grid>
      </Grid>
      {isOpenMultiCheckModal && MultiCheckDialog}
    </Box>
  )
}

const FormTitle = styled.p`
  color: #666;
  font-size: ${FontSize.Px14};
`

const Form = styled.form`
  width: fit-content;
  block-size: fit-content;
  width: 100%;
  margin: 1rem auto;
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
  font-weight: ${FontWeight.Bold};
  padding: 8px;
  &:hover {
    background: ${Color.MainHover};
  }
`

const SelectButton = materialStyled(Button, {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>(({ error }) => ({
  minWidth: '120px',
  color: TextColor.Black,
  border: `2px solid ${error ? TextColor.Red : Color.LineLight}`,
  background: TextColor.White,
  padding: '0.2rem 0.5rem',
  borderRadius: Radius.Px4,
  '&:hover': {
    background: '#F7F7F7',
    border: `2px solid ${Color.LineLight}`,
  },
  ':focus': {
    border: `1px solid ${Color.Sub}`,
  },
}))

// const SelectContainer = styled.div`
//   margin-top: 1rem;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   & > span:not(:last-child) {
//     margin-right: 0.4rem;
//   }
//   & > span {
//     margin-bottom: 0.4rem;
//   }
// `

// const SelectItem = styled.span`
//   background-color: ${Color.Main2};
//   color: ${TextColor.White};
//   font-size: 15px;
//   padding: 2px 6px;
//   border-radius: ${Radius.Px2};
//   float: left;
// `

export default CompanyForm