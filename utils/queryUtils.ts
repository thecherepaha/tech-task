export const parseQueryParams = <T>(
  query: any,
  defaults: Partial<T>
): Partial<T> => {
  return (
    [
      ...new Set([...Object.keys(defaults), ...Object.keys(query)]), // Собираем все ключи из defaults и query
    ] as Array<keyof T>
  ).reduce((acc, key) => {
    const value = query[key as keyof T]

    if (value !== undefined && value !== null && value !== "") {
      // Если значение является числом, конвертируем, иначе оставляем как есть
      const defaultValue = defaults[key]
      acc[key] = typeof defaultValue === "number" ? Number(value) : value
    } else {
      acc[key] = defaults[key] // Применить значение по умолчанию, если параметр отсутствует
    }

    return acc
  }, {} as Partial<T>)
}
