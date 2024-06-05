interface Props {
  [key: string]: string
}

export const userNormalize = ({ id, email }: Props) => {
  return { id, email }
}