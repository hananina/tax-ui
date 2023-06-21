import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Center,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  VStack,
} from '@chakra-ui/react'

// ★2 フォーム値の型を定義
type FormInputs = {
  yearsOfService: string
  isDisability: boolean
  isOfficer: string
  severancePay: string
}

export const InputForm = ({ ...props }: CardProps) => {
  // ★3 フォーム値の型を渡してRHFのuseFormフックを呼び出す
  const { register, handleSubmit } = useForm<FormInputs>()
  // ★4 フォームをサブミットしたとき呼び出されるコールバック関数を仮実装
  const onInputFormSubmit = (formInputs: FormInputs) => {
    console.log(formInputs)
  }

  return (
    <Card w="400px" {...props}>
      <CardHeader>
        <Center>
          <Heading as="h3" size="md">
            退職金情報を入力してください
          </Heading>
        </Center>
      </CardHeader>
      <CardBody>
        {/* ★5 サブミット時に呼び出されるコールバック関数を指定 */}
        <form onSubmit={handleSubmit(onInputFormSubmit)}>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel fontWeight="bold">勤続年数</FormLabel>
              <HStack>
                <InputGroup w="120px">
                  <Input
                    type="number"
                    defaultValue="10"
                    // ★6 フォームコンポーネントをRHFのコントロール下に置く
                    {...register('yearsOfService')}
                  />
                  <InputRightAddon>年</InputRightAddon>
                </InputGroup>
                <FormHelperText>1年未満の端数は切り上げ</FormHelperText>
              </HStack>
              <Spacer />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">退職基因</FormLabel>
              <Checkbox {...register('isDisability')}>
                障害者となったことに直接基因して退職した
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">役員等以外か役員等か</FormLabel>
              <RadioGroup defaultValue="0">
                <Stack direction="row">
                  <Radio value="0" {...register('isOfficer')}>
                    役員等以外
                  </Radio>
                  <Radio value="1" {...register('isOfficer')}>
                    役員等
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">退職金</FormLabel>
              <InputGroup w="200px">
                <Input
                  type="number"
                  defaultValue="5000000"
                  {...register('severancePay')}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" alignSelf="flex-end" type="submit">
              所得税を計算する
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}
