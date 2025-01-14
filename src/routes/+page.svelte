<script>
  import { webAuthnClient } from '$lib/auth/client';
  let email = '';

  async function handleSignUp() {
    try {
      await webAuthnClient.signUp(email);
      console.log('signup success');
    } catch (err) {
      console.error(err);
      console.log('error');
    }
  }

  async function handleSignIn() {
    try {
      await webAuthnClient.signIn(email);
      // window.location.href = '/';
      console.log('signin success');
    } catch (err) {
      console.error(err);
      console.log('error');
    }
  }
</script>

<section class="auth-section">
  <div class="auth-container">
    <input class="auth-input" type="email" placeholder="이메일을 입력하세요" bind:value={email} />
    <div class="auth-buttons">
      <button class="btn signup-btn" on:click={handleSignUp} >회원가입</button>
      <button class="btn login-btn" >로그인</button>
    </div>
  </div>
  <p class="message">이미 계정이 있으신가요? 로그인 버튼을 클릭하세요.</p>
</section>

<style>
  .auth-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    margin: auto;
  }


  .auth-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .auth-input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
  }

  .auth-input:focus {
    border-color: #007bff;
  }

  .auth-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .signup-btn {
    background-color: #28a745;
    color: white;
  }

  .signup-btn:hover {
    background-color: #218838;
  }

  .login-btn {
    background-color: #007bff;
    color: white;
  }

  .login-btn:hover {
    background-color: #0056b3;
  }

  .message {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    margin-top: 1rem;
  }
</style>