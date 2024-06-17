export const formatUsers = (array: User[], rol: number) =>
  array
    .filter((user: User) => user.role_id === rol)
    .map((user: User) => {
      return {
        value: user.id.toString(),
        label: user.name,
      };
    });
