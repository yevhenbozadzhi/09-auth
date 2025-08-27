'use client';

import {  useState } from 'react'
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker'
import { updateMe } from '@/lib/api/clientApi';
import css from "../../../../css/EditProfilePage.module.css"
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName, photoUrl: "" });
  };

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src="/public"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

        <form onSubmit={handleSaveUser}  className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
        />
      </div>

      <p>Email: email</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button onClick={() => router.push('/profile')} type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

  );
}

export default EditProfile;
