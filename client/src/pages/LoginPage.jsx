function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <form autocomplete="off">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginPage;
