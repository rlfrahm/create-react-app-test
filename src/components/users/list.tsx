import { User } from './form';
import LoadingDots from '../loading';

export default function UserList({
  users,
  onRemove,
}: {
  users: User[];
  onRemove: (user: User) => void;
}) {
  return (
    <div className="max-w-md flex flex-col w-full">
      <div className="px-6 py-3 w-full border dark:bg-gray-800 bg-white shadow-sm mb-2 rounded-md">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          User database
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
          Details and information about user.
        </p>
      </div>
      <ul className="flex flex-col w-full">
        {!users.length && (
          <li className="px-6 py-3 text-gray-600">
            <p className="text-center font-mono opacity-75">
              Waiting for my first user<LoadingDots></LoadingDots> 🤔
            </p>
          </li>
        )}
        {users.map((user: User, index: number) => {
          return (
            <li
              className="border-gray-400 flex flex-row mb-2"
              key={user.created?.toString()}
            >
              <div className="transition duration-500 shadow ease-in-out transform select-none bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                <div className="flex flex-col w-10 h-10 justify-center items-center mr-3">
                  <div className="rounded-full h-10 w-10 shadow bg-red-400 text-white flex items-center justify-center uppercase">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                </div>
                <div className="flex-1 pl-1 md:mr-16">
                  <div className="font-medium dark:text-white">
                    {user.firstName} {user.lastName}{' '}
                    <small className="font-light">{user.email}</small>
                  </div>
                  <div className="text-gray-600 dark:text-gray-200 text-sm italic">
                    {user.note}
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs lowercase">
                  {user.created!.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
                <button
                  className="w-24 text-right flex justify-end"
                  onClick={async () =>
                    (await window.confirm('Are you sure?')) && onRemove(user)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 hover:text-red-800 dark:hover:text-white dark:text-gray-200 text-gray-500 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
