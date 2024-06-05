interface ReturnType {
  success: boolean,
  message: string
}

export async function createTodo(prevState: any, queryData: any): Promise<ReturnType> {
  return {
    success: true,
    message: 'heeloooo'
  };
}