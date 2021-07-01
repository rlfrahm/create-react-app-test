import React, { useRef, useState } from 'react';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  note: string;
  created?: Date;
  validation: {
    firstName?: string;
    lastName?: string;
    email?: string;
    note?: string;
  };
};

interface Indexable {
  [index: string]: string;
}

const validation: Indexable = {
  firstName: 'Please enter a first name.',
  lastName: 'Please enter a last name.',
  email: 'Please enter a valid email.',
  note: 'Please enter a note.',
};

export default function UserForm({
  onSubmit,
}: {
  onSubmit: (user: User) => void;
}) {
  const [newUser, setNewUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    note: '',
    validation: {},
  });
  const firstName = useRef<HTMLInputElement | null>(null);

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    newUser.created = new Date();
    onSubmit(newUser);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      note: '',
      validation: {},
    });
    firstName.current?.focus();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const value =
      target.type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleInvalid = (event: React.InvalidEvent<any>) => {
    event.preventDefault();
    setNewUser({
      ...newUser,
      validation: {
        ...newUser.validation,
        [event.target.name]: validation[event.target.name],
      },
    });
  };

  const submittable = (): boolean => {
    return !Object.values(newUser).includes('');
  };

  return (
    <form className="max-w-md" onSubmit={onFormSubmit}>
      <div className="relative">
        <label htmlFor="required-first-name" className="text-gray-700">
          First Name
          <span className="text-red-500 required-dot">*</span>
        </label>
        <input
          type="text"
          id="required-first-name"
          className={`mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent${
            newUser.validation.firstName ? ' border-red-400' : ''
          }`}
          name="firstName"
          placeholder="Your first name"
          required
          value={newUser.firstName}
          onChange={handleInputChange}
          onInvalid={handleInvalid}
          autoFocus
          ref={firstName}
        />
        {newUser.validation.firstName && (
          <small className="text-red-400 block mt-1 italic">
            {newUser.validation.firstName}
          </small>
        )}
      </div>
      <div className="relative mt-3">
        <label htmlFor="required-last-name" className="text-gray-700">
          Last Name
          <span className="text-red-500 required-dot">*</span>
        </label>
        <input
          type="text"
          id="required-last-name"
          className={`mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent${
            newUser.validation.lastName ? ' border-red-400' : ''
          }`}
          name="lastName"
          placeholder="Your last name"
          required
          value={newUser.lastName}
          onChange={handleInputChange}
          onInvalid={handleInvalid}
        />
        {newUser.validation.lastName && (
          <small className="text-red-400 block mt-1 italic">
            {newUser.validation.lastName}
          </small>
        )}
      </div>
      <div className="relative mt-3">
        <label htmlFor="required-email" className="text-gray-700">
          Email
          <span className="text-red-500 required-dot">*</span>
        </label>
        <input
          type="email"
          id="required-email"
          className={`mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent${
            newUser.validation.email ? ' border-red-400' : ''
          }`}
          name="email"
          placeholder="Your email"
          required
          value={newUser.email}
          onChange={handleInputChange}
          onInvalid={handleInvalid}
        />
        {newUser.validation.email && (
          <small className="text-red-400 block mt-1 italic">
            {newUser.validation.email}
          </small>
        )}
      </div>
      <div className="relative mt-3">
        <label className="text-gray-700" htmlFor="note">
          Note
          <span className="text-red-500 required-dot">*</span>
        </label>
        <textarea
          className="mt-1 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="note"
          placeholder="Enter your note"
          name="note"
          rows={2}
          value={newUser.note}
          onChange={handleInputChange}
          onInvalid={handleInvalid}
          required
        ></textarea>
      </div>
      <div className="mt-3 flex">
        <button
          type="submit"
          className="ml-auto py-2 px-8 flex items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition transform hover:scale-105 ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:opacity-75 disabled:cursor-not-allowed"
          disabled={!submittable()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current mr-2"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add User
        </button>
      </div>
    </form>
  );
}
