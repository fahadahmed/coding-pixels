import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { signIn } from "~/utils/firebase.server";
import { createUserSession } from "~/utils/session.server";

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const { user } = await signIn(email as string, password as string);
  const token = user.getIdToken();
  return createUserSession(token, '/admin');
}

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Form method='post'>
        <p>
          <label>
            Email
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </p>
        <button type='submit'>Login</button>
      </Form>
    </div>
  )
};

export default Login;
