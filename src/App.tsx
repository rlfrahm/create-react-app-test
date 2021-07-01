import { useState } from 'react';
import UserForm, { User } from './components/users/form';
import UserList from './components/users/list';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  const handleSubmit = (user: User) => {
    setUsers([...users, user]);
  };

  const handleRemove = (user: User) => {
    setUsers(
      users.filter(
        (u: User, i: number) =>
          u.created?.toString() !== user.created?.toString()
      )
    );
    document.getElementById('required-first-name')!.focus();
  };

  return (
    <div className="App text-sm">
      <h1 className="text-center text-xl font-semibold mt-12">Add Users</h1>
      <div className="flex justify-evenly flex-wrap mt-6">
        <UserForm onSubmit={handleSubmit}></UserForm>
        <UserList users={users} onRemove={handleRemove}></UserList>
      </div>
    </div>
  );
}
