'use server';

import { signIn } from '@/auth.config';
import sleep from '@/utils/sleep';
import { AuthError } from 'next-auth';

// ...

export default async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Exito';
  } catch (error) {
    if ((error as any).type === 'CredencialsSingin') {
      return 'Credentials Singin';
    }
    console.log({ error });
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    return 'Error desconocido';
    // default:
    //   return 'Something went wrong.';
  }
}
// throw error;
// }

// }

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };
  }
};
