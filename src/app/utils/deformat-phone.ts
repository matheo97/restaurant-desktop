export const deformatPhone = (value: string): string => {
  const onlyNums = `${value}`
  return onlyNums.replace(/[^\d]/g, '')
}
