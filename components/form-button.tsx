import { Button } from "@heroui/button"

interface FormButtonProps {
  children: React.ReactNode
}

const FormButton = ({ children }: FormButtonProps) => {
  return (
    <Button type="submit">{children}</Button>
  )
}

export default FormButton