export const formatUsers = (array: User[], role1: number, role2?: number) =>
  array
    .filter((user: User) => user.role_id === role1 || user.role_id === role2)
    .map((user: User) => {
      return {
        value: user.id.toString(),
        label: user.name,
      };
    });
