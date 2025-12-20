import Link from "next/link";

export default function SignupPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Signup Page</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
